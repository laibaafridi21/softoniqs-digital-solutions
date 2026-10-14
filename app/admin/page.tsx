
"use client";

import { useEffect, useState, type FormEvent } from "react";

type Service = {
  id: number;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  price: string;
};

type ContactMessage = {
  id: string | number;
  name: string;
  email: string;
  phone?: string | null;
  category?: string | null;
  message: string;
  created_at: string;
};

const API_URL = "http://localhost:5000";

export default function AdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [price, setPrice] = useState("");

  const [editingServiceId, setEditingServiceId] = useState<number | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      const token = sessionStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const [servicesResponse, messagesResponse] = await Promise.all([
          fetch(`${API_URL}/api/services`),
          fetch(`${API_URL}/api/admin/contact-message`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (messagesResponse.status === 401 || messagesResponse.status === 403) {
          sessionStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        if (!servicesResponse.ok) {
          throw new Error("Could not load services.");
        }

        if (!messagesResponse.ok) {
          throw new Error("Could not load contact messages.");
        }

        const servicesData = await servicesResponse.json();
        const messagesData = await messagesResponse.json();

        setServices(
          Array.isArray(servicesData)
            ? servicesData
            : servicesData.services ?? []
        );

        setMessages(
          Array.isArray(messagesData)
            ? messagesData
            : messagesData.messages ?? []
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while loading the dashboard."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  function resetForm() {
    setTitle("");
    setDescription("");
    setFeatures("");
    setTechnologies("");
    setPrice("");
    setEditingServiceId(null);
  }

  function handleEditService(service: Service) {
    setTitle(service.title);
    setDescription(service.description);
    setFeatures(service.features.join(", "));
    setTechnologies(service.technologies.join(", "));
    setPrice(service.price);
    setEditingServiceId(service.id);
    setError("");
    setSuccess("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSaveService(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const token = sessionStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      features: features
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      technologies: technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      price: price.trim(),
    };

    try {
      const isEditing = editingServiceId !== null;
      const url = isEditing
        ? `${API_URL}/api/services/${editingServiceId}`
        : `${API_URL}/api/services`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Could not save the service.");
      }

      const savedService: Service =
        data.service ?? data.data ?? data;

      if (isEditing) {
        setServices((current) =>
          current.map((service) =>
            service.id === editingServiceId
              ? { ...service, ...savedService, ...payload }
              : service
          )
        );

        setSuccess("Service updated successfully.");
      } else {
        setServices((current) => [...current, savedService]);
        setSuccess("Service added successfully.");
      }

      resetForm();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save the service."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteService(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");
    setDeletingId(id);

    const token = sessionStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/services/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Could not delete the service.");
      }

      setServices((current) =>
        current.filter((service) => service.id !== id)
      );

      if (editingServiceId === id) {
        resetForm();
      }

      setSuccess("Service deleted successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete the service."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
  
      <header className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Softoniqs Digital Solutions
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Manage your services and customer enquiries in one place.
            </p>
          </div>

          <a
            href="/"
            className="inline-flex w-fit items-center rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold transition hover:border-cyan-400 hover:text-cyan-300"
          >
            View Website ↗
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-10 px-5 py-8 sm:px-8 sm:py-10">
      
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Total Services
              </p>
              <span className="rounded-xl bg-cyan-50 p-3 text-xl">▤</span>
            </div>
            <p className="mt-4 text-4xl font-bold">{services.length}</p>
            <p className="mt-2 text-sm text-slate-500">
              Services listed on your website
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Contact Messages
              </p>
              <span className="rounded-xl bg-violet-50 p-3 text-xl">✉</span>
            </div>
            <p className="mt-4 text-4xl font-bold">{messages.length}</p>
            <p className="mt-2 text-sm text-slate-500">
              Enquiries received from visitors
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Dashboard Status
              </p>
              <span className="rounded-xl bg-emerald-50 p-3 text-xl">✓</span>
            </div>
            <p className="mt-4 text-2xl font-bold">Management</p>
            <p className="mt-2 text-sm text-slate-500">
              Services and enquiries
            </p>
          </div>
        </section>

      
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700"
          >
            {success}
          </div>
        )}

      
        <section
          id="service-form"
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-700">
              Service Management
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              {editingServiceId !== null ? "Edit Service" : "Add New Service"}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {editingServiceId !== null
                ? "Update the service details below."
                : "Enter the details of the service you want to add."}
            </p>
          </div>

          <form onSubmit={handleSaveService} className="space-y-6 p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Service Title
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Web Development"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Starting Price
                </label>
                <input
                  id="price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="e.g. $499"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe what this service offers..."
                rows={3}
                required
                className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <div>
              <label
                htmlFor="features"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Features
              </label>
              <input
                id="features"
                value={features}
                onChange={(event) => setFeatures(event.target.value)}
                placeholder="Responsive Design, SEO Friendly, Modern UI"
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
              <p className="mt-2 text-xs text-slate-500">
                Separate each feature with a comma.
              </p>
            </div>

            <div>
              <label
                htmlFor="technologies"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Technologies
              </label>
              <input
                id="technologies"
                value={technologies}
                onChange={(event) => setTechnologies(event.target.value)}
                placeholder="Next.js, React, Tailwind CSS"
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
              <p className="mt-2 text-xs text-slate-500">
                Separate each technology with a comma.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-cyan-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? "Saving..."
                  : editingServiceId !== null
                    ? "Save Changes"
                    : "Add Service"}
              </button>

              {editingServiceId !== null && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

    
        <section>
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-700">
                Your Offerings
              </p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Manage Services
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              {services.length} {services.length === 1 ? "service" : "services"}{" "}
              loaded
            </p>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
              Loading dashboard data...
            </div>
          ) : services.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h3 className="text-lg font-semibold">No services yet</h3>
              <p className="mt-2 text-sm text-slate-500">
                Use the form above to add your first service.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-2xl text-cyan-800">
                      ◈
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                      Active
                    </span>
                  </div>

                  <h3 className="text-xl font-bold">{service.title}</h3>

                  <p className="mt-3 min-h-16 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>

                  <div className="mt-6">
                    <h4 className="text-sm font-bold text-slate-800">
                      Features
                    </h4>
                    {service.features?.length ? (
                      <ul className="mt-3 space-y-2">
                        {service.features.map((feature, index) => (
                          <li
                            key={`${feature}-${index}`}
                            className="flex items-start gap-2 text-sm text-slate-600"
                          >
                            <span className="mt-0.5 font-bold text-emerald-600">
                              ✓
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm text-slate-400">
                        No features added.
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-bold text-slate-800">
                      Technologies
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.technologies?.length ? (
                        service.technologies.map((technology, index) => (
                          <span
                            key={`${technology}-${index}`}
                            className="rounded-lg border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-900"
                          >
                            {technology}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-400">
                          No technologies added.
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Starting at
                    </p>
                    <p className="mt-1 text-2xl font-bold text-cyan-800">
                      {service.price}
                    </p>
                  </div>

                  <div className="mt-auto flex gap-3 pt-6">
                    <button
                      type="button"
                      onClick={() => handleEditService(service)}
                      className="flex-1 rounded-xl border border-cyan-700 px-4 py-2.5 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-50"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteService(service.id)}
                      disabled={deletingId === service.id}
                      className="flex-1 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === service.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      
        <section>
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-violet-700">
              Customer Enquiries
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Contact Messages
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Messages submitted through your website contact form.
            </p>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              Loading messages...
            </div>
          ) : messages.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h3 className="text-lg font-semibold">No messages yet</h3>
              <p className="mt-2 text-sm text-slate-500">
                New customer enquiries will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {messages.map((message) => (
                <article
                  key={message.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{message.name}</h3>
                      <a
                        href={`mailto:${message.email}`}
                        className="mt-1 inline-block break-all text-sm font-medium text-cyan-700 hover:underline"
                      >
                        {message.email}
                      </a>
                    </div>

                    <span className="w-fit rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                      {message.category || "General enquiry"}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs font-medium text-slate-500">
                        Phone
                      </p>
                      <p className="mt-1 break-words font-medium text-slate-800">
                        {message.phone || "Not provided"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs font-medium text-slate-500">
                        Received
                      </p>
                      <p className="mt-1 font-medium text-slate-800">
                        {message.created_at
                          ? new Date(message.created_at).toLocaleString()
                          : "Date unavailable"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h4 className="text-sm font-bold text-slate-800">
                      Message
                    </h4>
                    <p className="mt-2 whitespace-pre-wrap break-words rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                      {message.message}
                    </p>
                  </div>

                  <div className="mt-4">
                    <a
                      href={`mailto:${message.email}?subject=${encodeURIComponent(
                        "Re: Your enquiry to Softoniqs"
                      )}`}
                      className="inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-800"
                    >
                      Reply by Email ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Softoniqs Digital Solutions · Admin
          Dashboard
        </footer>
      </div>
    </main>
  );
}
