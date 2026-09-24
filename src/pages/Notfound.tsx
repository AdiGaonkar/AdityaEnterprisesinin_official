import React from "react";

const links = [
  { label: "About us", href: "/about", desc: "Who we are & what we do" },
  { label: "Portfolio", href: "/portfolio", desc: "See our recent work" },
  { label: "Solution hub", href: "/solutions", desc: "Explore our services" },
];

export default function NotFound404() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0b0b0f] text-white">
      {/* soft gradient blobs */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-yellow-500/25 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-yellow-500/25 blur-3xl" />

      {/* huge 404 background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="text-[28vw] font-black tracking-tight leading-none text-white/10">
          4 0 4
        </div>
      </div>

      {/* arrows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 text-yellow-400/80 text-7xl rotate-0">
          ↘
        </div>
        <div className="absolute bottom-20 right-20 text-yellow-400/80 text-7xl">
          ↗
        </div>
      </div>

      {/* content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6">
          <div className="text-xs uppercase tracking-widest text-white/60">
            ... 404 error ...
          </div>

          <h1 className="mt-2 text-2xl font-semibold">
            Sorry, page not found
          </h1>

          <p className="mt-2 text-sm text-white/70">
            Go to other sections to learn more about our website.
          </p>

          <div className="mt-5 space-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3 hover:bg-black/30 transition"
              >
                <div>
                  <div className="text-sm font-medium">{l.label}</div>
                  <div className="text-xs text-white/60">{l.desc}</div>
                </div>
                <div className="text-white/60 group-hover:text-white transition">
                  →
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <a
              href="/"
              className="w-full rounded-xl bg-white text-black font-semibold py-3 text-center hover:opacity-90 transition"
            >
              Back to home
            </a>

            <a
              href="/contact"
              className="w-full rounded-xl border border-white/15 bg-transparent py-3 text-center font-semibold text-white hover:bg-white/10 transition"
            >
              Book a call
            </a>
          </div>

          <div className="mt-4 text-center text-xs text-white/50">
            If you think this is a mistake, contact support.
          </div>
        </div>
      </div>
    </div>
  );
}
