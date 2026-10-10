const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    technologyStack: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["planning", "in-progress", "completed"],
      default: "planning",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);