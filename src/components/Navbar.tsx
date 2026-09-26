import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onScrollTo = () => { } }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navOverlayOpen, setNavOverlayOpen] = useState(false);

  const mainNavItems = [
    { label: "About us", id: "about", href: "/AboutPage" },
    { label: "Products", id: "reviews", href: "/Products" },
    { label: "Services", id: "contact", href: "/ServicesSection" },
    { label: "Contact us", id: "contact", href: "/Contact" },
  ];

  const sideNavItems = [
    { label: "Home", id: "home", href: "/" },
    { label: "Services", id: "services", href: "/ServicesSection" },
    { label: "About Us", id: "about", href: "/AboutPage" },
    { label: "Products", id: "Products", href: "/Products" },
    { label: "Career", id: "reviews", href: "/Career" },
    { label: "Contact Us", id: "contact", href: "/Contact" },
  ];

  const handleNavClick = (e, item) => {
    if (item.href.startsWith("#")) {
      e.preventDefault();
      onScrollTo(item.id);
    }
  };

  return (
    <>
      {/* ================= TOP NAV ================= */}
      <header className="fixed cursor-pointer font-stacksansnotch top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 pt-4">
        <div className="mx-auto max-w-[1600px] flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            {/* Logo */}
            <div className="flex items-center justify-center">
              {/* Robust container for a perfect circle and centering */}
              <div className="h-10 w-10 flex items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white shadow-sm">
                <img
                  src="image-removebg-preview.png"
                  alt="Aditya Enterprises Logo"
                  className="h-12 w-12 object-contain" // Use object-contain to keep the full logo visible
                />
              </div>
            </div>

            {/* Brand Name */}
            <span className="text-sm font-semibold text-gray-100">
              Aditya<span className="text-white"> Enterprises</span>
            </span>
          </a>

          {/* Center Nav (desktop only) */}
          <nav className="hidden cursor-pointer -ml-28 md:flex">
            <div className="flex gap-8 rounded-full bg-neutral-800 px-10 py-3 text-sm text-gray-100">
              {mainNavItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="hover:text-white transition"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Hamburger -> opens fullscreen overlay */}
            <button
              className="hidden md:inline-flex h-12 w-14 items-center justify-center rounded-full bg-neutral-800"
              onClick={() => setNavOverlayOpen(true)}
            >
              <span className="flex flex-col gap-[3px]">
                <span className="h-[2px] w-5 bg-gray-100" />
                <span className="h-[2px] w-5 bg-gray-100" />
                <span className="h-[2px] w-5 bg-gray-100" />
              </span>
            </button>

            {/* Mobile Hamburger -> opens drawer */}
            <button
              className="md:hidden inline-flex h-12 w-14 items-center justify-center rounded-full bg-gray-100"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className="flex flex-col gap-[3px]">
                <span className="h-[2px] w-5 bg-gray-600" />
                <span className="h-[2px] w-5 bg-gray-600" />
                <span className="h-[2px] w-5 bg-gray-600" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Space so hero content doesn't go behind fixed navbar */}
      <div className="h-20 md:h-24" />

      {/* ================= MOBILE DRAWER MENU ================= */}
      <div
        className={`fixed inset-0 z-[70] md:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* backdrop */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />

        {/* drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white rounded-l-3xl shadow-xl
          transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-5 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-800">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xl"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <div className="px-5 pb-6 flex flex-col gap-3">
            {sideNavItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(e, item);
                  setMobileOpen(false);
                }}
                className="py-2 text-base text-gray-800 border-b border-gray-100"
              >
                {item.label}
              </a>
            ))}

            <a
              href="/Contact"
              onClick={(e) => {
                handleNavClick(e, { id: "contact", href: "#contact" });
                setMobileOpen(false);
              }}
              className="mt-4 inline-flex justify-center rounded-full bg-gray-200 text-black px-6 py-3 text-sm hover:bg-gray-300 transition"
            >
              + Become a Client
            </a>
          </div>
        </div>
      </div>

      {/* ================= FULLSCREEN NAV OVERLAY (desktop only) ================= */}
      <div
        className={`fixed inset-0 z-[90] bg-[#400087] font-stacksansnotch transition-opacity duration-500 hidden md:block ${navOverlayOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className="absolute inset-0 bg-black/10"
          onClick={() => setNavOverlayOpen(false)}
        />

        <div
          className={`absolute left-0 top-0 h-full w-[22%] min-w-[240px]
          bg-gradient-to-b from-[#400087] to-[#e0daff] text-white transition-transform duration-700
          ${navOverlayOpen ? "translate-y-0" : "translate-y-full"}`}
        >
          <div className="flex flex-col h-full p-10">
            <div className="text-2xl font-bold">Aditya Enterprises</div>
            <div className="mt-auto space-y-3 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <span>★★★★★</span>
                <span className="text-xs">Gold verified, 40 reviews</span>
              </div>
              <p>Awesome design for awesome businesses</p>
            </div>
          </div>
        </div>

        <div
          className={`absolute right-0 top-0 h-full w-[78%]
          bg-gradient-to-b from-[#400087] to-[#e0daff] text-white transition-transform duration-700
          ${navOverlayOpen ? "translate-y-0" : "-translate-y-full"}`}
        >
          <div className="flex flex-col h-full px-20 py-10">
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-80">Navigation</span>

              <div className="flex items-center gap-4">
                <Link
                  to="/Contact"
                  onClick={() => setNavOverlayOpen(false)}
                  className="rounded-full bg-white px-6 py-3 text-sm text-black font-medium hover:opacity-90 transition"
                >
                  + Become a Client
                </Link>

                <button
                  onClick={() => setNavOverlayOpen(false)}
                  className="h-10 w-10 rounded-full bg-white/20 text-lg flex items-center justify-center hover:bg-white/30 transition"
                  aria-label="Close navigation"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-8">
              {sideNavItems.map((item, index) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item);
                    setNavOverlayOpen(false);
                  }}
                  className="group flex items-baseline gap-6"
                >
                  <span className="text-[90px] font-light leading-none group-hover:translate-x-3 transition-transform drop-shadow-md">
                    {item.label}
                  </span>
                  <span className="text-sm opacity-80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </a>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm opacity-90">
              <div>
                <p className="font-medium">Instagram</p>
                <p className="underline hover:opacity-80 transition cursor-pointer">adityaenterprises_</p>
              </div>
              <div className="text-right">
                <p className="underline hover:opacity-80 transition cursor-pointer">Privacy Policy & Cookies</p>
                <p>© AETechno Services 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
