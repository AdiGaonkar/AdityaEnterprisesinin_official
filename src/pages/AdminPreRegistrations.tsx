import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClients";
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

  const [registrations, setRegistrations] =
    useState<Registration[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const fetchRegistrations = async () => {

    setLoading(true);

    const { data, error } = await supabase
      .from("pre_registrations")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setRegistrations(data || []);

    setLoading(false);
  };


  useEffect(() => {
    fetchRegistrations();
  }, []);


  const filteredRegistrations = registrations.filter((item) => {

    const query = search.toLowerCase();

    return (
      item.full_name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.mobile.includes(query) ||
      item.product.toLowerCase().includes(query) ||
      (item.city || "").toLowerCase().includes(query)
    );

  });


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


  return (
    <main className="min-h-screen bg-[#090707] text-white">

      {/* HEADER */}

      <header className="border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

          <div>

            <p className="text-xs tracking-[0.35em] uppercase text-[#c9a46c]">
              Aditya (Techno Services)
            </p>

            <h1 className="mt-2 font-serif text-3xl">
              Pre-Registration Dashboard
            </h1>

          </div>

          <button
            onClick={fetchRegistrations}
            className="rounded-full border border-[#c9a46c]/40 px-5 py-3 text-xs tracking-[0.15em] uppercase text-[#d8b77a] hover:bg-[#c9a46c] hover:text-black transition-all"
          >
            Refresh
          </button>

        </div>

      </header>


      <div className="max-w-7xl mx-auto px-6 py-10">


        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">

          <Stat
            label="Total"
            value={total}
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


        {/* SEARCH */}

        <div className="mb-6">

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, mobile, product or city..."
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none focus:border-[#c9a46c]/50"
          />

        </div>


        {/* TABLE */}

        <div className="overflow-x-auto rounded-2xl border border-white/10">

          <table className="w-full min-w-[1100px] text-left">

            <thead className="bg-white/[0.04]">

              <tr>

                <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/40">
                  Customer
                </th>

                <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/40">
                  Contact
                </th>

                <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/40">
                  Product
                </th>

                <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/40">
                  Budget
                </th>

                <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/40">
                  Location
                </th>

                <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/40">
                  Date
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-white/40"
                  >
                    Loading registrations...
                  </td>

                </tr>

              ) : filteredRegistrations.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-white/40"
                  >
                    No registrations found.
                  </td>

                </tr>

              ) : (

                filteredRegistrations.map((registration) => (

                  <tr
                    key={registration.id}
                    className="border-t border-white/5 hover:bg-white/[0.025]"
                  >

                    <td className="px-5 py-5">

                      <p className="font-medium">
                        {registration.full_name}
                      </p>

                      <p className="mt-1 text-xs text-white/30">
                        ID: {registration.id.slice(0, 8)}
                      </p>

                    </td>


                    <td className="px-5 py-5">

                      <p className="text-sm">
                        {registration.email}
                      </p>

                      <p className="mt-1 text-xs text-white/40">
                        {registration.mobile}
                      </p>

                    </td>


                    <td className="px-5 py-5">

                      <span className="rounded-full border border-[#c9a46c]/30 bg-[#c9a46c]/5 px-3 py-1 text-xs text-[#d8b77a]">
                        {registration.product}
                      </span>

                    </td>


                    <td className="px-5 py-5 text-sm text-white/60">
                      {registration.budget || "—"}
                    </td>


                    <td className="px-5 py-5">

                      <p className="text-sm">
                        {registration.city || "—"}
                      </p>

                      <p className="text-xs text-white/35">
                        {registration.state || ""}
                        {registration.pincode
                          ? ` - ${registration.pincode}`
                          : ""}
                      </p>

                    </td>


                    <td className="px-5 py-5 text-xs text-white/40">
                      {new Date(
                        registration.created_at
                      ).toLocaleString("en-IN")}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
};


const Stat = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => {

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">

      <p className="text-xs uppercase tracking-wider text-white/35">
        {label}
      </p>

      <p className="mt-3 font-serif text-3xl text-[#d8b77a]">
        {value}
      </p>

    </div>
  );
};


export default AdminPreRegistrations;
