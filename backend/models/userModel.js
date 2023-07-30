import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requires: true,
    },
    email: {
      type: String,
      requires: true,
      unique: true,
    },
    password: {
      type: String,
      requires: true,
    },
    // make optional until when how what to do
    isAdmin: {
      type: Boolean,
      // required: true,
      default: false,
    },
    // make optional until when how what to do
    pic: {
      type: "String",
      // required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
