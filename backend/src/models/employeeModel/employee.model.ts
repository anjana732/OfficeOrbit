import mongoose from "mongoose";
import bcrypt from "bcrypt";

const employeeSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: false,
        required: true
    },
    refreshToken:{
        type: String
    }
},{timestamps: true});

employeeSchema.pre("save",  async function(next){
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10);
    next();
})

employeeSchema.method.isPasswordCorrect = async function (password){
    return  await bcrypt.compare(password, this.password);
}

export const Employee = mongoose.model("Employee", employeeSchema);