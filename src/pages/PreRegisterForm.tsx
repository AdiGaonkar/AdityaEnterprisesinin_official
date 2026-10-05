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

    // Clear previous error when user starts editing again
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

    // Allows:
    // 9876543210
    // +919876543210
    // +91 9876543210
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
      <main className="min-h-screen bg-[#080606] text-white relative overflow-hidden">

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#8f1d2c]/10 blur-[140px]" />
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#c9a46c]/5 blur-[100px]" />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">

          <div className="w-full max-w-2xl text-center">

            {/* Success icon */}
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-[#c9a46c]/40 bg-[#c9a46c]/10 shadow-[0_0_60px_rgba(201,164,108,0.08)]">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d1ad70] text-black">

                <svg
                  width="26"
                  height="26"
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
            <p className="text-[10px] md:text-xs tracking-[0.45em] uppercase text-[#c9a46c]">
              Registration Confirmed
            </p>

            {/* Heading */}
            <h1 className="mt-5 font-serif text-5xl md:text-7xl leading-tight">
              You're on the list.
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-sm md:text-base leading-7 text-white/50">
              Thank you for registering your interest in{" "}
              <span className="text-[#d8b77a]">
                {selectedProduct}
              </span>
              .
            </p>

            <p className="mt-3 text-sm text-white/30">
              We'll contact you when the collection is ready.
            </p>

            {/* Registration card */}
            <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-white/10 bg-white/[0.025] p-5">

              <div className="flex items-center justify-between gap-4">

                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                    Product Interest
                  </p>

                  <p className="mt-2 text-sm text-white/70">
                    {selectedProduct}
                  </p>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c9a46c]/20 bg-[#c9a46c]/5">

                  <span className="text-[#d8b77a]">✓</span>

                </div>

              </div>

            </div>

            {/* CTA */}
            <Link
              to="/pre-register"
              className="mt-10 inline-flex items-center justify-center rounded-full border border-[#c9a46c]/50 px-8 py-4 text-xs tracking-[0.2em] uppercase text-[#d8b77a] transition-all duration-300 hover:bg-[#c9a46c] hover:text-black"
            >
              Explore Collection
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
    <main className="min-h-screen bg-[#080606] text-white relative overflow-hidden">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#8f1d2c]/10 blur-[150px]" />

        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-[#c9a46c]/5 blur-[120px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-20">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-12 text-center">

          <Link
            to="/pre-register"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/30 transition-colors hover:text-[#d8b77a]"
          >
            <span>←</span>
            Back to Collection
          </Link>

          <p className="mt-10 text-[10px] md:text-xs tracking-[0.45em] uppercase text-[#c9a46c]">
            Pre-Registration
          </p>

          <h1 className="mt-4 font-serif text-4xl md:text-6xl leading-tight">
            Register Your Interest
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/35">
            Tell us what you're looking for. Your interest helps us curate
            the next collection.
          </p>

          {/* Selected product */}
          <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-[#c9a46c]/25 bg-[#c9a46c]/5 px-5 py-2.5">

            <span className="h-1.5 w-1.5 rounded-full bg-[#d8b77a]" />

            <span className="text-xs text-[#d8b77a]">
              {selectedProduct}
            </span>

          </div>

        </div>

        {/* =====================================================
            FORM CARD
        ===================================================== */}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 shadow-2xl backdrop-blur-xl md:p-10"
        >

          {/* FORM INTRO */}
          <div className="mb-10 border-b border-white/10 pb-7">

            <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a46c]">
              Your Details
            </p>

            <h2 className="mt-2 font-serif text-2xl text-white">
              Let's get to know what you want.
            </h2>

          </div>

          {/* =====================================================
              FULL NAME
          ===================================================== */}

          <div className="mb-7">

            <label
              htmlFor="fullName"
              className="mb-2.5 block text-xs font-medium uppercase tracking-[0.12em] text-white/55"
            >
              Full Name <span className="text-[#d8b77a]">*</span>
            </label>

            <input
              id="fullName"
              required
              autoComplete="name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-[#c9a46c]/60 focus:bg-black/40"
            />

          </div>

          {/* =====================================================
              EMAIL + MOBILE
          ===================================================== */}

          <div className="mb-7 grid gap-6 md:grid-cols-2">

            {/* EMAIL */}

            <div>

              <label
                htmlFor="email"
                className="mb-2.5 block text-xs font-medium uppercase tracking-[0.12em] text-white/55"
              >
                Email Address <span className="text-[#d8b77a]">*</span>
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
                className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-[#c9a46c]/60 focus:bg-black/40"
              />

            </div>

            {/* MOBILE */}

            <div>

              <label
                htmlFor="mobile"
                className="mb-2.5 block text-xs font-medium uppercase tracking-[0.12em] text-white/55"
              >
                Mobile Number <span className="text-[#d8b77a]">*</span>
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
                className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-[#c9a46c]/60 focus:bg-black/40"
              />

            </div>

          </div>

          {/* =====================================================
              BUDGET
          ===================================================== */}

          <div className="mb-7">

            <label
              htmlFor="budget"
              className="mb-2.5 block text-xs font-medium uppercase tracking-[0.12em] text-white/55"
            >
              Preferred Budget
            </label>

            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full appearance-none rounded-xl border border-white/10 bg-[#120b0c] px-5 py-4 text-sm text-white outline-none transition-all duration-300 focus:border-[#c9a46c]/60"
            >

              <option value="">
                Select your budget
              </option>

              <option value="Under ₹1,000">
                Under ₹1,000
              </option>

              <option value="₹1,000 – ₹2,000">
                ₹1,000 – ₹2,000
              </option>

              <option value="₹2,000 – ₹5,000">
                ₹2,000 – ₹5,000
              </option>

              <option value="₹5,000+">
                ₹5,000+
              </option>

            </select>

          </div>

          {/* =====================================================
              LOCATION
          ===================================================== */}

          <div className="mb-8">

            <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-white/55">
              Location
            </p>

            <div className="grid gap-6 md:grid-cols-3">

              {/* CITY */}

              <div>

                <label
                  htmlFor="city"
                  className="mb-2 block text-xs text-white/35"
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
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-[#c9a46c]/60"
                />

              </div>

              {/* STATE */}

              <div>

                <label
                  htmlFor="state"
                  className="mb-2 block text-xs text-white/35"
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
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-[#c9a46c]/60"
                />

              </div>

              {/* PIN */}

              <div>

                <label
                  htmlFor="pincode"
                  className="mb-2 block text-xs text-white/35"
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
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-[#c9a46c]/60"
                />

              </div>

            </div>

          </div>

          {/* =====================================================
              CONSENT
          ===================================================== */}

          <label className="mb-7 flex cursor-pointer items-start gap-3">

            <input
              type="checkbox"
              name="updates"
              checked={formData.updates}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#c9a46c]"
            />

            <span className="text-xs leading-5 text-white/35">
              I agree to receive updates about this product and its
              availability.
            </span>

          </label>

          {/* =====================================================
              ERROR
          ===================================================== */}

          {errorMessage && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-4">

              <div className="flex gap-3">

                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs text-red-400">
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

          {/* =====================================================
              SUBMIT
          ===================================================== */}

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full overflow-hidden rounded-xl bg-[#d1ad70] py-5 text-sm font-semibold tracking-[0.2em] uppercase text-black transition-all duration-300 hover:bg-[#e5c88f] disabled:cursor-not-allowed disabled:opacity-60"
          >

            <span className="relative z-10 flex items-center justify-center gap-3">

              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
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

          {/* =====================================================
              FOOTNOTE
          ===================================================== */}

          <div className="mt-6 text-center">

            <p className="text-[11px] text-white/25">
              No payment required.
            </p>

            <p className="mt-1 text-[10px] text-white/15">
              This is an interest registration only.
            </p>

          </div>

        </form>

        {/* =====================================================
            BOTTOM TRUST TEXT
        ===================================================== */}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.15em] text-white/20">

          <span>Private Registration</span>

          <span className="h-1 w-1 rounded-full bg-white/15" />

          <span>No Payment Required</span>

          <span className="h-1 w-1 rounded-full bg-white/15" />

          <span>Aditya (Techno Services)</span>

        </div>

      </div>

    </main>
  );
};

export default PreRegisterForm;
