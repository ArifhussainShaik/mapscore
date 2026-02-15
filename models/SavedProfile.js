import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const savedProfileSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        auditId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Audit",
        },
        businessName: { type: String, required: true },
        googlePlaceId: { type: String },
        alertEnabled: { type: Boolean, default: true },
        lastAlertSent: { type: Date },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

savedProfileSchema.plugin(toJSON);

export default mongoose.models.SavedProfile ||
    mongoose.model("SavedProfile", savedProfileSchema);
