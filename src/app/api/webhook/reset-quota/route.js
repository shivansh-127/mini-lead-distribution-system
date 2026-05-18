import { connectDB } from "@/lib/mongodb";
import Provider from "@/models/Provider";
import WebhookLog from "@/models/WebhookLog";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { webhookId } = body;

    // Idempotency check
    const alreadyProcessed =
      await WebhookLog.findOne({
        webhookId,
      });

    if (alreadyProcessed) {
      return NextResponse.json({
        success: true,
        message:
          "Webhook already processed",
      });
    }

    // Reset quotas
    await Provider.updateMany(
      {},
      {
        usedQuota: 0,
      }
    );

    // Save webhook log
    await WebhookLog.create({
      webhookId,
      processed: true,
    });

    return NextResponse.json({
      success: true,
      message: "Quota reset successful",
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