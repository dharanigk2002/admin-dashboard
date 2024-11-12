import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: [true, "Email id already exists"],
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: [true, "Invalid mobile number"],
    },
    designation: {
      type: String,
      required: true,
      enum: ["HR", "Manager", "Sales"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["M", "F"],
    },
    course: {
      type: String,
      required: true,
      enum: ["MCA", "BCA", "BSc"],
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastEmployee = await mongoose
      .model("Employee")
      .findOne({}, {}, { sort: { id: -1 } });
    this.id = lastEmployee ? lastEmployee.id + 1 : 1;
  }
  next();
});

export const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
