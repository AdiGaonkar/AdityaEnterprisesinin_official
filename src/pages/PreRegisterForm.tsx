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
          <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7834c8]/15 blur-[150px]" />

          <div className="absolute right-[-100px] top-[-100px] h-[350px] w-[350px] rounded-full bg-[#7834c8]/10 blur-[130px]" />
        </div>

        {/* Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-16">
          <div className="w-full max-w-xl text-center">

            {/* Success Icon */}
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-[#7834c8]/40 bg-[#7834c8]/10 shadow-[0_0_70px_rgba(120,52,200,.2)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7834c8] shadow-[0_0_30px_rgba(120,52,200,.5)]">
                <svg
                  width="26"
                  height="26"
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

            <p className="text-[10px] uppercase tracking-[0.4em] text-purple-300">
              Registration Confirmed
            </p>

            <h1 className="mt-5 text-5xl font-bold tracking-tight md:text-7xl">
              You're on
              <span className="block bg-gradient-to-r from-white via-purple-200 to-[#7834c8] bg-clip-text text-transparent">
                the list.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/40">
              Thanks for registering your interest in{" "}
              <span className="text-purple-300">
                {selectedProduct}
              </span>
              .
            </p>

            <p className="mt-2 text-xs text-white/25">
              We'll contact you when it's available.
            </p>

            {/* Product */}
            <div className="mt-9 rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-left backdrop-blur-xl">
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/25">
                Your Selection
              </p>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-base font-medium">
                  {selectedProduct}
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7834c8]/15 text-purple-300">
                  ✓
                </div>
              </div>
            </div>

            <Link
              to="/pre-register"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#7834c8] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#8c45dd] hover:shadow-[0_0_40px_rgba(120,52,200,.35)]"
            >
              Explore Collection
              <span className="transition-transform group-hover:translate-x-1">
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
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-[10%] top-[10%] h-[450px] w-[450px] rounded-full bg-[#7834c8]/10 blur-[160px]" />

        <div className="absolute right-[5%] top-[45%] h-[400px] w-[400px] rounded-full bg-[#7834c8]/8 blur-[150px]" />

        <div className="absolute bottom-[-150px] left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-purple-900/10 blur-[160px]" />

      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">

        {/* =====================================================
            TOP BAR
        ===================================================== */}

        <div className="flex items-center justify-between">

          <Link
            to="/pre-register"
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/30 transition hover:text-white"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>

            Back
          </Link>

          <div className="text-[10px] font-semibold tracking-[0.15em] text-white/20">
            ADITYA
            <span className="text-[#7834c8]">.</span>
          </div>

        </div>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="mx-auto mt-16 grid max-w-6xl items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="lg:sticky lg:top-10">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#7834c8]/30 bg-[#7834c8]/10 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7834c8] shadow-[0_0_10px_#7834c8]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-purple-300">
                Pre-Registration
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-[1.02] tracking-[-0.04em] md:text-7xl">

              Be the
              <br />

              <span className="bg-gradient-to-r from-white via-white to-purple-400 bg-clip-text text-transparent">
                First to Know.
              </span>

            </h1>

            <p className="mt-7 max-w-md text-sm leading-7 text-white/40 md:text-base">
              Register your interest and we'll keep you updated
              when your selected product becomes available.
            </p>

            {/* Product Selection */}
            <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/25">
                    Your Selection
                  </p>

                  <p className="mt-3 text-lg font-medium">
                    {selectedProduct}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#7834c8]/30 bg-[#7834c8]/10">
                  <div className="h-2 w-2 rounded-full bg-[#7834c8] shadow-[0_0_15px_#7834c8]" />
                </div>

              </div>

              <div className="mt-5 h-px bg-white/5" />

              <p className="mt-4 text-[10px] leading-5 text-white/25">
                You're registering interest only. No payment is
                required at this stage.
              </p>

            </div>

            {/* Steps */}
            <div className="mt-8 hidden space-y-5 lg:block">

              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7834c8] text-[10px] font-bold">
                  01
                </div>

                <div>
                  <p className="text-xs font-medium">
                    Your Information
                  </p>

                  <p className="mt-1 text-[10px] text-white/20">
                    Tell us a little about yourself
                  </p>
                </div>
              </div>

              <div className="ml-4 h-8 w-px bg-white/10" />

              <div className="flex items-center gap-4 opacity-30">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[10px]">
                  02
                </div>

                <div>
                  <p className="text-xs font-medium">
                    Stay Updated
                  </p>

                  <p className="mt-1 text-[10px] text-white/20">
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
            className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_40px_120px_rgba(0,0,0,.5)] backdrop-blur-2xl md:p-9"
          >

            {/* Form Header */}
            <div className="mb-9 border-b border-white/10 pb-7">

              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-purple-400">
                Your Information
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Let's make it happen.
              </h2>

              <p className="mt-2 text-xs text-white/25">
                Fields marked with * are required.
              </p>

            </div>

            {/* =================================================
                NAME
            ================================================= */}

            <div className="mb-6">

              <label
                htmlFor="fullName"
                className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40"
              >
                Full Name
                <span className="ml-1 text-purple-400">*</span>
              </label>

              <input
                id="fullName"
                required
                autoComplete="name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm outline-none transition-all duration-300 placeholder:text-white/15 hover:border-white/20 focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.03] focus:shadow-[0_0_25px_rgba(120,52,200,.08)]"
              />

            </div>

            {/* =================================================
                EMAIL + MOBILE
            ================================================= */}

            <div className="mb-6 grid gap-5 md:grid-cols-2">

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40"
                >
                  Email
                  <span className="ml-1 text-purple-400">*</span>
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
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm outline-none transition-all duration-300 placeholder:text-white/15 hover:border-white/20 focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.03]"
                />

              </div>

              <div>

                <label
                  htmlFor="mobile"
                  className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40"
                >
                  Mobile
                  <span className="ml-1 text-purple-400">*</span>
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
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm outline-none transition-all duration-300 placeholder:text-white/15 hover:border-white/20 focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.03]"
                />

              </div>

            </div>

            {/* =================================================
                BUDGET
            ================================================= */}

            <div className="mb-6">

              <label
                htmlFor="budget"
                className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40"
              >
                Preferred Budget
              </label>

              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-white outline-none transition-all duration-300 hover:border-white/20 focus:border-[#7834c8]/70"
              >
                <option value="" className="bg-[#090909]">
                  Select your budget
                </option>

                <option value="Under ₹1,000" className="bg-[#090909]">
                  Under ₹1,000
                </option>

                <option value="₹1,000 – ₹2,000" className="bg-[#090909]">
                  ₹1,000 – ₹2,000
                </option>

                <option value="₹2,000 – ₹5,000" className="bg-[#090909]">
                  ₹2,000 – ₹5,000
                </option>

                <option value="₹5,000+" className="bg-[#090909]">
                  ₹5,000+
                </option>
              </select>

            </div>

            {/* =================================================
                LOCATION
            ================================================= */}

            <div className="mb-7">

              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40">
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
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm outline-none transition-all duration-300 placeholder:text-white/15 focus:border-[#7834c8]/70"
                />

                <input
                  id="state"
                  autoComplete="address-level1"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm outline-none transition-all duration-300 placeholder:text-white/15 focus:border-[#7834c8]/70"
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
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm outline-none transition-all duration-300 placeholder:text-white/15 focus:border-[#7834c8]/70"
                />

              </div>

            </div>

            {/* =================================================
                CONSENT
            ================================================= */}

            <label className="mb-6 flex cursor-pointer items-start gap-3 rounded-xl border border-white/5 bg-white/[0.015] p-4">
              <input
                type="checkbox"
                name="updates"
                checked={formData.updates}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#7834c8]"
              />

              <span className="text-[11px] leading-5 text-white/30">
                I agree to receive updates about this product and
                its availability.
              </span>
            </label>

            {/* =================================================
                ERROR
            ================================================= */}

            {errorMessage && (
              <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-medium text-red-300">
                  Unable to complete registration
                </p>

                <p className="mt-1 text-[11px] leading-5 text-red-300/50">
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
              className="group relative w-full overflow-hidden rounded-xl bg-[#7834c8] py-5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_40px_rgba(120,52,200,.2)] transition-all duration-300 hover:bg-[#8c45dd] hover:shadow-[0_15px_50px_rgba(120,52,200,.35)] disabled:cursor-not-allowed disabled:opacity-60"
            >

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative z-10 flex items-center justify-center gap-3">

                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    Registering...
                  </>
                ) : (
                  <>
                    Complete Registration

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}

              </span>

            </button>

            {/* Bottom */}
            <div className="mt-6 text-center">

              <p className="text-[10px] text-white/20">
                No payment required
              </p>

              <p className="mt-1 text-[9px] text-white/10">
                Interest registration only
              </p>

            </div>

          </form>
        </div>

        {/* Bottom Brand */}
        <div className="mx-auto mt-14 flex max-w-6xl items-center justify-between border-t border-white/5 pt-6">

          <p className="text-[9px] uppercase tracking-[0.2em] text-white/15">
            Aditya (Techno Services)
          </p>

          <p className="text-[9px] uppercase tracking-[0.2em] text-white/10">
            Your demand. Our next collection.
          </p>

        </div>

      </div>
    </main>
  );
};

export default PreRegisterForm;
