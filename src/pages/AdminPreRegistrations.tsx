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
    (r) => r.status === "new"
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
      item.status,
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
        return "border-blue-400/20 bg-blue-400/5 text-blue-300";

      case "converted":
        return "border-emerald-400/20 bg-emerald-400/5 text-emerald-300";

      case "closed":
        return "border-red-400/20 bg-red-400/5 text-red-300";

      default:
        return "border-[#c9a46c]/25 bg-[#c9a46c]/5 text-[#d8b77a]";
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
      <main className="min-h-screen bg-[#080606] text-white flex items-center justify-center">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#d1ad70]" />

          <p className="mt-5 text-xs uppercase tracking-[0.25em] text-white/30">
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
    <main className="min-h-screen bg-[#080606] text-white relative overflow-hidden">

      {/* Background glow */}

      <div className="pointer-events-none fixed inset-0">

        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#8f1d2c]/10 blur-[160px]" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#c9a46c]/5 blur-[140px]" />

      </div>

      <div className="relative z-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">

          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#c9a46c]/25 bg-[#c9a46c]/5">

                  <span className="text-sm text-[#d8b77a]">
                    AE
                  </span>

                </div>

                <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a46c]">
                  Aditya (Techno Services)
                </p>

              </div>

              <h1 className="mt-4 font-serif text-3xl md:text-4xl">
                Pre-Registration
              </h1>

              <p className="mt-2 text-sm text-white/30">
                Demand & customer interest dashboard
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              {/* EXPORT */}

              <button
                onClick={exportCSV}
                className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-white/60 transition-all hover:border-[#c9a46c]/30 hover:text-[#d8b77a]"
              >
                ↓ Export CSV
              </button>

              {/* REFRESH */}

              <button
                onClick={fetchRegistrations}
                disabled={refreshing}
                className="rounded-full border border-[#c9a46c]/40 bg-[#c9a46c]/5 px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-[#d8b77a] transition-all hover:bg-[#c9a46c] hover:text-black disabled:opacity-50"
              >
                {refreshing ? "Refreshing..." : "↻ Refresh"}
              </button>

            </div>

          </div>

        </header>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">

          {/* ERROR */}

          {errorMessage && (
            <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-4">

              <p className="text-sm text-red-300">
                {errorMessage}
              </p>

            </div>
          )}

          {/* ===================================================
              STATS
          =================================================== */}

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">

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

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-4">

            <div className="grid gap-3 md:grid-cols-[1fr_200px_180px_auto]">

              {/* SEARCH */}

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25">
                  ⌕
                </span>

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search customer, email, mobile, city..."
                  className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-[#c9a46c]/50"
                />

              </div>

              {/* PRODUCT */}

              <select
                value={productFilter}
                onChange={(e) =>
                  setProductFilter(e.target.value)
                }
                className="rounded-xl border border-white/10 bg-[#120b0c] px-4 py-3.5 text-sm text-white outline-none focus:border-[#c9a46c]/50"
              >

                <option value="All">
                  All Products
                </option>

                <option value="Analog Watches">
                  Analog Watches
                </option>

                <option value="Smart Watches">
                  Smart Watches
                </option>

                <option value="Smart Bands">
                  Smart Bands
                </option>

                <option value="Smart Rings">
                  Smart Rings
                </option>

              </select>

              {/* STATUS */}

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="rounded-xl border border-white/10 bg-[#120b0c] px-4 py-3.5 text-sm text-white outline-none focus:border-[#c9a46c]/50"
              >

                <option value="All">
                  All Status
                </option>

                <option value="new">
                  New
                </option>

                <option value="contacted">
                  Contacted
                </option>

                <option value="converted">
                  Converted
                </option>

                <option value="closed">
                  Closed
                </option>

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
                  className="rounded-xl border border-white/10 px-5 py-3 text-xs text-white/40 transition hover:border-white/20 hover:text-white"
                >
                  Clear
                </button>
              )}

            </div>

            <div className="mt-3 flex items-center justify-between px-1">

              <p className="text-[10px] uppercase tracking-[0.15em] text-white/20">
                Showing {filteredRegistrations.length} of{" "}
                {registrations.length} registrations
              </p>

            </div>

          </div>

          {/* ===================================================
              DESKTOP TABLE
          =================================================== */}

          <div className="mt-5 hidden overflow-hidden rounded-2xl border border-white/10 bg-white/[0.015] lg:block">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1100px] text-left">

                <thead className="border-b border-white/10 bg-white/[0.025]">

                  <tr>

                    <th className="px-5 py-4 text-[10px] uppercase tracking-[0.18em] text-white/30">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-[10px] uppercase tracking-[0.18em] text-white/30">
                      Contact
                    </th>

                    <th className="px-5 py-4 text-[10px] uppercase tracking-[0.18em] text-white/30">
                      Product
                    </th>

                    <th className="px-5 py-4 text-[10px] uppercase tracking-[0.18em] text-white/30">
                      Budget
                    </th>

                    <th className="px-5 py-4 text-[10px] uppercase tracking-[0.18em] text-white/30">
                      Location
                    </th>

                    <th className="px-5 py-4 text-[10px] uppercase tracking-[0.18em] text-white/30">
                      Status
                    </th>

                    <th className="px-5 py-4 text-[10px] uppercase tracking-[0.18em] text-white/30">
                      Registered
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredRegistrations.length === 0 ? (

                    <tr>

                      <td
                        colSpan={7}
                        className="px-5 py-20 text-center"
                      >

                        <div className="text-3xl opacity-30">
                          ◌
                        </div>

                        <p className="mt-4 text-sm text-white/40">
                          No registrations found
                        </p>

                        <p className="mt-1 text-xs text-white/20">
                          Try changing your filters.
                        </p>

                      </td>

                    </tr>

                  ) : (

                    filteredRegistrations.map(
                      (registration) => (

                        <tr
                          key={registration.id}
                          onClick={() =>
                            setSelectedRegistration(
                              registration
                            )
                          }
                          className="cursor-pointer border-t border-white/5 transition-colors hover:bg-white/[0.025]"
                        >

                          {/* CUSTOMER */}

                          <td className="px-5 py-5">

                            <p className="text-sm font-medium">
                              {registration.full_name}
                            </p>

                            <p className="mt-1 text-[10px] text-white/20">
                              #{registration.id.slice(0, 8)}
                            </p>

                          </td>

                          {/* CONTACT */}

                          <td className="px-5 py-5">

                            <p className="text-xs text-white/70">
                              {registration.email}
                            </p>

                            <p className="mt-1 text-xs text-white/35">
                              {registration.mobile}
                            </p>

                          </td>

                          {/* PRODUCT */}

                          <td className="px-5 py-5">

                            <span className="inline-flex rounded-full border border-[#c9a46c]/25 bg-[#c9a46c]/5 px-3 py-1.5 text-[10px] text-[#d8b77a]">
                              {registration.product}
                            </span>

                          </td>

                          {/* BUDGET */}

                          <td className="px-5 py-5 text-xs text-white/50">
                            {registration.budget || "—"}
                          </td>

                          {/* LOCATION */}

                          <td className="px-5 py-5">

                            <p className="text-xs text-white/60">
                              {registration.city || "—"}
                            </p>

                            <p className="mt-1 text-[10px] text-white/25">
                              {registration.state || ""}
                              {registration.pincode
                                ? ` · ${registration.pincode}`
                                : ""}
                            </p>

                          </td>

                          {/* STATUS */}

                          <td className="px-5 py-5">

                            <span
                              className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] capitalize ${getStatusStyle(
                                registration.status
                              )}`}
                            >
                              {registration.status ||
                                "new"}
                            </span>

                          </td>

                          {/* DATE */}

                          <td className="px-5 py-5">

                            <p className="text-xs text-white/50">
                              {formatDate(
                                registration.created_at
                              )}
                            </p>

                            <p className="mt-1 text-[10px] text-white/20">
                              {formatTime(
                                registration.created_at
                              )}
                            </p>

                          </td>

                        </tr>

                      )
                    )

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* ===================================================
              MOBILE CARDS
          =================================================== */}

          <div className="mt-5 space-y-3 lg:hidden">

            {filteredRegistrations.length === 0 ? (

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-16 text-center">

                <p className="text-sm text-white/40">
                  No registrations found
                </p>

              </div>

            ) : (

              filteredRegistrations.map(
                (registration) => (

                  <button
                    key={registration.id}
                    onClick={() =>
                      setSelectedRegistration(
                        registration
                      )
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-left transition hover:border-[#c9a46c]/20"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <p className="font-medium">
                          {registration.full_name}
                        </p>

                        <p className="mt-1 text-xs text-white/30">
                          {registration.email}
                        </p>

                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 text-[9px] capitalize ${getStatusStyle(
                          registration.status
                        )}`}
                      >
                        {registration.status ||
                          "new"}
                      </span>

                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/5 pt-4">

                      <div>

                        <p className="text-[9px] uppercase tracking-wider text-white/20">
                          Product
                        </p>

                        <p className="mt-1 text-xs text-[#d8b77a]">
                          {registration.product}
                        </p>

                      </div>

                      <div>

                        <p className="text-[9px] uppercase tracking-wider text-white/20">
                          Budget
                        </p>

                        <p className="mt-1 text-xs text-white/50">
                          {registration.budget ||
                            "—"}
                        </p>

                      </div>

                      <div>

                        <p className="text-[9px] uppercase tracking-wider text-white/20">
                          Location
                        </p>

                        <p className="mt-1 text-xs text-white/50">
                          {registration.city ||
                            "—"}
                        </p>

                      </div>

                      <div>

                        <p className="text-[9px] uppercase tracking-wider text-white/20">
                          Registered
                        </p>

                        <p className="mt-1 text-xs text-white/50">
                          {formatDate(
                            registration.created_at
                          )}
                        </p>

                      </div>

                    </div>

                  </button>

                )
              )

            )}

          </div>

        </div>

      </div>

      {/* =======================================================
          CUSTOMER DETAIL MODAL
      ======================================================= */}

      {selectedRegistration && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 py-8 backdrop-blur-md"
          onClick={() =>
            setSelectedRegistration(null)
          }
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#100b0c] shadow-2xl"
          >

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between border-b border-white/10 p-6 md:p-8">

              <div>

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a46c]">
                  Customer Details
                </p>

                <h2 className="mt-3 font-serif text-3xl">
                  {selectedRegistration.full_name}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedRegistration(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition hover:border-white/20 hover:text-white"
              >
                ×
              </button>

            </div>

            {/* MODAL BODY */}

            <div className="p-6 md:p-8">

              {/* PRODUCT */}

              <div className="rounded-2xl border border-[#c9a46c]/20 bg-[#c9a46c]/5 p-5">

                <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                  Product Interest
                </p>

                <p className="mt-2 text-lg text-[#d8b77a]">
                  {selectedRegistration.product}
                </p>

              </div>

              {/* DETAILS */}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <Detail
                  label="Email"
                  value={
                    selectedRegistration.email
                  }
                />

                <Detail
                  label="Mobile"
                  value={
                    selectedRegistration.mobile
                  }
                />

                <Detail
                  label="Budget"
                  value={
                    selectedRegistration.budget ||
                    "Not specified"
                  }
                />

                <Detail
                  label="City"
                  value={
                    selectedRegistration.city ||
                    "Not specified"
                  }
                />

                <Detail
                  label="State"
                  value={
                    selectedRegistration.state ||
                    "Not specified"
                  }
                />

                <Detail
                  label="PIN Code"
                  value={
                    selectedRegistration.pincode ||
                    "Not specified"
                  }
                />

                <Detail
                  label="Updates"
                  value={
                    selectedRegistration.updates
                      ? "Subscribed"
                      : "Not subscribed"
                  }
                />

                <Detail
                  label="Status"
                  value={
                    selectedRegistration.status ||
                    "new"
                  }
                />

              </div>

              {/* REGISTERED */}

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">

                <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                  Registration Date
                </p>

                <p className="mt-2 text-sm text-white/60">
                  {new Date(
                    selectedRegistration.created_at
                  ).toLocaleString("en-IN", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </p>

              </div>

              {/* ACTIONS */}

              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                <a
                  href={`tel:${selectedRegistration.mobile}`}
                  className="flex items-center justify-center rounded-xl border border-white/10 py-4 text-xs uppercase tracking-[0.15em] text-white/60 transition hover:border-[#c9a46c]/30 hover:text-[#d8b77a]"
                >
                  Call Customer
                </a>

                <a
                  href={`mailto:${selectedRegistration.email}`}
                  className="flex items-center justify-center rounded-xl bg-[#d1ad70] py-4 text-xs font-semibold uppercase tracking-[0.15em] text-black transition hover:bg-[#e5c88f]"
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
      className={`rounded-2xl border p-5 ${
        accent
          ? "border-[#c9a46c]/25 bg-[#c9a46c]/5"
          : "border-white/10 bg-white/[0.025]"
      }`}
    >

      <p className="text-[9px] uppercase tracking-[0.18em] text-white/30">
        {label}
      </p>

      <p
        className={`mt-3 font-serif text-3xl ${
          accent
            ? "text-[#d8b77a]"
            : "text-white/80"
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
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">

      <p className="text-[9px] uppercase tracking-[0.15em] text-white/25">
        {label}
      </p>

      <p className="mt-2 break-words text-sm text-white/65">
        {value}
      </p>

    </div>
  );
};

export default AdminPreRegistrations;
