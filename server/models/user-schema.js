import mongoose, { version } from 'mongoose';
const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [1, 'First name should have at least 1 character'],
      maxlength: [20, 'First name should not exceed 20 characters'],
    },
    lastName: {
      type: String,
      trim: true,
      minlength: [1, 'Last name should have at least 1 character'],
      maxlength: [30, 'Last name should not exceed 20 characters'],
    },

    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          // Regular expression for email validation
          const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
          return emailRegex.test(value);
        },
        message: 'Please enter a valid email address',
      },
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password should have at least 8 characters'],
      maxlength: [20, 'Password should not exceed 20 characters'],
    },

    MobileNumber: {
      type: String,
      unique: true,
      required: [true, 'Mobile number is required'],
      minlength: [10, 'Mobile number should have 10 digits'],
      maxlength: [10, 'Mobile number should have 10 digits'],
    },

    Cart: [
      {
        id: String,
        Title: String,
        Price: Number,
        Stock: Number,
        Category: String,
        quantity: Number,
      },
    ],
  },
  { versionKey: false }
);

const Customer = mongoose.model('user', customerSchema);

export default Customer;
