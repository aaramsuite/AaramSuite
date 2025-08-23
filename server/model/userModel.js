const mongoose = require("mongoose");
const getNextSequence = require("../utils/getNextSequence");

const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },  // Numeric ID
  name: { type: String, required: true },
  password: { type: String, required: true },
  number: { type: String, required: true },
  age: { type: Number, required: true }
}, { collection: "users" });

// Pre-save hook to generate numeric ID
userSchema.pre("save", async function (next) {
  if (!this.userId) {
    this.userId = await getNextSequence("userId");
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
