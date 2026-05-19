import { connectDB } from "@/lib/mongodb";
import Provider from "@/models/Provider";
import Lead from "@/models/Lead";
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

    // Reset provider quota
    await Provider.updateMany(
      {},
      {
        usedQuota: 0,
      }
    );

    // Delete leads
    await Lead.deleteMany({});

    // Optional:
    // clear old webhook logs
    await WebhookLog.deleteMany({});

    // Save current webhook
    await WebhookLog.create({
      webhookId,
      processed: true,
    });

    return NextResponse.json({
      success: true,
      message:
        "System reset successful",
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