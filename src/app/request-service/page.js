"use client";

import { useState } from "react";

export default function RequestServicePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    serviceType: "Service 1",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("Submitting...");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Lead submitted successfully");

        setFormData({
          name: "",
          phone: "",
          city: "",
          serviceType: "Service 1",
          description: "",
        });
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Request Service
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded text-black"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded text-black"
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded text-black"
          required
        />

        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded text-black"
        >
          <option>Service 1</option>
          <option>Service 2</option>
          <option>Service 3</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded text-black"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Submit
        </button>

        {message && (
          <p className="mt-4 text-center">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}