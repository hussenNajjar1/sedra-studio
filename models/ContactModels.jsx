import mongoose from "mongoose";

const { Schema } = mongoose;

const ContactSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

const ContactModel = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default ContactModel;
