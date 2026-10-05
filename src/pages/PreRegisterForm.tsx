import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
const PreRegisterForm = () => {
  const [searchParams] = useSearchParams();

  const selectedProduct =
    searchParams.get("product") || "Analog Watch";

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("pre_registrations")
      .insert({
        full_name: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        product: selectedProduct,
        budget: formData.budget,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        updates: formData.updates,
      });

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#090707] text-white flex items-center justify-center px-6">

        <div className="max-w-xl text-center">

          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#c9a46c]/40 bg-[#c9a46c]/10">

            <span className="text-3xl text-[#d8b77a]">
              ✓
            </span>

          </div>

          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a46c]">
            Registration Confirmed
          </p>

          <h1 className="mt-5 font-serif text-5xl md:text-6xl">
            You're on the list.
          </h1>

          <p className="mt-6 text-white/50 leading-7">
            Thank you for registering your interest in{" "}
            <span className="text-[#d8b77a]">
              {selectedProduct}
            </span>
            .
          </p>

          <p className="mt-3 text-sm text-white/35">
            We'll contact you when the collection is ready.
          </p>

          <Link
            to="/pre-register"
            className="mt-10 inline-flex rounded-full border border-[#c9a46c]/50 px-7 py-4 text-xs tracking-[0.2em] uppercase text-[#d8b77a] hover:bg-[#c9a46c] hover:text-black transition-all"
          >
            Explore Collection
          </Link>

        </div>

      </main>
    );
  }


  return (
    <main className="min-h-screen bg-[#090707] text-white">

      <div className="max-w-3xl mx-auto px-6 py-20">

        {/* HEADER */}

        <div className="text-center mb-12">

          <Link
            to="/pre-register"
            className="text-xs tracking-[0.2em] uppercase text-white/30 hover:text-[#d8b77a]"
          >
            ← Back to Collection
          </Link>

          <p className="mt-10 text-xs tracking-[0.4em] uppercase text-[#c9a46c]">
            Pre-Registration
          </p>

          <h1 className="mt-4 font-serif text-4xl md:text-6xl">
            Register Your Interest
          </h1>

          <div className="mt-7 inline-flex rounded-full border border-[#c9a46c]/30 bg-[#c9a46c]/5 px-5 py-2">

            <span className="text-xs text-[#d8b77a]">
              {selectedProduct}
            </span>

          </div>

        </div>


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 md:p-10"
        >

          {/* FULL NAME */}

          <div className="mb-6">

            <label className="mb-2 block text-sm text-white/70">
              Full Name *
            </label>

            <input
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 outline-none focus:border-[#c9a46c]/60"
            />

          </div>


          {/* EMAIL + MOBILE */}

          <div className="grid md:grid-cols-2 gap-6 mb-6">

            <div>

              <label className="mb-2 block text-sm text-white/70">
                Email Address *
              </label>

              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 outline-none focus:border-[#c9a46c]/60"
              />

            </div>


            <div>

              <label className="mb-2 block text-sm text-white/70">
                Mobile Number *
              </label>

              <input
                required
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 outline-none focus:border-[#c9a46c]/60"
              />

            </div>

          </div>


          {/* BUDGET */}

          <div className="mb-6">

            <label className="mb-3 block text-sm text-white/70">
              Preferred Budget
            </label>

            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#120b0c] px-5 py-4 outline-none"
            >

              <option value="">
                Select your budget
              </option>

              <option>Under ₹1,000</option>
              <option>₹1,000 – ₹2,000</option>
              <option>₹2,000 – ₹5,000</option>
              <option>₹5,000+</option>

            </select>

          </div>


          {/* LOCATION */}

          <div className="grid md:grid-cols-3 gap-6 mb-8">

            <div>

              <label className="mb-2 block text-sm text-white/70">
                City
              </label>

              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Mumbai"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm text-white/70">
                State
              </label>

              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Maharashtra"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm text-white/70">
                PIN Code
              </label>

              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="400001"
                maxLength={6}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 outline-none"
              />

            </div>

          </div>


          {/* CONSENT */}

          <label className="flex gap-3 mb-8 cursor-pointer">

            <input
              type="checkbox"
              name="updates"
              checked={formData.updates}
              onChange={handleChange}
              className="mt-1 accent-[#c9a46c]"
            />

            <span className="text-xs text-white/40 leading-5">
              I agree to receive updates about this product and
              its availability.
            </span>

          </label>


          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#d1ad70] py-5 text-sm font-semibold tracking-[0.2em] uppercase text-black hover:bg-[#e5c88f] disabled:opacity-50"
          >
            {loading
              ? "Registering..."
              : "Complete Pre-Registration →"}
          </button>

          <p className="mt-5 text-center text-[11px] text-white/25">
            No payment required. This is an interest registration only.
          </p>

        </form>

      </div>

    </main>
  );
};

export default PreRegisterForm;
