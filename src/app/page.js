import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-black mb-4">
          Mini Lead Distribution System
        </h1>

        <p className="text-gray-600 mb-8">
          A full stack lead distribution platform with fair provider allocation,
          real-time dashboard updates, webhook idempotency, and concurrency testing.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/request-service"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Request Service
          </Link>

          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Dashboard
          </Link>

          <Link
            href="/test-tools"
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Test Tools
          </Link>
        </div>
      </div>
    </main>
  );
}