import mongoose from "mongoose";

const { Schema } = mongoose;

const VisitorSchema = new Schema({
    count: { type: Number, default: 0 },

}
    , {
        timestamps: true
    }
);

const Visitor = mongoose.models.Visitor || mongoose.model("Visitor", VisitorSchema);
export default Visitor;





