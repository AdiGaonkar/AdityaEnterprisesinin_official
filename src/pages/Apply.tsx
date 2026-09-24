import React, { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Navbar from "../components/Navbar";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  portfolio: string;
  role: string;
  message: string;

  resumeFile: File | null;
  resumeName: string;
  resumeUrl: string; // Cloudinary URL
};

const MAX_FILE_MB = 3;

async function uploadToCloudinary(file: File) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;

  if (!cloudName || !uploadPreset) {
    throw new Error("Missing Cloudinary env vars.");
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  // optional folder
  formData.append("folder", "career_resumes");

  const res = await fetch(url, { method: "POST", body: formData });
  if (!res.ok) throw new Error("Cloudinary upload failed.");

  const data = await res.json();
  return {
    secure_url: data.secure_url as string,
    original_filename: data.original_filename as string,
  };
}

const Apply = () => {
  const [params] = useSearchParams();
  const defaultRole = params.get("role") || "";
  const defaultId = params.get("id") || "";

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    portfolio: "",
    role: defaultRole ? `${defaultRole}${defaultId ? ` (${defaultId})` : ""}` : "",
    message: "",
    resumeFile: null,
    resumeName: "",
    resumeUrl: "",
  });

  const canSubmit = useMemo(() => {
    return (
      form.fullName.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.role.trim() &&
      form.message.trim() &&
      form.resumeFile
    );
  }, [form]);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
    };

  const onResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed =
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    const sizeMb = file.size / (1024 * 1024);

    if (!allowed) {
      setStatus("error");
      setErrorMsg("Resume must be PDF, DOC, or DOCX.");
      return;
    }
    if (sizeMb > MAX_FILE_MB) {
      setStatus("error");
      setErrorMsg(`Resume too large. Please upload under ${MAX_FILE_MB}MB.`);
      return;
    }

    setStatus("idle");
    setErrorMsg("");

    setForm((p) => ({
      ...p,
      resumeFile: file,
      resumeName: file.name,
      resumeUrl: "",
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error("Missing EmailJS env vars.");
      }

      // 1) Upload resume to Cloudinary
      setUploading(true);
      const file = form.resumeFile!;
      const uploaded = await uploadToCloudinary(file);
      setUploading(false);

      // 2) Send Email via EmailJS with resume link
      const templateParams = {
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        portfolio: form.portfolio || "—",
        role: form.role,
        message: form.message,
        resume_name: form.resumeName || uploaded.original_filename,
        resume_url: uploaded.secure_url,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      setStatus("success");

      // reset
      setForm((p) => ({
        ...p,
        fullName: "",
        email: "",
        phone: "",
        portfolio: "",
        message: "",
        resumeFile: null,
        resumeName: "",
        resumeUrl: "",
      }));
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong while sending. Please try again.");
      setUploading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative bg-gradient-to-b from-[#7834c8] via-[#7834c8] to-black">
        <Navbar />
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 sm:pt-32">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white">Careers</p>

          <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-semibold text-white">
            Apply Now
          </h1>

          <p className="mt-4 max-w-2xl text-sm sm:text-base text-white">
            Fill the form and upload your resume. We’ll get back if it’s a good fit.
          </p>

          <div className="mt-6">
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-5 py-3 font-semibold hover:opacity-90 transition"
            >
              ← Back to Careers
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-black" />
      </section>

      <section className="bg-black">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-white/70">Full name *</label>
                <input
                  value={form.fullName}
                  onChange={onChange("fullName")}
                  className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/25"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-white/70">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={onChange("email")}
                  className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/25"
                  placeholder="you@email.com"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-white/70">Phone *</label>
                <input
                  value={form.phone}
                  onChange={onChange("phone")}
                  className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/25"
                  placeholder="+91..."
                  required
                />
              </div>

              <div>
                <label className="text-sm text-white/70">Portfolio / LinkedIn</label>
                <input
                  value={form.portfolio}
                  onChange={onChange("portfolio")}
                  className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/25"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm text-white/70">Role *</label>
              <input
                value={form.role}
                onChange={onChange("role")}
                className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/25"
                placeholder="UI/UX Designer"
                required
              />
            </div>

            <div className="mt-4">
              <label className="text-sm text-white/70">Why should we hire you? *</label>
              <textarea
                value={form.message}
                onChange={onChange("message")}
                className="mt-2 min-h-[140px] w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/25"
                placeholder="Write in 4–6 lines..."
                required
              />
            </div>

            <div className="mt-4">
              <label className="text-sm text-white/70">
                Resume (PDF/DOC/DOCX, max {MAX_FILE_MB}MB) *
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={onResumeChange}
                className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3"
                required
              />
              {form.resumeName && (
                <p className="mt-2 text-xs text-white/60">
                  Selected: <span className="text-white/80">{form.resumeName}</span>
                </p>
              )}
            </div>

            {status === "success" && (
              <div className="mt-5 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-200">
                Application sent successfully ✅
              </div>
            )}

            {status === "error" && (
              <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                {errorMsg || "Something went wrong."}
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="rounded-xl bg-white text-black px-6 py-3 font-semibold text-center hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading resume..." : loading ? "Sending..." : "Submit Application"}
              </button>

              <Link
                to="/careers"
                className="rounded-xl border border-white/15 bg-transparent px-6 py-3 font-semibold text-center hover:bg-white/10 transition"
              >
                Back
              </Link>
            </div>
          </form>

          <p className="mt-4 text-xs text-white/50">
            Resume is uploaded securely and sent as a link (prevents EmailJS 413 error).
          </p>
        </div>
      </section>
    </div>
  );
};

export default Apply;
