import mongoose from "mongoose";

const WebhookLogSchema = new mongoose.Schema(
  {
    webhookId: {
      type: String,
      unique: true,
    },

    processed: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.WebhookLog ||
  mongoose.model("WebhookLog", WebhookLogSchema);