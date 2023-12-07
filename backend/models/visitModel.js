// models/visit.js
import { Schema, model } from "mongoose";

const visitSchema = new Schema({
  userId: {
    type: String, // Assuming userId is a string, adjust accordingly
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // You can include other fields relevant to your use case
  // For example, you might want to track the visited page, etc.
});

const Visit = model('Visit', visitSchema);

export default Visit;