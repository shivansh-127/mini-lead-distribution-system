"use client";

import { useState } from "react";

export default function TestToolsPage() {
  const [message, setMessage] =
    useState("");

  const resetQuota = async () => {
    const webhookId =
      "payment-success-123";

    const res = await fetch(
      "/api/webhook/reset-quota",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          webhookId,
        }),
      }
    );

    const data = await res.json();

    setMessage(data.message);
  };

  const generateLeads =
    async () => {
      const res = await fetch(
        "/api/test/generate-leads",
        {
          method: "POST",
        }
      );

      const data = await res.json();

      setMessage(data.message);
    };
    const testIdempotency = async () => {
  const webhookId =
    "payment-success-999";

  const responses = [];

  for (let i = 0; i < 5; i++) {
    const res = await fetch(
      "/api/webhook/reset-quota",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          webhookId,
        }),
      }
    );

    const data = await res.json();

    responses.push(data.message);
  }

  setMessage(
    responses.join(" | ")
  );
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-black text-center">
          Test Tools
        </h1>

        <button
          onClick={resetQuota}
          className="w-full bg-black text-white p-3 rounded mb-4"
        >
          Reset Provider Quotas
        </button>

        <button
          onClick={generateLeads}
         className="w-full bg-black text-white p-3 rounded mb-4 block"
        >
          Generate 10 Leads
        </button>

        <button
  onClick={testIdempotency}
  className="w-full bg-black text-white p-3 rounded mt-4"
>
  Call Webhook Multiple Times
</button>

        {message && (
          <p className="mt-4 text-center text-black">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}