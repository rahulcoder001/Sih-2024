import mongoose, { Mongoose } from "mongoose";

const FileSchema = new mongoose.Schema({
     Documenttype : String,
     Name:String,
     startdate: Date,
     enddate: Date,
     uploadfile : String,
});

export const FileData = mongoose.models.FileData || mongoose.model("fileData", FileSchema);