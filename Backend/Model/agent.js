const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String
  }
}, { timestamps: true });

const Agent = mongoose.model("Agent", agentSchema); 

module.exports = Agent;