// import mongoose,{Schema, Document} from "mongoose";
// import bcrypt from "bcrypt";

// interface EmployeeInterface extends Document{
//     firstName : String;
//     lastName: String;
//     email: String;
//     password: String;
//     isActive : Boolean;
//     refreshToken :String;
// }

// const employeeSchema = new mongoose.Schema<EmployeeInterface>({
//     firstName:{
//         type: String,
//         required: true,
//     },
//     lastName: {
//         type: String,
//         required: true,
//     },
//     email:{
//         type:String,
//         unique: true,
//         required: true
//     },
//     password:{
//         type: String,
//         required: true
//     },
//     isActive:{
//         type: Boolean,
//         default: false,
//         required: true
//     },
//     refreshToken:{
//         type: String
//     }
// },{timestamps: true});

// // employeeSchema.pre<EmployeeInterface>("save",  async function(next){
// //     if(!this.isModified("password")) return next();

// //     this.password = bcrypt.hash(this.password, 10);
// //     next();
// // })

// employeeSchema.pre<EmployeeInterface>("save", async function (next) {
//     if (!this.isModified("password")) {
//       return next();
//     }
  
//     try {
//       this.password = await bcrypt.hash(this.password, 10);
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });
  


// employeeSchema.method.isPasswordCorrect = async function (password){
//     return  await bcrypt.compare(password, this.password);
// }

// export const Employee = mongoose.model("Employee", employeeSchema);



import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

// Interface for the Employee document
interface EmployeeInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  refreshToken?: string;
  isPasswordCorrect(password: string): Promise<boolean>;
}

// Employee schema definition
const employeeSchema = new Schema<EmployeeInterface>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Pre-save middleware for password hashing
employeeSchema.pre<EmployeeInterface>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Await the hash function to ensure `this.password` gets a string
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next();
  }
});

// Method for verifying the password
employeeSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Employee model
export const Employee: Model<EmployeeInterface> = mongoose.model<EmployeeInterface>("Employee", employeeSchema);
