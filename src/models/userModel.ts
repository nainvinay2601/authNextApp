import mongoose, { Model, Document } from "mongoose";

// 1. Define TypeScript interface for the User document
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

// 2. Create the schema with proper validation
const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters"],
    maxlength: [30, "Username cannot exceed 30 characters"]
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"]
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false // Never return password in queries
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  forgotPasswordToken: {
    type: String,
    select: false
  },
  forgotPasswordTokenExpiry: {
    type: Date,
    select: false
  },
  verifyToken: {
    type: String,
    select: false
  },
  verifyTokenExpiry: {
    type: Date,
    select: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// 3. Prevent model overwrite error
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;