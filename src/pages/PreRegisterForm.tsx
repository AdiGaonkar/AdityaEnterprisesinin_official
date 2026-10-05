import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

const PURPLE = "#7834c8";

const PreRegisterForm = () => {
  const [searchParams] = useSearchParams();

  const selectedProduct =
    searchParams.get("product") || "Analog Watches";

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    budget: "",
    city: "",
    state: "",
    pincode: "",
    updates: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const validateForm = () => {
    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const mobile = formData.mobile.trim();
    const pincode = formData.pincode.trim();

    if (fullName.length < 2) {
      return "Please enter your full name.";
    }

    if (!email) {
      return "Please enter your email address.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address.";
    }

    const mobileDigits = mobile.replace(/\D/g, "");

    if (mobileDigits.length !== 10 && mobileDigits.length !== 12) {
      return "Please enter a valid Indian mobile number.";
    }

    if (pincode && !/^\d{6}$/.test(pincode)) {
      return "Please enter a valid 6-digit PIN code.";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setErrorMessage("");

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("pre_registrations")
        .insert({
          full_name: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          mobile: formData.mobile.trim(),
          product: selectedProduct,
          budget: formData.budget,
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim(),
          updates: formData.updates,
        });

      if (error) {
        console.error("SUPABASE ERROR:", error);

        if (error.code === "42501") {
          setErrorMessage(
            "We couldn't submit your registration right now. Please try again in a moment."
          );
        } else {
          setErrorMessage(
            "Something went wrong while submitting your registration. Please try again."
          );
        }

        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error("UNEXPECTED ERROR:", error);

      setErrorMessage(
        "Something went wrong. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     SUCCESS
  ========================================================= */

  if (submitted) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
        {/* Ambient Purple */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7834c8]/20 blur-[180px]" />
          <div className="absolute right-[-100px] top-[-100px] h-[400px] w-[400px] rounded-full bg-[#7834c8]/15 blur-[150px]" />
        </div>

        {/* Premium Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-16">
          <div className="w-full max-w-xl text-center">
            {/* Success Icon */}
            <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-[#7834c8]/40 bg-gradient-to-b from-[#7834c8]/20 to-transparent shadow-[0_0_80px_rgba(120,52,200,.35)] backdrop-blur-md">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-[#8c45dd] to-[#7834c8] shadow-[0_0_40px_rgba(120,52,200,.8)]">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.4em] text-purple-300">
              Registration Confirmed
            </p>

            <h1 className="mt-5 text-5xl font-bold tracking-tight md:text-7xl">
              You're on
              <span className="block bg-gradient-to-br from-white via-purple-100 to-[#7834c8] bg-clip-text pb-2 text-transparent">
                the list.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/80">
              Thanks for registering your interest in{" "}
              <span className="font-bold text-purple-300">
                {selectedProduct}
              </span>
              .
            </p>

            <p className="mt-2 text-sm text-white/60">
              We'll contact you when it's available.
            </p>

            {/* Product Card */}
            <div className="mx-auto mt-10 max-w-sm rounded-[2rem] border border-white/20 bg-white/[0.04] p-6 text-left shadow-2xl backdrop-blur-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                Your Selection
              </p>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-xl font-semibold tracking-wide text-white">
                  {selectedProduct}
                </p>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7834c8]/30 to-transparent border border-[#7834c8]/50 text-purple-300 shadow-inner">
                  ✓
                </div>
              </div>
            </div>

            <Link
              to="/pre-register"
              className="group mt-12 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#7834c8] to-[#6127a3] px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(120,52,200,.4)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(120,52,200,.6)] hover:ring-2 hover:ring-purple-400/60 text-white"
            >
              Explore Collection
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     FORM
  ========================================================= */

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-[#7834c8]/40 selection:text-white">
      {/* =====================================================
         BACKGROUND & GLOWS
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[5%] top-[5%] h-[500px] w-[500px] rounded-full bg-[#7834c8]/15 blur-[180px]" />
        <div className="absolute right-[2%] top-[40%] h-[450px] w-[450px] rounded-full bg-[#7834c8]/10 blur-[150px]" />
        <div className="absolute bottom-[-200px] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#7834c8]/15 blur-[200px]" />
      </div>

      {/* Premium Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
        {/* =====================================================
            TOP BAR
        ===================================================== */}
        <div className="flex items-center justify-between">
          <Link
            to="/pre-register"
            className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-white/70 transition hover:text-white"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors group-hover:border-white/40 group-hover:bg-white/10">
              <span className="transition-transform group-hover:-translate-x-0.5">
                ←
              </span>
            </div>
            Back
          </Link>

          <div className="text-xs font-extrabold tracking-[0.2em] text-white/70">
            ADITYA
            <span className="text-[#7834c8] shadow-[0_0_15px_#7834c8]">.</span>
          </div>
        </div>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}
        <div className="mx-auto mt-16 grid max-w-6xl items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          {/* =================================================
              LEFT CONTENT
          ================================================= */}
          <div className="lg:sticky lg:top-16">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#7834c8]/50 bg-gradient-to-r from-[#7834c8]/20 to-transparent px-5 py-2.5 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-300 shadow-[0_0_10px_#7834c8]"></span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-purple-200">
                Pre-Registration
              </span>
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-[5.5rem] text-white">
              Be the
              <br />
              <span className="bg-gradient-to-br from-white via-white to-purple-400 bg-clip-text text-transparent">
                Be Part of What’s Next.
              </span>
            </h1>

            <p className="mt-8 max-w-md text-base leading-relaxed text-white/80 md:text-lg md:leading-loose">
              Register your interest and we'll keep you updated when your
              selected product becomes available.
            </p>

            {/* Product Selection Card */}
            <div className="group mt-12 relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/[0.04] p-6 backdrop-blur-3xl transition-colors hover:bg-white/[0.06]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">
                    Your Selection
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    {selectedProduct}
                  </p>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#7834c8]/60 bg-gradient-to-br from-[#7834c8]/30 to-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                  <div className="h-3 w-3 rounded-full bg-purple-400 shadow-[0_0_20px_#7834c8]" />
                </div>
              </div>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-white/20 to-transparent" />

              <p className="mt-5 text-sm leading-relaxed text-white/60">
                You're registering interest only. No payment is required at this
                stage.
              </p>
            </div>

            {/* Steps */}
            <div className="mt-12 hidden space-y-7 lg:block">
              <div className="flex items-center gap-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#8c45dd] to-[#7834c8] text-xs font-bold shadow-[0_0_20px_rgba(120,52,200,.6)] text-white">
                  01
                </div>
                <div>
                  <p className="text-base font-semibold text-white">
                    Your Information
                  </p>
                  <p className="mt-1.5 text-xs text-white/60">
                    Tell us a little about yourself
                  </p>
                </div>
              </div>

              <div className="ml-5.5 h-10 w-px bg-gradient-to-b from-[#7834c8]/70 to-white/20" style={{ marginLeft: "21px" }} />

              <div className="flex items-center gap-5 opacity-60 transition-opacity duration-300 hover:opacity-100">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-xs font-bold backdrop-blur-sm text-white">
                  02
                </div>
                <div>
                  <p className="text-base font-semibold text-white">
                    Stay Updated
                  </p>
                  <p className="mt-1.5 text-xs text-white/60">
                    We'll let you know when it's ready
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT FORM
          ================================================= */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/90 p-6 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] backdrop-blur-3xl md:p-10"
          >
            {/* Subtle inner top glow for glass effect */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/[0.05] pointer-events-none" />

            {/* Form Header */}
            <div className="mb-10 border-b border-white/10 pb-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-purple-400">
                Your Information
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                Let's make it happen.
              </h2>
              <p className="mt-3 text-sm text-white/60">
                Fields marked with <span className="text-purple-400 font-bold">*</span> are
                required.
              </p>
            </div>

            {/* =================================================
                NAME
            ================================================= */}
            <div className="mb-7 relative z-10">
              <label
                htmlFor="fullName"
                className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-white/80"
              >
                Full Name <span className="text-purple-400">*</span>
              </label>
              <input
                id="fullName"
                required
                autoComplete="name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full rounded-2xl border border-white/20 bg-black/60 px-5 py-4 text-base text-white outline-none transition-all duration-300 placeholder:text-white/40 hover:border-white/40 focus:border-[#7834c8]/80 focus:bg-[#7834c8]/[0.05] focus:ring-4 focus:ring-[#7834c8]/20"
              />
            </div>

            {/* =================================================
                EMAIL + MOBILE
            ================================================= */}
            <div className="mb-7 grid gap-6 md:grid-cols-2 relative z-10">
              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-white/80"
                >
                  Email <span className="text-purple-400">*</span>
                </label>
                <input
                  id="email"
                  required
                  type="email"
                  autoComplete="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-white/20 bg-black/60 px-5 py-4 text-base text-white outline-none transition-all duration-300 placeholder:text-white/40 hover:border-white/40 focus:border-[#7834c8]/80 focus:bg-[#7834c8]/[0.05] focus:ring-4 focus:ring-[#7834c8]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-white/80"
                >
                  Mobile <span className="text-purple-400">*</span>
                </label>
                <input
                  id="mobile"
                  required
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-2xl border border-white/20 bg-black/60 px-5 py-4 text-base text-white outline-none transition-all duration-300 placeholder:text-white/40 hover:border-white/40 focus:border-[#7834c8]/80 focus:bg-[#7834c8]/[0.05] focus:ring-4 focus:ring-[#7834c8]/20"
                />
              </div>
            </div>

            {/* =================================================
                BUDGET
            ================================================= */}
            <div className="mb-7 relative z-10">
              <label
                htmlFor="budget"
                className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-white/80"
              >
                Preferred Budget
              </label>
              <div className="relative">
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-2xl border border-white/20 bg-black/60 px-5 py-4 text-base text-white outline-none transition-all duration-300 hover:border-white/40 focus:border-[#7834c8]/80 focus:bg-[#7834c8]/[0.05] focus:ring-4 focus:ring-[#7834c8]/20 cursor-pointer"
                >
                  <option value="" className="bg-[#090909] text-white">
                    Select your budget
                  </option>
                  <option value="Under ₹1,000" className="bg-[#090909] text-white">
                    Under ₹1,000
                  </option>
                  <option value="₹1,000 – ₹2,000" className="bg-[#090909] text-white">
                    ₹1,000 – ₹2,000
                  </option>
                  <option value="₹2,000 – ₹5,000" className="bg-[#090909] text-white">
                    ₹2,000 – ₹5,000
                  </option>
                  <option value="₹5,000+" className="bg-[#090909] text-white">
                    ₹5,000+
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-white/70">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* =================================================
                LOCATION
            ================================================= */}
            <div className="mb-8 relative z-10">
              <p className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                Location
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <input
                  id="city"
                  autoComplete="address-level2"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full rounded-2xl border border-white/20 bg-black/60 px-5 py-4 text-base text-white outline-none transition-all duration-300 placeholder:text-white/40 hover:border-white/40 focus:border-[#7834c8]/80 focus:bg-[#7834c8]/[0.05] focus:ring-4 focus:ring-[#7834c8]/20"
                />
                <input
                  id="state"
                  autoComplete="address-level1"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full rounded-2xl border border-white/20 bg-black/60 px-5 py-4 text-base text-white outline-none transition-all duration-300 placeholder:text-white/40 hover:border-white/40 focus:border-[#7834c8]/80 focus:bg-[#7834c8]/[0.05] focus:ring-4 focus:ring-[#7834c8]/20"
                />
                <input
                  id="pincode"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="PIN Code"
                  maxLength={6}
                  className="w-full rounded-2xl border border-white/20 bg-black/60 px-5 py-4 text-base text-white outline-none transition-all duration-300 placeholder:text-white/40 hover:border-white/40 focus:border-[#7834c8]/80 focus:bg-[#7834c8]/[0.05] focus:ring-4 focus:ring-[#7834c8]/20"
                />
              </div>
            </div>

            {/* =================================================
                CONSENT
            ================================================= */}
            <label className="mb-8 flex cursor-pointer items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.05]">
              <div className="relative mt-0.5 flex items-center justify-center">
                <input
                  type="checkbox"
                  name="updates"
                  checked={formData.updates}
                  onChange={handleChange}
                  className="peer h-6 w-6 appearance-none rounded-md border-2 border-white/40 bg-black/50 transition-all checked:border-[#7834c8] checked:bg-[#7834c8] hover:border-white/60 focus:outline-none focus:ring-2 focus:ring-[#7834c8]/60 cursor-pointer"
                />
                <svg
                  className="pointer-events-none absolute h-4 w-4 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sm leading-relaxed text-white/80">
                I agree to receive updates about this product and its availability.
              </span>
            </label>

            {/* =================================================
                ERROR
            ================================================= */}
            {errorMessage && (
              <div className="mb-6 rounded-2xl border border-red-500/40 bg-red-500/10 p-5 backdrop-blur-md">
                <p className="text-sm font-bold text-red-400">
                  Unable to complete registration
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-red-200">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* =================================================
                BUTTON
            ================================================= */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#7834c8] to-[#6127a3] py-5 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[0_10px_40px_rgba(120,52,200,.4)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_15px_60px_rgba(120,52,200,.6)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />

              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Registering...
                  </>
                ) : (
                  <>
                    Complete Registration
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-bold text-lg leading-none">
                      →
                    </span>
                  </>
                )}
              </span>
            </button>

            {/* Bottom Form Note */}
            <div className="mt-7 text-center">
              <p className="text-xs font-semibold text-white/60">
                No payment required
              </p>
              <p className="mt-1.5 text-[10px] text-white/40 uppercase tracking-widest">
                Interest registration only
              </p>
            </div>
          </form>
        </div>

        {/* Bottom Brand */}
        <div className="mx-auto mt-24 flex max-w-6xl items-center justify-between border-t border-white/10 pt-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
            Aditya <span className="font-medium text-white/40">(Techno Services)</span>
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
            Your demand. Our next collection.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PreRegisterForm;
