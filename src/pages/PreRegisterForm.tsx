import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

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
     SUCCESS SCREEN
  ========================================================= */

  if (submitted) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#7834c8]/15 blur-[160px]" />

          <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#7834c8]/10 blur-[140px]" />

          <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-[120px]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,52,200,0.05),transparent_55%)]" />
        </div>

        {/* Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-16">
          <div className="w-full max-w-2xl text-center">
            {/* Success Icon */}
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-[#7834c8]/40 bg-[#7834c8]/10 shadow-[0_0_80px_rgba(120,52,200,0.2)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7834c8] text-white shadow-[0_0_30px_rgba(120,52,200,0.5)]">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            </div>

            {/* Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7834c8]/25 bg-[#7834c8]/10 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7834c8] shadow-[0_0_10px_#7834c8]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-purple-300">
                Registration Confirmed
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              You're on
              <span className="block bg-gradient-to-r from-white via-purple-200 to-[#7834c8] bg-clip-text text-transparent">
                the list.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/45 md:text-base">
              Thanks for registering your interest in{" "}
              <span className="font-medium text-purple-300">
                {selectedProduct}
              </span>
              .
            </p>

            <p className="mt-2 text-sm text-white/25">
              We'll contact you when the collection becomes available.
            </p>

            {/* Product Card */}
            <div className="mx-auto mt-10 max-w-lg rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-left shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                    Product Interest
                  </p>

                  <p className="mt-2 text-base font-medium text-white">
                    {selectedProduct}
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#7834c8]/30 bg-[#7834c8]/10">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#a978e8"
                    strokeWidth="1.8"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/pre-register"
              className="group mt-9 inline-flex items-center gap-3 rounded-full border border-[#7834c8]/50 bg-[#7834c8]/10 px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-purple-300 transition-all duration-300 hover:border-[#7834c8] hover:bg-[#7834c8] hover:text-white hover:shadow-[0_0_35px_rgba(120,52,200,0.35)]"
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
     FORM SCREEN
  ========================================================= */

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[650px] w-[850px] -translate-x-1/2 rounded-full bg-[#7834c8]/12 blur-[170px]" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#7834c8]/8 blur-[150px]" />

        <div className="absolute -left-40 top-1/2 h-[400px] w-[400px] rounded-full bg-purple-600/5 blur-[140px]" />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-16">
        {/* Back */}
        <div className="mb-10">
          <Link
            to="/pre-register"
            className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-white/30 transition-all duration-300 hover:text-purple-300"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to Collection
          </Link>
        </div>

        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#7834c8]/25 bg-[#7834c8]/10 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7834c8] shadow-[0_0_12px_#7834c8]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-purple-300">
              Pre-Registration
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Tell us what
            <span className="block bg-gradient-to-r from-white via-white to-[#7834c8] bg-clip-text text-transparent">
              you want next.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/40 md:text-base">
            Your interest helps us decide what to source next. No payment
            required — just tell us what you're looking for.
          </p>

          {/* Product */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#7834c8]/30 bg-[#7834c8]/10 px-5 py-2.5 shadow-[0_0_25px_rgba(120,52,200,0.08)]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7834c8] text-[9px] font-bold">
              ✓
            </span>

            <span className="text-xs font-medium text-purple-200">
              {selectedProduct}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="mx-auto mt-12 flex max-w-2xl items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7834c8] text-[10px] font-bold shadow-[0_0_25px_rgba(120,52,200,0.4)]">
              01
            </div>

            <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
              Details
            </span>

            <div className="h-px w-12 bg-white/10 sm:w-20" />

            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[10px] text-white/25">
              02
            </div>

            <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
              Confirm
            </span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.025] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:p-10"
        >
          {/* Form Header */}
          <div className="mb-10 flex flex-col justify-between gap-4 border-b border-white/10 pb-7 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-purple-400">
                Your Details
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Let's get to know you.
              </h2>
            </div>

            <p className="text-[10px] text-white/20">
              * Required fields
            </p>
          </div>

          {/* Name */}
          <div className="mb-7">
            <label
              htmlFor="fullName"
              className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45"
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
              placeholder="Enter your full name"
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 hover:border-white/20 focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.03] focus:shadow-[0_0_30px_rgba(120,52,200,0.08)]"
            />
          </div>

          {/* Email + Mobile */}
          <div className="mb-7 grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45"
              >
                Email Address <span className="text-purple-400">*</span>
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
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 hover:border-white/20 focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.03] focus:shadow-[0_0_30px_rgba(120,52,200,0.08)]"
              />
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45"
              >
                Mobile Number <span className="text-purple-400">*</span>
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
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 hover:border-white/20 focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.03] focus:shadow-[0_0_30px_rgba(120,52,200,0.08)]"
              />
            </div>
          </div>

          {/* Budget */}
          <div className="mb-7">
            <label
              htmlFor="budget"
              className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45"
            >
              Preferred Budget
            </label>

            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full appearance-none rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-sm text-white outline-none transition-all duration-300 hover:border-white/20 focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.03]"
            >
              <option value="" className="bg-[#0b0b0b]">
                Select your budget
              </option>

              <option value="Under ₹1,000" className="bg-[#0b0b0b]">
                Under ₹1,000
              </option>

              <option value="₹1,000 – ₹2,000" className="bg-[#0b0b0b]">
                ₹1,000 – ₹2,000
              </option>

              <option value="₹2,000 – ₹5,000" className="bg-[#0b0b0b]">
                ₹2,000 – ₹5,000
              </option>

              <option value="₹5,000+" className="bg-[#0b0b0b]">
                ₹5,000+
              </option>
            </select>
          </div>

          {/* Location */}
          <div className="mb-8">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Location
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-[10px] text-white/25"
                >
                  City
                </label>

                <input
                  id="city"
                  autoComplete="address-level2"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Mumbai"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 hover:border-white/20 focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.03]"
                />
              </div>

              {/* State */}
              <div>
                <label
                  htmlFor="state"
                  className="mb-2 block text-[10px] text-white/25"
                >
                  State
                </label>

                <input
                  id="state"
                  autoComplete="address-level1"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Maharashtra"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 hover:border-white/20 focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.03]"
                />
              </div>

              {/* PIN */}
              <div>
                <label
                  htmlFor="pincode"
                  className="mb-2 block text-[10px] text-white/25"
                >
                  PIN Code
                </label>

                <input
                  id="pincode"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="400001"
                  maxLength={6}
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 hover:border-white/20 focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.03]"
                />
              </div>
            </div>
          </div>

          {/* Consent */}
          <label className="mb-7 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.015] p-4 transition-colors hover:border-[#7834c8]/20">
            <input
              type="checkbox"
              name="updates"
              checked={formData.updates}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#7834c8]"
            />

            <span className="text-xs leading-5 text-white/35">
              I agree to receive updates about this product and its
              availability.
            </span>
          </label>

          {/* Error */}
          {errorMessage && (
            <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-4">
              <div className="flex gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs text-red-400">
                  !
                </div>

                <div>
                  <p className="text-xs font-medium text-red-300">
                    Unable to complete registration
                  </p>

                  <p className="mt-1 text-xs leading-5 text-red-300/50">
                    {errorMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full overflow-hidden rounded-2xl bg-[#7834c8] py-5 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_40px_rgba(120,52,200,0.2)] transition-all duration-300 hover:bg-[#8d45df] hover:shadow-[0_15px_50px_rgba(120,52,200,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
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
                  Complete Pre-Registration
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </>
              )}
            </span>
          </button>

          {/* Footer */}
          <div className="mt-7 text-center">
            <p className="text-[11px] text-white/25">
              No payment required.
            </p>

            <p className="mt-1 text-[10px] text-white/15">
              This is an interest registration only.
            </p>
          </div>
        </form>

        {/* Trust */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white/15">
          <span>Private Registration</span>

          <span className="h-1 w-1 rounded-full bg-[#7834c8]/40" />

          <span>No Payment Required</span>

          <span className="h-1 w-1 rounded-full bg-[#7834c8]/40" />

          <span>Aditya (Techno Services)</span>
        </div>
      </div>
    </main>
  );
};

export default PreRegisterForm;
