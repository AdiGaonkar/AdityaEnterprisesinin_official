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
        return "border-blue-200 bg-blue-50 text-blue-700";

      case "converted":
        return "border-emerald-200 bg-emerald-50 text-emerald-700";

      case "closed":
        return "border-red-200 bg-red-50 text-red-700";

      case "new":
      default:
        return "border-purple-200 bg-purple-50 text-purple-700";
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
      <main className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#7834c8]" />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
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
    <main className="min-h-screen bg-gray-50 text-gray-900 relative overflow-hidden selection:bg-purple-200 selection:text-purple-900">
      
      {/* Subtle Background Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 pb-20">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-[#7834c8]">
                  <span className="text-[11px] font-extrabold tracking-wider">
                    AE
                  </span>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">
                  Aditya (Techno Services)
                </p>
              </div>
              <h1 className="mt-4 font-stacksansnotch text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Pre-Registration
              </h1>
              <p className="mt-2 text-sm text-gray-500 font-medium">
                Demand & customer interest dashboard
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* EXPORT */}
              <button
                onClick={exportCSV}
                className="rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-gray-600 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
              >
                ↓ Export CSV
              </button>

              {/* REFRESH */}
              <button
                onClick={fetchRegistrations}
                disabled={refreshing}
                className="relative rounded-xl bg-[#7834c8] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-md transition-all hover:bg-[#6127a3] hover:shadow-lg disabled:opacity-70"
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
            <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-6 py-5">
              <p className="text-sm font-bold text-red-600">
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
          <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-[1fr_200px_180px_auto]">
              {/* SEARCH */}
              <div className="relative">
                <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="M21 21l-4.35-4.35"></path>
                  </svg>
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search customer, email, mobile, city..."
                  className="w-full rounded-2xl border border-gray-300 bg-white py-4 pl-12 pr-5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-[#7834c8] focus:ring-4 focus:ring-purple-100"
                />
              </div>

              {/* PRODUCT */}
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="rounded-2xl border border-gray-300 bg-white px-5 py-4 text-sm font-medium text-gray-700 outline-none transition-all focus:border-[#7834c8] focus:ring-4 focus:ring-purple-100 cursor-pointer"
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
                className="rounded-2xl border border-gray-300 bg-white px-5 py-4 text-sm font-medium text-gray-700 outline-none transition-all focus:border-[#7834c8] focus:ring-4 focus:ring-purple-100 cursor-pointer"
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
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-800"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between px-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Showing {filteredRegistrations.length} of{" "}
                {registrations.length} registrations
              </p>
            </div>
          </div>

          {/* ===================================================
              DESKTOP TABLE
          =================================================== */}
          <div className="mt-6 hidden overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                      Customer
                    </th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                      Contact
                    </th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                      Product
                    </th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                      Budget
                    </th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                      Location
                    </th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                      Registered
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-24 text-center bg-gray-50/50">
                        <div className="text-4xl text-gray-300">◌</div>
                        <p className="mt-4 text-sm font-medium text-gray-500">
                          No registrations found
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          Try changing your filters.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((registration) => (
                      <tr
                        key={registration.id}
                        onClick={() => setSelectedRegistration(registration)}
                        className="cursor-pointer bg-white transition-colors hover:bg-gray-50"
                      >
                        {/* CUSTOMER */}
                        <td className="px-6 py-5">
                          <p className="text-sm font-bold text-gray-900">
                            {registration.full_name}
                          </p>
                          <p className="mt-1 text-[10px] font-medium tracking-wider text-gray-400">
                            #{registration.id.slice(0, 8)}
                          </p>
                        </td>

                        {/* CONTACT */}
                        <td className="px-6 py-5">
                          <p className="text-xs font-medium text-gray-700">
                            {registration.email}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {registration.mobile}
                          </p>
                        </td>

                        {/* PRODUCT */}
                        <td className="px-6 py-5">
                          <span className="inline-flex rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-purple-700">
                            {registration.product}
                          </span>
                        </td>

                        {/* BUDGET */}
                        <td className="px-6 py-5 text-xs font-medium text-gray-500">
                          {registration.budget || "—"}
                        </td>

                        {/* LOCATION */}
                        <td className="px-6 py-5">
                          <p className="text-xs font-medium text-gray-700">
                            {registration.city || "—"}
                          </p>
                          <p className="mt-1 text-[10px] text-gray-400">
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
                          <p className="text-xs font-medium text-gray-700">
                            {formatDate(registration.created_at)}
                          </p>
                          <p className="mt-1 text-[10px] text-gray-400">
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
              <div className="rounded-[2rem] border border-gray-200 bg-white px-6 py-16 text-center">
                <p className="text-sm font-medium text-gray-500">
                  No registrations found
                </p>
              </div>
            ) : (
              filteredRegistrations.map((registration) => (
                <button
                  key={registration.id}
                  onClick={() => setSelectedRegistration(registration)}
                  className="w-full rounded-[2rem] border border-gray-200 bg-white p-6 text-left shadow-sm transition-colors hover:border-purple-300 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-gray-900">
                        {registration.full_name}
                      </p>
                      <p className="mt-1 text-xs font-medium text-gray-500">
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

                  <div className="mt-6 grid grid-cols-2 gap-5 border-t border-gray-100 pt-5">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                        Product
                      </p>
                      <p className="mt-1.5 text-xs font-bold text-purple-600">
                        {registration.product}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                        Budget
                      </p>
                      <p className="mt-1.5 text-xs font-medium text-gray-700">
                        {registration.budget || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                        Location
                      </p>
                      <p className="mt-1.5 text-xs font-medium text-gray-700">
                        {registration.city || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                        Registered
                      </p>
                      <p className="mt-1.5 text-xs font-medium text-gray-700">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-5 py-8 backdrop-blur-sm"
          onClick={() => setSelectedRegistration(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2.5rem] bg-white shadow-2xl"
          >
            {/* Inner Accents */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-purple-50 to-transparent pointer-events-none" />

            {/* MODAL HEADER */}
            <div className="relative flex items-start justify-between border-b border-gray-100 p-7 md:p-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-600">
                  Customer Details
                </p>
                <h2 className="mt-2 font-stacksansnotch text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                  {selectedRegistration.full_name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedRegistration(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all hover:bg-gray-200 hover:text-gray-800"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="relative p-7 md:p-10">
              {/* PRODUCT */}
              <div className="rounded-[1.5rem] border border-purple-100 bg-purple-50 p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-500">
                  Product Interest
                </p>
                <p className="mt-2 text-xl font-bold text-purple-900">
                  {selectedRegistration.product}
                </p>
              </div>

              {/* DETAILS */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
              <div className="mt-6 rounded-[1.5rem] border border-gray-200 bg-gray-50 p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
                  Registration Date
                </p>
                <p className="mt-2 text-sm font-medium text-gray-900">
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
                  className="flex items-center justify-center rounded-2xl border border-gray-300 bg-white py-4.5 text-xs font-bold uppercase tracking-[0.15em] text-gray-700 shadow-sm transition-all hover:bg-gray-50"
                >
                  Call Customer
                </a>
                <a
                  href={`mailto:${selectedRegistration.email}`}
                  className="flex items-center justify-center rounded-2xl bg-[#7834c8] py-4.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-md transition-all hover:bg-[#6127a3] hover:shadow-lg"
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
          ? "border-purple-200 bg-purple-50 shadow-sm"
          : "border-gray-200 bg-white shadow-sm"
      }`}
    >
      <p
        className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
          accent ? "text-purple-600" : "text-gray-500"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-3 font-stacksansnotch text-4xl font-bold ${
          accent ? "text-purple-900" : "text-gray-900"
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
    <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
        {label}
      </p>
      <p
        className={`mt-2 break-words text-sm font-medium text-gray-900 ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
};

export default AdminPreRegistrations;
