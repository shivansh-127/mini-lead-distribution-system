import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { allocateProviders } from "@/utils/allocateProviders";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      phone,
      city,
      serviceType,
      description,
    } = body;

    // Allocate providers
    const providers =
      await allocateProviders(serviceType);

    // Create lead
    const lead = await Lead.create({
      name,
      phone,
      city,
      serviceType,
      description,
      assignedProviders: providers.map(
        (p) => p._id
      ),
    });

    return NextResponse.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.log(error);

    // Duplicate handling
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Duplicate lead for same service",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}