"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [providers, setProviders] = useState([]);

  const fetchProviders = async () => {
    try {
      const res = await fetch("/api/providers");

      const data = await res.json();

      if (data.success) {
        setProviders(data.providers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProviders();

    const interval = setInterval(() => {
      fetchProviders();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Provider Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {providers.map((provider) => (
          <div
            key={provider._id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <h2 className="text-xl font-bold text-black mb-2">
              {provider.name}
            </h2>

            <p className="text-black">
              Remaining Quota:{" "}
              {provider.remainingQuota}
            </p>

            <p className="text-black mb-3">
              Leads Received:{" "}
              {provider.leadsReceived}
            </p>

            <div>
              <h3 className="font-semibold text-black mb-2">
                Assigned Leads
              </h3>

              {provider.leads.length === 0 ? (
                <p className="text-gray-500">
                  No leads assigned
                </p>
              ) : (
                <div className="space-y-2">
                  {provider.leads.map((lead) => (
                    <div
                      key={lead._id}
                      className="border p-2 rounded"
                    >
                      <p className="text-black">
                        {lead.name}
                      </p>

                      <p className="text-black text-sm">
                        {lead.phone}
                      </p>

                      <p className="text-black text-sm">
                        {lead.serviceType}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}