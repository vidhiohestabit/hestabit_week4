import mongoose from "mongoose";
import bcrypt from "bcrypt";

const AccountSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


//  Virtual Field 
AccountSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});


//  Pre-save Hook (password hashing)
AccountSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});


//  Compound Index 
AccountSchema.index({ status: 1, createdAt: -1 });


//  Sparse Index example
AccountSchema.index({ email: 1 }, { sparse: true });


export default mongoose.model("Account", AccountSchema);