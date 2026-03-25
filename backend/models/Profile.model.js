import mongoose, {Schema} from "mongoose";

const profileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  summary: String,

  skills: [String],

  projects: [
    {
      title: String,
      description: String,
      techStack: [String]
    }
  ],

  experience: [
    {
      role: String,
      company: String,
      duration: String,
      description: String
    }
  ]
});

module.exports = mongoose.model("Profile", profileSchema);
