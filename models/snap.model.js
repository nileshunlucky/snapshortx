import mongoose from "mongoose";

const SnapSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    category: { type: String, required: true },
}, { timestamps: true });

const Snap = mongoose.models.Snap || mongoose.model('Snap', SnapSchema);

export default Snap;