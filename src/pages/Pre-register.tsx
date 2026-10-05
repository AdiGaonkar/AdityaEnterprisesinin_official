import React, { useState } from "react";
import { Link } from "react-router-dom";

const PreRegister = () => {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    product: "Analog Watch",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Pre-registration:", formData);

    // Replace this later with Firebase/Supabase/API submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#090707] text-white flex items-center justify-center px-6">
        <div className="max-w-xl w-full text-center">

          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#c9a46c]/40 bg-[#c9a46c]/10">
            <span className="text-3xl text-[#d8b77a]">✓</span>
          </div>

          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a46c] mb-5">
            Registration Confirmed
          </p>

          <h1 className="font-serif text-4xl md:text-6xl mb-6">
            You're on the list.
          </h1>

          <p className="text-white/60 leading-7 max-w-md mx-auto mb-10">
            Thank you for registering your interest in our upcoming
            analog watch collection. We'll contact you when the collection
            is ready for launch.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-[#c9a46c]/60 px-8 py-4 text-sm tracking-[0.2em] uppercase text-[#e2c38b] transition-all hover:bg-[#c9a46c] hover:text-black"
          >
            Back to Website
          </Link>

        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#090707] text-white overflow-hidden">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative min-h-[85vh] flex items-center">

        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(130,20,30,0.30),transparent_45%)]" />

        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a46c]/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-10 py-24">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div>

              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-[#c9a46c]" />
                <span className="text-xs tracking-[0.4em] uppercase text-[#c9a46c]">
                  Pre-Registration
                </span>
              </div>

              <p className="text-sm tracking-[0.35em] uppercase text-white/50 mb-5">
                Something new is coming
              </p>

              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
                A New Era
                <br />
                <span className="text-[#d5b273] italic">
                  of Time.
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-white/55 leading-7 text-base md:text-lg">
                Discover our upcoming collection of carefully selected
                analog watches, designed for those who believe that
                time should look as good as it feels.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <a
                  href="#register"
                  className="group inline-flex items-center gap-4 rounded-full bg-[#d1ad70] px-7 py-4 text-sm font-medium tracking-[0.15em] uppercase text-black transition-all hover:bg-[#e4c78e]"
                >
                  Pre-Register
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href="#collection"
                  className="inline-flex items-center rounded-full border border-white/15 px-7 py-4 text-sm tracking-[0.15em] uppercase text-white/70 hover:border-[#c9a46c]/60 hover:text-[#d8b77a] transition-all"
                >
                  Explore
                </a>

              </div>

              <div className="mt-10 flex items-center gap-3 text-xs text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c9a46c]" />
                No payment required
              </div>

            </div>

            {/* RIGHT PRODUCT VISUAL */}
            <div
              id="collection"
              className="relative flex justify-center"
            >

              <div className="absolute w-[420px] h-[420px] rounded-full bg-[#8e1828]/20 blur-[100px]" />

              <div className="relative w-full max-w-md">

                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#c9a46c]/20 bg-gradient-to-br from-[#3a1118] via-[#17090c] to-black shadow-2xl">

                  {/* Decorative clock marks */}
                  <div className="absolute inset-10 rounded-full border border-[#c9a46c]/20" />
                  <div className="absolute inset-20 rounded-full border border-[#c9a46c]/10" />

                  {/* Watch */}
                  <div className="absolute inset-0 flex items-center justify-center">

                    <div className="relative">

                      {/* Strap */}
                      <div className="absolute left-1/2 -translate-x-1/2 -top-32 w-28 h-36 bg-gradient-to-r from-[#1c1c1c] via-[#4b4b4b] to-[#111] rounded-t-[3rem]" />

                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-32 w-28 h-36 bg-gradient-to-r from-[#111] via-[#414141] to-[#151515] rounded-b-[3rem]" />

                      {/* Case */}
                      <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-[#ead39b] via-[#8f6a2f] to-[#3d2a0e] p-[7px] shadow-[0_25px_80px_rgba(0,0,0,0.7)]">

                        {/* Dial */}
                        <div className="w-full h-full rounded-full bg-[#0b0b0b] border border-[#c9a46c]/40 relative overflow-hidden">

                          {/* Inner dial */}
                          <div className="absolute inset-5 rounded-full border border-[#c9a46c]/15" />

                          {/* 12 */}
                          <span className="absolute top-6 left-1/2 -translate-x-1/2 text-xs text-[#d8b77a]">
                            XII
                          </span>

                          {/* 3 */}
                          <span className="absolute right-7 top-1/2 -translate-y-1/2 text-xs text-[#d8b77a]">
                            III
                          </span>

                          {/* 6 */}
                          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-[#d8b77a]">
                            VI
                          </span>

                          {/* 9 */}
                          <span className="absolute left-7 top-1/2 -translate-y-1/2 text-xs text-[#d8b77a]">
                            IX
                          </span>

                          {/* Hands */}
                          <div className="absolute left-1/2 top-1/2 w-[2px] h-20 bg-[#e4c88f] origin-bottom -translate-x-1/2 -translate-y-full rotate-[35deg]" />

                          <div className="absolute left-1/2 top-1/2 w-[3px] h-14 bg-[#f1d99d] origin-bottom -translate-x-1/2 -translate-y-full -rotate-[55deg]" />

                          <div className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-[#d8b77a] -translate-x-1/2 -translate-y-1/2" />

                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Product label */}
                  <div className="absolute bottom-8 left-0 right-0 text-center">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9a46c]">
                      Aditya Collection
                    </p>

                    <p className="mt-2 font-serif text-2xl">
                      Classic Series
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          PRODUCT DETAILS
      ========================================================= */}

      <section className="border-y border-white/5 bg-[#0d090a]">

        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">

          <div className="text-center mb-14">

            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a46c] mb-4">
              The Collection
            </p>

            <h2 className="font-serif text-4xl md:text-5xl">
              Made for every moment.
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">

            {[
              ["01", "Classic Design", "Timeless aesthetics designed for everyday wear."],
              ["02", "Premium Finish", "A refined finish that elevates your wrist."],
              ["03", "Everyday Wear", "Designed to transition from casual to formal."],
              ["04", "Gift Ready", "A sophisticated choice for someone special."],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="bg-[#0d090a] p-8 hover:bg-[#160d0f] transition-colors"
              >
                <span className="text-xs text-[#c9a46c]">
                  {number}
                </span>

                <h3 className="mt-8 font-serif text-2xl">
                  {title}
                </h3>

                <p className="mt-4 text-sm text-white/45 leading-6">
                  {description}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>


      {/* =========================================================
          REGISTRATION
      ========================================================= */}

      <section
        id="register"
        className="relative py-24 px-6"
      >

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,20,35,0.18),transparent_55%)]" />

        <div className="relative max-w-3xl mx-auto">

          <div className="text-center mb-12">

            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a46c] mb-5">
              Be First
            </p>

            <h2 className="font-serif text-4xl md:text-6xl">
              Register Your Interest
            </h2>

            <p className="mt-5 text-white/45 max-w-xl mx-auto">
              Tell us what you're looking for. We'll let you know when
              the collection is ready.
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 md:p-10 backdrop-blur-xl"
          >

            {/* Name */}
            <div className="mb-6">
              <label className="mb-2 block text-sm text-white/70">
                Full Name <span className="text-[#c9a46c]">*</span>
              </label>

              <input
                required
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-white/25 outline-none transition-all focus:border-[#c9a46c]/60"
              />
            </div>


            {/* Email + Mobile */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Email Address <span className="text-[#c9a46c]">*</span>
                </label>

                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-white/25 outline-none focus:border-[#c9a46c]/60"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Mobile Number <span className="text-[#c9a46c]">*</span>
                </label>

                <input
                  required
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-white/25 outline-none focus:border-[#c9a46c]/60"
                />
              </div>

            </div>


            {/* Product */}
            <div className="mb-6">

              <label className="mb-3 block text-sm text-white/70">
                Product Interest
              </label>

              <select
                name="product"
                value={formData.product}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-[#120b0c] px-5 py-4 text-white outline-none focus:border-[#c9a46c]/60"
              >
                <option>Analog Watch</option>
                <option>Smart Watch</option>
                <option>Smart Band</option>
                <option>Smart Ring</option>
              </select>

            </div>


            {/* Budget */}
            <div className="mb-6">

              <label className="mb-3 block text-sm text-white/70">
                Preferred Budget
              </label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                {[
                  "Under ₹1,000",
                  "₹1,000 – ₹2,000",
                  "₹2,000 – ₹5,000",
                  "₹5,000+",
                ].map((budget) => (

                  <label
                    key={budget}
                    className={`cursor-pointer rounded-xl border p-4 text-center text-xs transition-all ${
                      formData.budget === budget
                        ? "border-[#c9a46c] bg-[#c9a46c]/10 text-[#e1c38a]"
                        : "border-white/10 bg-black/20 text-white/50 hover:border-white/20"
                    }`}
                  >

                    <input
                      type="radio"
                      name="budget"
                      value={budget}
                      checked={formData.budget === budget}
                      onChange={handleChange}
                      className="hidden"
                    />

                    {budget}

                  </label>

                ))}

              </div>

            </div>


            {/* Location */}
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
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-white/25 outline-none focus:border-[#c9a46c]/60"
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
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-white/25 outline-none focus:border-[#c9a46c]/60"
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
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-white/25 outline-none focus:border-[#c9a46c]/60"
                />
              </div>

            </div>


            {/* Updates */}
            <label className="flex items-start gap-3 cursor-pointer mb-8">

              <input
                type="checkbox"
                name="updates"
                checked={formData.updates}
                onChange={handleChange}
                className="mt-1 accent-[#c9a46c]"
              />

              <span className="text-xs text-white/40 leading-5">
                I agree to receive updates regarding the upcoming
                collection and availability.
              </span>

            </label>


            {/* Submit */}
            <button
              type="submit"
              className="group w-full rounded-xl bg-[#d1ad70] px-6 py-5 text-sm font-semibold tracking-[0.2em] uppercase text-black transition-all hover:bg-[#e5c88f] hover:shadow-[0_10px_50px_rgba(209,173,112,0.2)]"
            >
              Reserve My Interest
              <span className="ml-3 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>


            <p className="mt-5 text-center text-[11px] text-white/30">
              No payment required. This is an interest registration only.
            </p>

          </form>

        </div>
      </section>


      {/* =========================================================
          FOOTER CTA
      ========================================================= */}

      <section className="border-t border-white/5 py-16 text-center">

        <p className="text-xs tracking-[0.4em] uppercase text-[#c9a46c] mb-4">
          Aditya (Techno Services)
        </p>

        <h2 className="font-serif text-3xl md:text-4xl">
          Your demand.
          <span className="text-[#c9a46c] italic">
            {" "}Our next collection.
          </span>
        </h2>

      </section>

    </main>
  );
};

export default PreRegister;