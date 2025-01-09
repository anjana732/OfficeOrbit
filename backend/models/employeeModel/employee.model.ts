import mongoose from "mongoose";

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
        required: true
    }
},{timestamps: true});

export const Employee = mongoose.model("Employee", employeeSchema);