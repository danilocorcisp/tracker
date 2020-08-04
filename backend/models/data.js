const { Schema } = require("mongoose");

const dataSchema = new Schema(
    {
        username: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: Number, required: true },
        date: { type: Date, required: true },
    },
    {
        timestamps: true,
    }
);

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;