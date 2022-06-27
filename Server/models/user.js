const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  passwordHash: { type: String, minlength: 3 },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
    delete returnedObject.passwordHash;
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
