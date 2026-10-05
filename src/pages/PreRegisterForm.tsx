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
            <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-[#7834c8]/30 bg-gradient-to-b from-[#7834c8]/10 to-transparent shadow-[0_0_80px_rgba(120,52,200,.25)] backdrop-blur-md">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-[#8c45dd] to-[#7834c8] shadow-[0_0_40px_rgba(120,52,200,.6)]">
                <svg
                  width="28"
                  height="28"
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

            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-purple-300">
              Registration Confirmed
            </p>

            <h1 className="mt-5 text-5xl font-bold tracking-tight md:text-7xl">
              You're on
              <span className="block bg-gradient-to-br from-white via-purple-100 to-[#7834c8] bg-clip-text pb-2 text-transparent">
                the list.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/50">
              Thanks for registering your interest in{" "}
              <span className="font-medium text-purple-200">
                {selectedProduct}
              </span>
              .
            </p>

            <p className="mt-2 text-xs text-white/30">
              We'll contact you when it's available.
            </p>

            {/* Product Card */}
            <div className="mx-auto mt-10 max-w-sm rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 text-left shadow-2xl backdrop-blur-2xl">
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/30">
                Your Selection
              </p>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-lg font-medium tracking-wide text-white/90">
                  {selectedProduct}
                </p>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7834c8]/20 to-transparent border border-[#7834c8]/30 text-purple-300 shadow-inner">
                  ✓
                </div>
              </div>
            </div>

            <Link
              to="/pre-register"
              className="group mt-12 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#7834c8] to-[#6127a3] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(120,52,200,.3)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(120,52,200,.5)] hover:ring-2 hover:ring-purple-400/50"
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
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-[#7834c8]/30 selection:text-white">
      {/* =====================================================
         BACKGROUND & GLOWS
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[5%] top-[5%] h-[500px] w-[500px] rounded-full bg-[#7834c8]/15 blur-[180px]" />
        <div className="absolute right-[2%] top-[40%] h-[450px] w-[450px] rounded-full bg-[#7834c8]/10 blur-[150px]" />
        <div className="absolute bottom-[-200px] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#7834c8]/10 blur-[200px]" />
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
            className="group inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40 transition hover:text-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:border-white/20 group-hover:bg-white/10">
              <span className="transition-transform group-hover:-translate-x-0.5">
                ←
              </span>
            </div>
            Back
          </Link>

          <div className="text-[11px] font-bold tracking-[0.2em] text-white/30">
            ADITYA
            <span className="text-[#7834c8] shadow-[0_0_10px_#7834c8]">.</span>
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
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#7834c8]/40 bg-gradient-to-r from-[#7834c8]/10 to-transparent px-5 py-2.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7834c8] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_10px_#7834c8]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-purple-200">
                Pre-Registration
              </span>
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-[5.5rem]">
              Be the
              <br />
              <span className="bg-gradient-to-br from-white via-white to-[#7834c8]/80 bg-clip-text text-transparent">
                First to Know.
              </span>
            </h1>

            <p className="mt-8 max-w-md text-sm leading-relaxed text-white/50 md:text-base md:leading-loose">
              Register your interest and we'll keep you updated when your
              selected product becomes available.
            </p>

            {/* Product Selection Card */}
            <div className="group mt-12 relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 backdrop-blur-3xl transition-colors hover:bg-white/[0.03]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
                    Your Selection
                  </p>
                  <p className="mt-3 text-xl font-medium text-white/90">
                    {selectedProduct}
                  </p>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#7834c8]/40 bg-gradient-to-br from-[#7834c8]/20 to-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <div className="h-2.5 w-2.5 rounded-full bg-purple-400 shadow-[0_0_20px_#7834c8]" />
                </div>
              </div>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

              <p className="mt-5 text-[11px] leading-relaxed text-white/30">
                You're registering interest only. No payment is required at this
                stage.
              </p>
            </div>

            {/* Steps */}
            <div className="mt-12 hidden space-y-6 lg:block">
              <div className="flex items-center gap-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#8c45dd] to-[#7834c8] text-[11px] font-bold shadow-[0_0_20px_rgba(120,52,200,.4)]">
                  01
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90">
                    Your Information
                  </p>
                  <p className="mt-1 text-[11px] text-white/40">
                    Tell us a little about yourself
                  </p>
                </div>
              </div>

              <div className="ml-5 h-10 w-px bg-gradient-to-b from-[#7834c8]/50 to-white/10" />

              <div className="flex items-center gap-5 opacity-40 transition-opacity duration-300 hover:opacity-70">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[11px] font-medium backdrop-blur-sm">
                  02
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90">
                    Stay Updated
                  </p>
                  <p className="mt-1 text-[11px] text-white/40">
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
            className="relative rounded-[2.5rem] border border-white/[0.08] bg-[#0a0a0a]/80 p-6 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] backdrop-blur-3xl md:p-10"
          >
            {/* Subtle inner top glow for glass effect */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/[0.02] pointer-events-none" />

            {/* Form Header */}
            <div className="mb-10 border-b border-white/5 pb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400">
                Your Information
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white/90">
                Let's make it happen.
              </h2>
              <p className="mt-3 text-xs text-white/30">
                Fields marked with <span className="text-purple-400">*</span> are
                required.
              </p>
            </div>

            {/* =================================================
                NAME
            ================================================= */}
            <div className="mb-7 relative z-10">
              <label
                htmlFor="fullName"
                className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/50"
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
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white/90 outline-none transition-all duration-300 placeholder:text-white/20 hover:border-white/20 hover:bg-black/60 focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.02] focus:ring-4 focus:ring-[#7834c8]/10"
              />
            </div>

            {/* =================================================
                EMAIL + MOBILE
            ================================================= */}
            <div className="mb-7 grid gap-6 md:grid-cols-2 relative z-10">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/50"
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
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white/90 outline-none transition-all duration-300 placeholder:text-white/20 hover:border-white/20 hover:bg-black/60 focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.02] focus:ring-4 focus:ring-[#7834c8]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/50"
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
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white/90 outline-none transition-all duration-300 placeholder:text-white/20 hover:border-white/20 hover:bg-black/60 focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.02] focus:ring-4 focus:ring-[#7834c8]/10"
                />
              </div>
            </div>

            {/* =================================================
                BUDGET
            ================================================= */}
            <div className="mb-7 relative z-10">
              <label
                htmlFor="budget"
                className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/50"
              >
                Preferred Budget
              </label>
              <div className="relative">
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white/90 outline-none transition-all duration-300 hover:border-white/20 hover:bg-black/60 focus:border-[#7834c8]/70 focus:ring-4 focus:ring-[#7834c8]/10"
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
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-white/30">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
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
              <p className="mb-3 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
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
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white/90 outline-none transition-all duration-300 placeholder:text-white/20 hover:border-white/20 hover:bg-black/60 focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.02] focus:ring-4 focus:ring-[#7834c8]/10"
                />
                <input
                  id="state"
                  autoComplete="address-level1"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white/90 outline-none transition-all duration-300 placeholder:text-white/20 hover:border-white/20 hover:bg-black/60 focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.02] focus:ring-4 focus:ring-[#7834c8]/10"
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
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white/90 outline-none transition-all duration-300 placeholder:text-white/20 hover:border-white/20 hover:bg-black/60 focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.02] focus:ring-4 focus:ring-[#7834c8]/10"
                />
              </div>
            </div>

            {/* =================================================
                CONSENT
            ================================================= */}
            <label className="mb-8 flex cursor-pointer items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.01] p-5 transition-colors hover:bg-white/[0.02]">
              <div className="relative mt-0.5 flex items-center justify-center">
                <input
                  type="checkbox"
                  name="updates"
                  checked={formData.updates}
                  onChange={handleChange}
                  className="peer h-5 w-5 appearance-none rounded border border-white/20 bg-black/40 transition-all checked:border-[#7834c8] checked:bg-[#7834c8] hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-[#7834c8]/50"
                />
                <svg
                  className="pointer-events-none absolute h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-[11px] leading-relaxed text-white/40">
                I agree to receive updates about this product and its availability.
              </span>
            </label>

            {/* =================================================
                ERROR
            ================================================= */}
            {errorMessage && (
              <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 backdrop-blur-md">
                <p className="text-xs font-semibold text-red-400">
                  Unable to complete registration
                </p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-red-300/70">
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
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#7834c8] to-[#6127a3] py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_10px_40px_rgba(120,52,200,.3)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_15px_60px_rgba(120,52,200,.5)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />

              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    Registering...
                  </>
                ) : (
                  <>
                    Complete Registration
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </>
                )}
              </span>
            </button>

            {/* Bottom Form Note */}
            <div className="mt-7 text-center">
              <p className="text-[10px] font-medium text-white/30">
                No payment required
              </p>
              <p className="mt-1.5 text-[9px] text-white/20">
                Interest registration only
              </p>
            </div>
          </form>
        </div>

        {/* Bottom Brand */}
        <div className="mx-auto mt-20 flex max-w-6xl items-center justify-between border-t border-white/5 pt-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
            Aditya <span className="font-normal text-white/10">(Techno Services)</span>
          </p>
          <p className="text-[9px] uppercase tracking-[0.25em] text-white/15">
            Your demand. Our next collection.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PreRegisterForm;
