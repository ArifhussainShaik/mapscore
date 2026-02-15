import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      private: true,
    },
    image: {
      type: String,
    },
    // Dodo Payments
    dodoCustomerId: {
      type: String,
    },
    dodoSubscriptionId: {
      type: String,
    },
    // Plan management
    plan: {
      type: String,
      enum: ["free", "pro", "agency"],
      default: "free",
    },
    subscriptionStatus: {
      type: String,
      enum: ["active", "cancelled", "past_due", "none"],
      default: "none",
    },
    // Access control (kept for ShipFast compatibility)
    hasAccess: {
      type: Boolean,
      default: false,
    },
    // Free tier audits tracking
    auditsThisMonth: {
      type: Number,
      default: 0,
    },
    auditsResetDate: {
      type: Date,
    },
    // Agency white-label
    agencyName: {
      type: String,
      trim: true,
    },
    agencyLogoUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

userSchema.plugin(toJSON);

export default mongoose.models.User || mongoose.model("User", userSchema);
