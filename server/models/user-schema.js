import mongoose, { version } from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      max: 20
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      max: 20
    },

    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      min: 8,
      max: 20
    },

    MobileNumber: {
      type: String,
      unique: true,
      required: true,
      min: 10,
      max: 10
    },

    Cart: [
      {
        id: String,
        Title: String,
        Price: Number,
        Stock: Number,
        Category: String,
      }
    ]
  },
  { versionKey: false }
);

const Customer = mongoose.model("user", customerSchema);

export default Customer;
