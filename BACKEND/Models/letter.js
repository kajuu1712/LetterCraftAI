import mongoose from "mongoose";

const letterSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    type: {
      type: String,
      enum: ["cover_letter", "cold_email", "internship_request", "thank_you_email", "resignation_letter", "salary_negotiation", "follow_up_email", "offer_acceptance"],
      required: true
    },

    tone: {
      type: String,
      enum: ["formal", "friendly", "confident"],
      required: true
    },

    input: {
      type: Object,
      required: true
    },

    output: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Letter = mongoose.model("Letter", letterSchema);

export default Letter;