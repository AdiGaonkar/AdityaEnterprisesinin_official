import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabaseClient";

interface Registration {
  id: string;
  full_name: string;
  email: string;
  mobile: string;
  product: string;
  budget: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  updates: boolean;
  status: string;
  created_at: string;
}

const AdminPreRegistrations = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [productFilter, setProductFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);

  const [errorMessage, setErrorMessage] = useState("");

  /* =========================================================
     FETCH REGISTRATIONS
  ========================================================= */

  const fetchRegistrations = async () => {
    setErrorMessage("");

    if (registrations.length === 0) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    const { data, error } = await supabase
      .from("pre_registrations")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("SUPABASE ERROR:", error);

      setErrorMessage(
        "Unable to load registrations. Please check your admin access and Supabase RLS policies."
      );

      setLoading(false);
      setRefreshing(false);
      return;
    }

    setRegistrations(data || []);

    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  /* =========================================================
     FILTERED REGISTRATIONS
  ========================================================= */

  const filteredRegistrations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return registrations.filter((item) => {
      const matchesSearch =
        !query ||
        item.full_name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.mobile.toLowerCase().includes(query) ||
        item.product.toLowerCase().includes(query) ||
        (item.city || "").toLowerCase().includes(query) ||
        (item.state || "").toLowerCase().includes(query);

      const matchesProduct =
        productFilter === "All" ||
        item.product === productFilter;

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesProduct &&
        matchesStatus
      );
    });
  }, [
    registrations,
    search,
    productFilter,
    statusFilter,
  ]);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const total = registrations.length;

  const analog = registrations.filter(
    (r) => r.product === "Analog Watches"
  ).length;

  const smartWatch = registrations.filter(
    (r) => r.product === "Smart Watches"
  ).length;

  const smartBand = registrations.filter(
    (r) => r.product === "Smart Bands"
  ).length;

  const smartRing = registrations.filter(
    (r) => r.product === "Smart Rings"
  ).length;

  const newRegistrations = registrations.filter(
    (r) => r.status === "new" || !r.status
  ).length;

  /* =========================================================
     CSV EXPORT
  ========================================================= */

  const exportCSV = () => {
    if (filteredRegistrations.length === 0) {
      alert("There are no registrations to export.");
      return;
    }

    const headers = [
      "Name",
      "Email",
      "Mobile",
      "Product",
      "Budget",
      "City",
      "State",
      "PIN Code",
      "Updates",
      "Status",
      "Registered At",
    ];

    const rows = filteredRegistrations.map((item) => [
      item.full_name,
      item.email,
      item.mobile,
      item.product,
      item.budget || "",
      item.city || "",
      item.state || "",
      item.pincode || "",
      item.updates ? "Yes" : "No",
      item.status || "new",
      new Date(item.created_at).toLocaleString("en-IN"),
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `pre-registrations-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =========================================================
     STATUS HELPER
  ========================================================= */

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "contacted":
        return "border-blue-400/30 bg-blue-400/10 text-blue-300";

      case "converted":
        return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";

      case "closed":
        return "border-red-400/30 bg-red-400/10 text-red-300";

      case "new":
      default:
        return "border-[#7834c8]/40 bg-[#7834c8]/15 text-purple-300";
    }
  };

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* =========================================================
     LOADING SCREEN
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-[#7834c8]" />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-white/50">
            Loading Dashboard
          </p>
        </div>
      </main>
    );
  }

  /* =========================================================
     DASHBOARD
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden selection:bg-[#7834c8]/40 selection:text-white">
      {/* Background glow & Grid */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#7834c8]/15 blur-[180px]" />
        <div className="absolute bottom-0 right-[5%] h-[400px] w-[400px] rounded-full bg-[#7834c8]/10 blur-[150px]" />
        
        {/* Premium Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <header className="border-b border-white/10 bg-black/40 backdrop-blur-2xl sticky top-0 z-40">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-white to-white/80 text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  <span className="text-[11px] font-extrabold tracking-wider">
                    AE
                  </span>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-purple-400">
                  Aditya (Techno Services)
                </p>
              </div>
              <h1 className="mt-5 font-stacksansnotch text-3xl font-bold tracking-tight text-white md:text-4xl">
                Pre-Registration
              </h1>
              <p className="mt-2 text-sm text-white/50 font-medium">
                Demand & customer interest dashboard
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* EXPORT */}
              <button
                onClick={exportCSV}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white/70 transition-all hover:bg-white/[0.06] hover:text-white"
              >
                ↓ Export CSV
              </button>

              {/* REFRESH */}
              <button
                onClick={fetchRegistrations}
                disabled={refreshing}
                className="relative rounded-xl bg-gradient-to-r from-[#7834c8] to-[#6127a3] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_5px_20px_rgba(120,52,200,.3)] transition-all hover:shadow-[0_10px_30px_rgba(120,52,200,.5)] disabled:opacity-70"
              >
                {refreshing ? "Refreshing..." : "↻ Refresh"}
              </button>
            </div>
          </div>
        </header>

        {/* =====================================================
            CONTENT
        ===================================================== */}
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
          {/* ERROR */}
          {errorMessage && (
            <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-5 backdrop-blur-md">
              <p className="text-sm font-bold text-red-400">
                {errorMessage}
              </p>
            </div>
          )}

          {/* ===================================================
              STATS
          =================================================== */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            <Stat
              label="Total"
              value={total}
              accent
            />
            <Stat
              label="New"
              value={newRegistrations}
            />
            <Stat
              label="Analog"
              value={analog}
            />
            <Stat
              label="Smart Watch"
              value={smartWatch}
            />
            <Stat
              label="Smart Band"
              value={smartBand}
            />
            <Stat
              label="Smart Ring"
              value={smartRing}
            />
          </div>

          {/* ===================================================
              FILTER BAR
          =================================================== */}
          <div className="mt-10 rounded-3xl border border-white/10 bg-[#0a0a0a]/80 p-5 shadow-xl backdrop-blur-2xl">
            <div className="grid gap-4 md:grid-cols-[1fr_200px_180px_auto]">
              {/* SEARCH */}
              <div className="relative">
                <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-white/40">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="M21 21l-4.35-4.35"></path>
                  </svg>
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search customer, email, mobile, city..."
                  className="w-full rounded-2xl border border-white/10 bg-black/50 py-4 pl-12 pr-5 text-sm text-white placeholder:text-white/40 outline-none transition-all focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.02] focus:ring-4 focus:ring-[#7834c8]/10"
                />
              </div>

              {/* PRODUCT */}
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-sm font-medium text-white outline-none transition-all focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.02] focus:ring-4 focus:ring-[#7834c8]/10 cursor-pointer"
              >
                <option value="All">All Products</option>
                <option value="Analog Watches">Analog Watches</option>
                <option value="Smart Watches">Smart Watches</option>
                <option value="Smart Bands">Smart Bands</option>
                <option value="Smart Rings">Smart Rings</option>
              </select>

              {/* STATUS */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-sm font-medium text-white outline-none transition-all focus:border-[#7834c8]/70 focus:bg-[#7834c8]/[0.02] focus:ring-4 focus:ring-[#7834c8]/10 cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>

              {/* CLEAR */}
              {(search ||
                productFilter !== "All" ||
                statusFilter !== "All") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setProductFilter("All");
                    setStatusFilter("All");
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-white/50 transition-all hover:bg-white/[0.05] hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between px-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                Showing {filteredRegistrations.length} of{" "}
                {registrations.length} registrations
              </p>
            </div>
          </div>

          {/* ===================================================
              DESKTOP TABLE
          =================================================== */}
          <div className="mt-6 hidden overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl lg:block shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left">
                <thead className="border-b border-white/10 bg-white/[0.02]">
                  <tr>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                      Customer
                    </th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                      Contact
                    </th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                      Product
                    </th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                      Budget
                    </th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                      Location
                    </th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                      Status
                    </th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                      Registered
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-24 text-center">
                        <div className="text-4xl opacity-20">◌</div>
                        <p className="mt-4 text-sm font-medium text-white/50">
                          No registrations found
                        </p>
                        <p className="mt-1 text-xs text-white/30">
                          Try changing your filters.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((registration) => (
                      <tr
                        key={registration.id}
                        onClick={() => setSelectedRegistration(registration)}
                        className="cursor-pointer bg-transparent transition-colors hover:bg-white/[0.04]"
                      >
                        {/* CUSTOMER */}
                        <td className="px-6 py-5">
                          <p className="text-sm font-bold text-white/90">
                            {registration.full_name}
                          </p>
                          <p className="mt-1 text-[10px] font-medium tracking-wider text-white/40">
                            #{registration.id.slice(0, 8)}
                          </p>
                        </td>

                        {/* CONTACT */}
                        <td className="px-6 py-5">
                          <p className="text-xs font-medium text-white/80">
                            {registration.email}
                          </p>
                          <p className="mt-1 text-xs text-white/50">
                            {registration.mobile}
                          </p>
                        </td>

                        {/* PRODUCT */}
                        <td className="px-6 py-5">
                          <span className="inline-flex rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-purple-300">
                            {registration.product}
                          </span>
                        </td>

                        {/* BUDGET */}
                        <td className="px-6 py-5 text-xs font-medium text-white/60">
                          {registration.budget || "—"}
                        </td>

                        {/* LOCATION */}
                        <td className="px-6 py-5">
                          <p className="text-xs font-medium text-white/80">
                            {registration.city || "—"}
                          </p>
                          <p className="mt-1 text-[10px] text-white/40">
                            {registration.state || ""}
                            {registration.pincode
                              ? ` · ${registration.pincode}`
                              : ""}
                          </p>
                        </td>

                        {/* STATUS */}
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] ${getStatusStyle(
                              registration.status || "new"
                            )}`}
                          >
                            {registration.status || "new"}
                          </span>
                        </td>

                        {/* DATE */}
                        <td className="px-6 py-5">
                          <p className="text-xs font-medium text-white/80">
                            {formatDate(registration.created_at)}
                          </p>
                          <p className="mt-1 text-[10px] text-white/40">
                            {formatTime(registration.created_at)}
                          </p>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ===================================================
              MOBILE CARDS
          =================================================== */}
          <div className="mt-6 space-y-4 lg:hidden">
            {filteredRegistrations.length === 0 ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] px-6 py-16 text-center backdrop-blur-md">
                <p className="text-sm font-medium text-white/50">
                  No registrations found
                </p>
              </div>
            ) : (
              filteredRegistrations.map((registration) => (
                <button
                  key={registration.id}
                  onClick={() => setSelectedRegistration(registration)}
                  className="w-full rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 text-left backdrop-blur-md transition-colors hover:border-[#7834c8]/40 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-white/90">
                        {registration.full_name}
                      </p>
                      <p className="mt-1 text-xs font-medium text-white/50">
                        {registration.email}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider ${getStatusStyle(
                        registration.status || "new"
                      )}`}
                    >
                      {registration.status || "new"}
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-5 border-t border-white/10 pt-5">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                        Product
                      </p>
                      <p className="mt-1.5 text-xs font-bold text-purple-300">
                        {registration.product}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                        Budget
                      </p>
                      <p className="mt-1.5 text-xs font-medium text-white/70">
                        {registration.budget || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                        Location
                      </p>
                      <p className="mt-1.5 text-xs font-medium text-white/70">
                        {registration.city || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                        Registered
                      </p>
                      <p className="mt-1.5 text-xs font-medium text-white/70">
                        {formatDate(registration.created_at)}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* =======================================================
          CUSTOMER DETAIL MODAL
      ======================================================= */}
      {selectedRegistration && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-5 py-8 backdrop-blur-xl"
          onClick={() => setSelectedRegistration(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
          >
            {/* Inner Glow */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#7834c8]/10 to-transparent pointer-events-none" />

            {/* MODAL HEADER */}
            <div className="relative flex items-start justify-between border-b border-white/10 p-7 md:p-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400">
                  Customer Details
                </p>
                <h2 className="mt-3 font-stacksansnotch text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {selectedRegistration.full_name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedRegistration(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="relative p-7 md:p-10">
              {/* PRODUCT */}
              <div className="rounded-[1.5rem] border border-[#7834c8]/30 bg-gradient-to-br from-[#7834c8]/10 to-transparent p-6 shadow-inner">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-300/70">
                  Product Interest
                </p>
                <p className="mt-2 text-xl font-bold text-white">
                  {selectedRegistration.product}
                </p>
              </div>

              {/* DETAILS */}
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Detail label="Email" value={selectedRegistration.email} />
                <Detail label="Mobile" value={selectedRegistration.mobile} />
                <Detail label="Budget" value={selectedRegistration.budget || "Not specified"} />
                <Detail label="City" value={selectedRegistration.city || "Not specified"} />
                <Detail label="State" value={selectedRegistration.state || "Not specified"} />
                <Detail label="PIN Code" value={selectedRegistration.pincode || "Not specified"} />
                <Detail
                  label="Updates"
                  value={selectedRegistration.updates ? "Subscribed" : "Not subscribed"}
                />
                <Detail label="Status" value={selectedRegistration.status || "new"} capitalize />
              </div>

              {/* REGISTERED */}
              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                  Registration Date
                </p>
                <p className="mt-2 text-sm font-medium text-white/80">
                  {new Date(selectedRegistration.created_at).toLocaleString("en-IN", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <a
                  href={`tel:${selectedRegistration.mobile}`}
                  className="flex items-center justify-center rounded-2xl border border-white/20 bg-transparent py-4.5 text-xs font-bold uppercase tracking-[0.15em] text-white/80 transition-all hover:bg-white/5 hover:text-white"
                >
                  Call Customer
                </a>
                <a
                  href={`mailto:${selectedRegistration.email}`}
                  className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#7834c8] to-[#6127a3] py-4.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_5px_20px_rgba(120,52,200,.3)] transition-all hover:shadow-[0_10px_30px_rgba(120,52,200,.5)]"
                >
                  Email Customer
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

/* =============================================================
   STAT COMPONENT
============================================================= */

const Stat = ({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) => {
  return (
    <div
      className={`rounded-[1.5rem] border p-6 transition-transform hover:-translate-y-1 ${
        accent
          ? "border-[#7834c8]/50 bg-gradient-to-br from-[#7834c8]/20 to-transparent shadow-[0_10px_30px_rgba(120,52,200,0.15)]"
          : "border-white/10 bg-[#0a0a0a]/60 backdrop-blur-md"
      }`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
        {label}
      </p>
      <p
        className={`mt-3 font-stacksansnotch text-4xl font-bold ${
          accent ? "text-white" : "text-white/90"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

/* =============================================================
   DETAIL COMPONENT
============================================================= */

const Detail = ({
  label,
  value,
  capitalize = false,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
        {label}
      </p>
      <p
        className={`mt-2.5 break-words text-sm font-medium text-white/80 ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
};

export default AdminPreRegistrations;
