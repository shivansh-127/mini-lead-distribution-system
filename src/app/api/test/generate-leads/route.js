import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { allocateProviders } from "@/utils/allocateProviders";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await connectDB();

    const services = [
      "Service 1",
      "Service 2",
      "Service 3",
    ];

    const promises = [];

    for (let i = 0; i < 10; i++) {
      const serviceType =
        services[i % 3];

      promises.push(
        (async () => {
          try {
            const providers =
              await allocateProviders(
                serviceType
              );

            return await Lead.create({
              name: `Test User ${i}`,
              phone: `900000000${i}`,
              city: "Test City",
              serviceType,
              description:
                "Concurrency Test",
              assignedProviders:
                providers.map(
                  (p) => p._id
                ),
            });
          } catch (error) {
            return {
              error: error.message,
            };
          }
        })()
      );
    }

    const results =
      await Promise.allSettled(
        promises
      );

    return NextResponse.json({
      success: true,
      message:
        "Lead generation completed",
      results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}