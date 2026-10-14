"use client";

import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";

type CaseStudy = {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  technologies: string[] | string;
  client: string;
  challenge: string;
  solution: string;
  results: string;
  featured_image: string;
  gallery_images: string[] | string;
  project_url: string;
};

type CaseStudyForm = {
  title: string;
  slug: string;
  description: string;
  category: string;
  technologies: string;
  client: string;
  challenge: string;
  solution: string;
  results: string;
  featured_image: string;
  gallery_images: string;
  project_url: string;
};

const emptyForm: CaseStudyForm = {
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

const API_URL = "http://localhost:5000/api/case-studies";
const UPLOAD_URL = "http://localhost:5000/api/upload";

function parseList(value: string[] | string | null | undefined): string[] {
  if (Array.isArray(value)) return value;

  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getToken() {
  return sessionStorage.getItem("token");
}

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [form, setForm] = useState<CaseStudyForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadCaseStudies() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load case studies.");
      }

      setCaseStudies(Array.isArray(data) ? data : data.caseStudies || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load case studies."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCaseStudies();
  }, []);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setSuccess("");

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be 5 MB or less.");
      event.target.value = "";
      return;
    }

    const token = getToken();

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setUploadingImage(true);

    try {
      const response = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          sessionStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        throw new Error(data.error || "Image upload failed.");
      }

      setForm((current) => ({
        ...current,
        featured_image: data.url,
      }));

      setSuccess("Image uploaded successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Image upload failed."
      );
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  }

  function startEditing(caseStudy: CaseStudy) {
    setEditingId(caseStudy.id);

    setForm({
      title: caseStudy.title || "",
      slug: caseStudy.slug || "",
      description: caseStudy.description || "",
      category: caseStudy.category || "",
      technologies: parseList(caseStudy.technologies).join(", "),
      client: caseStudy.client || "",
      challenge: caseStudy.challenge || "",
      solution: caseStudy.solution || "",
      results: caseStudy.results || "",
      featured_image: caseStudy.featured_image || "",
      gallery_images: parseList(caseStudy.gallery_images).join("\n"),
      project_url: caseStudy.project_url || "",
    });

    setError("");
    setSuccess("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const token = getToken();

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const technologies = form.technologies
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const galleryImages = form.gallery_images
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      ...form,
      technologies: JSON.stringify(technologies),
      gallery_images: galleryImages,
    };

    setSaving(true);

    try {
      const response = await fetch(
        editingId !== null ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId !== null ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          sessionStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        throw new Error(data.error || "Failed to save case study.");
      }

      setSuccess(
        editingId !== null
          ? "Case study updated successfully."
          : "Case study added successfully."
      );

      setForm(emptyForm);
      setEditingId(null);

      await loadCaseStudies();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save case study."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this case study?"
    );

    if (!confirmed) return;

    const token = getToken();

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

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          sessionStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        throw new Error(data.error || "Failed to delete case study.");
      }

      setSuccess("Case study deleted successfully.");

      if (editingId === id) {
        setForm(emptyForm);
        setEditingId(null);
      }

      await loadCaseStudies();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete case study."
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">
          Case Study Management
        </h1>

        <p className="mb-8 text-slate-600">
          Add, edit, and manage your company case studies.
        </p>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-5 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700"
          >
            {success}
          </div>
        )}

        <section className="mb-10 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="mb-6 text-xl font-semibold">
            {editingId !== null ? "Edit Case Study" : "Add Case Study"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {(
                [
                  ["title", "Title"],
                  ["slug", "Slug"],
                  ["category", "Category"],
                  ["client", "Client / Company"],
                  ["project_url", "Project URL"],
                ] as const
              ).map(([name, label]) => (
                <div key={name}>
                  <label
                    htmlFor={name}
                    className="mb-1 block font-medium"
                  >
                    {label}
                  </label>

                  <input
                    id={name}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    required={name === "title" || name === "slug"}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              ))}
            </div>

            <div>
              <label
                htmlFor="featured_image_upload"
                className="mb-1 block font-medium"
              >
                Featured Image
              </label>

              <input
                id="featured_image_upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 disabled:opacity-60"
              />

              <p className="mt-2 text-sm text-slate-500">
                {uploadingImage
                  ? "Uploading image..."
                  : "Select an image to upload to Cloudinary. Maximum size: 5 MB."}
              </p>

              {form.featured_image && (
                <div className="mt-4">
                  <img
                    src={form.featured_image}
                    alt="Featured image preview"
                    className="h-48 max-w-full rounded-lg border border-slate-200 object-cover"
                  />

                  <p className="mt-2 break-all text-sm text-slate-500">
                    Image uploaded successfully.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        featured_image: "",
                      }))
                    }
                    className="mt-2 text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Remove image
                  </button>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1 block font-medium"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="technologies"
                className="mb-1 block font-medium"
              >
                Technologies
              </label>

              <input
                id="technologies"
                name="technologies"
                value={form.technologies}
                onChange={handleChange}
                placeholder="Next.js, TypeScript, Tailwind CSS"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-1 text-sm text-slate-500">
                Separate technologies with commas.
              </p>
            </div>

            {(
              [
                ["challenge", "Challenge"],
                ["solution", "Solution"],
                ["results", "Results"],
              ] as const
            ).map(([name, label]) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="mb-1 block font-medium"
                >
                  {label}
                </label>

                <textarea
                  id={name}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="gallery_images"
                className="mb-1 block font-medium"
              >
                Gallery Image URLs
              </label>

              <textarea
                id="gallery_images"
                name="gallery_images"
                value={form.gallery_images}
                onChange={handleChange}
                rows={3}
                placeholder={"Paste one image URL per line"}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-1 text-sm text-slate-500">
                Optional. Enter one image URL per line.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving || uploadingImage}
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId !== null
                    ? "Save Changes"
                    : "Add Case Study"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium hover:bg-slate-100"
                >
                  Cancel Editing
                </button>
              )}
            </div>
          </form>
        </section>

        <section>
          <h2 className="mb-5 text-xl font-semibold">
            Existing Case Studies
          </h2>

          {loading ? (
            <p className="text-slate-600">Loading case studies...</p>
          ) : caseStudies.length === 0 ? (
            <p className="rounded-lg border border-slate-200 bg-white p-5 text-slate-600">
              No case studies found.
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {caseStudies.map((caseStudy) => (
                <article
                  key={caseStudy.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  {caseStudy.featured_image && (
                    <img
                      src={caseStudy.featured_image}
                      alt={caseStudy.title}
                      className="h-48 w-full object-cover"
                    />
                  )}

                  <div className="p-5">
                    <h3 className="text-lg font-semibold">
                      {caseStudy.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {caseStudy.category}
                      {caseStudy.client ? ` · ${caseStudy.client}` : ""}
                    </p>

                    <p className="mt-3 line-clamp-3 text-slate-700">
                      {caseStudy.description}
                    </p>

                    <p className="mt-3 text-sm text-slate-500">
                      Technologies:{" "}
                      {parseList(caseStudy.technologies).join(", ") || "None"}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => startEditing(caseStudy)}
                        className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(caseStudy.id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}