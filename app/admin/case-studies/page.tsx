
"use client";

import { useEffect, useState, type FormEvent } from "react";

type CaseStudy = {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  technologies: string[] | string;
  client?: string | null;
  challenge?: string | null;
  solution?: string | null;
  results?: string | null;
  featured_image?: string | null;
  gallery_images?: string[] | null;
  project_url?: string | null;
};

const API_URL = "http://localhost:5000/api/case-studies";

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  category: "",
  technologies: "",
  client: "",
  challenge: "",
  solution: "",
  results: "",
  featured_image: "",
  gallery_images: "",
  project_url: "",
};

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadCaseStudies() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Could not load case studies.");
      }

      const data = await response.json();
      setCaseStudies(Array.isArray(data) ? data : data.caseStudies ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not load case studies."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCaseStudies();
  }, []);

  function updateField(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleEdit(study: CaseStudy) {
    let techList: string[] = [];

    try {
      techList =
        typeof study.technologies === "string"
          ? JSON.parse(study.technologies)
          : study.technologies ?? [];
    } catch {
      techList = [];
    }

    setForm({
      title: study.title ?? "",
      slug: study.slug ?? "",
      description: study.description ?? "",
      category: study.category ?? "",
      technologies: techList.join(", "),
      client: study.client ?? "",
      challenge: study.challenge ?? "",
      solution: study.solution ?? "",
      results: study.results ?? "",
      featured_image: study.featured_image ?? "",
      gallery_images: (study.gallery_images ?? []).join(", "),
      project_url: study.project_url ?? "",
    });

    setEditingId(study.id);
    setError("");
    setSuccess("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const token = sessionStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const payload = {
      ...form,
      title: form.title.trim(),
      slug: form.slug.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      technologies: JSON.stringify(
        form.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      ),
      gallery_images: form.gallery_images
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      client: form.client.trim(),
      challenge: form.challenge.trim(),
      solution: form.solution.trim(),
      results: form.results.trim(),
      featured_image: form.featured_image.trim(),
      project_url: form.project_url.trim(),
    };

    setSaving(true);

    try {
      const response = await fetch(
        editingId === null ? API_URL : `${API_URL}/${editingId}`,
        {
          method: editingId === null ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Could not save the case study.");
      }

      setSuccess(
        editingId === null
          ? "Case study added successfully."
          : "Case study updated successfully."
      );

      resetForm();
      await loadCaseStudies();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not save the case study."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Are you sure you want to delete this case study?")) {
      return;
    }

    const token = sessionStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Could not delete the case study.");
      }

      setCaseStudies((current) =>
        current.filter((study) => study.id !== id)
      );

      if (editingId === id) {
        resetForm();
      }

      setSuccess("Case study deleted successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not delete the case study."
      );
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">Manage Case Studies</h1>

      {error && (
        <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="mb-4 rounded-lg bg-green-50 p-3 text-green-700">
          {success}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="mb-12 space-y-5 rounded-xl border p-6"
      >
        <h2 className="text-xl font-semibold">
          {editingId === null ? "Add Case Study" : "Edit Case Study"}
        </h2>

        {(
          [
            ["title", "Title"],
            ["slug", "Slug"],
            ["category", "Category"],
            ["client", "Client / Company"],
            ["featured_image", "Featured Image URL"],
            ["project_url", "Project URL"],
          ] as const
        ).map(([name, label]) => (
          <div key={name}>
            <label htmlFor={name} className="mb-1 block font-medium">
              {label}
            </label>
            <input
              id={name}
              name={name}
              value={form[name]}
              onChange={updateField}
              required={["title", "slug", "category"].includes(name)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
        ))}

        {(
          [
            ["description", "Description"],
            ["challenge", "Challenge"],
            ["solution", "Solution"],
            ["results", "Results"],
          ] as const
        ).map(([name, label]) => (
          <div key={name}>
            <label htmlFor={name} className="mb-1 block font-medium">
              {label}
            </label>
            <textarea
              id={name}
              name={name}
              value={form[name]}
              onChange={updateField}
              required={name === "description"}
              rows={3}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
        ))}

        <div>
          <label htmlFor="technologies" className="mb-1 block font-medium">
            Technologies
          </label>
          <input
            id="technologies"
            name="technologies"
            value={form.technologies}
            onChange={updateField}
            placeholder="React, Node.js, MongoDB"
            className="w-full rounded-lg border px-3 py-2"
          />
          <p className="mt-1 text-sm text-gray-500">
            Separate technologies with commas.
          </p>
        </div>

        <div>
          <label htmlFor="gallery_images" className="mb-1 block font-medium">
            Gallery Image URLs
          </label>
          <textarea
            id="gallery_images"
            name="gallery_images"
            value={form.gallery_images}
            onChange={updateField}
            placeholder="URL 1, URL 2"
            rows={2}
            className="w-full rounded-lg border px-3 py-2"
          />
          <p className="mt-1 text-sm text-gray-500">
            Separate image URLs with commas.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : editingId === null
                ? "Add Case Study"
                : "Save Changes"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border px-5 py-3"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="mb-5 text-2xl font-bold">Existing Case Studies</h2>

      {loading ? (
        <p>Loading case studies...</p>
      ) : caseStudies.length === 0 ? (
        <p>No case studies found.</p>
      ) : (
        <div className="space-y-4">
          {caseStudies.map((study) => (
            <article key={study.id} className="rounded-xl border p-5">
              <h3 className="text-xl font-semibold">{study.title}</h3>
              <p className="mt-2">{study.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                Category: {study.category}
              </p>
              <p className="text-sm text-gray-500">Slug: {study.slug}</p>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => handleEdit(study)}
                  className="rounded-lg border px-4 py-2"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(study.id)}
                  className="rounded-lg border border-red-300 px-4 py-2 text-red-700"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}