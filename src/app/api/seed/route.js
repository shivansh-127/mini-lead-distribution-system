import { connectDB } from "@/lib/mongodb";
import Provider from "@/models/Provider";
import AllocationState from "@/models/AllocationState";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const existingProviders = await Provider.find();

    if (existingProviders.length === 0) {
      const providers = [];

      for (let i = 1; i <= 8; i++) {
        providers.push({
          name: `Provider ${i}`,
        });
      }

      await Provider.insertMany(providers);
    }

    const services = ["Service 1", "Service 2", "Service 3"];

    for (const service of services) {
      const exists = await AllocationState.findOne({
        serviceType: service,
      });

      if (!exists) {
        await AllocationState.create({
          serviceType: service,
          currentIndex: 0,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Seed data inserted",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}