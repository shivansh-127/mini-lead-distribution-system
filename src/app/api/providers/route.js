import { connectDB } from "@/lib/mongodb";
import Provider from "@/models/Provider";
import Lead from "@/models/Lead";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const providers = await Provider.find();

    const data = await Promise.all(
      providers.map(async (provider) => {
        const leads = await Lead.find({
          assignedProviders: provider._id,
        });

        return {
          _id: provider._id,
          name: provider.name,
          monthlyQuota: provider.monthlyQuota,
          usedQuota: provider.usedQuota,
          remainingQuota:
            provider.monthlyQuota -
            provider.usedQuota,
          leadsReceived: leads.length,
          leads,
        };
      })
    );

    return NextResponse.json({
      success: true,
      providers: data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}