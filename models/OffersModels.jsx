import mongoose from "mongoose";

const { Schema } = mongoose;

const OffersSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

const OffersModel = mongoose.models.Offers || mongoose.model("Offers", OffersSchema);

export default OffersModel;