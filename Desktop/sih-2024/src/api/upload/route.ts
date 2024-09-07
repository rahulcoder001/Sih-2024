import { dbconnect } from "@/dbconfig/db";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { FileData } from "@/model/file";




dbconnect();

export async function POST(req: NextRequest) {
  try {
    
    const formData = await req.formData();


    
    const file = formData.get('uploadfile') as File | null;
    let filename = '';
    
    if (file) {
        const uploadsDir = path.join(process.cwd(), 'public', 'upload');


        await mkdir(uploadsDir, { recursive: true });
        
        filename = file.name; 
        const uploadPath = path.join(uploadsDir, filename);
    

        const bufferData = await file.arrayBuffer();
        const buffer = Buffer.from(bufferData);
        
        console.log("Saving file to:", uploadPath);
        await writeFile(uploadPath, buffer);
    }

    
    const Documenttype = formData.get('Documenttype') as string;
    const Name = formData.get('Name') as string;
    //@ts-ignore
    const startdate = formData.get('startdate') as Date;
    //@ts-ignore
    const Enddate = formData.get('enddate') as Date;
    

    

    

 


    // Create and save the user
    const newfile = new FileData({
        Documenttype,
        Name,
        startdate,
        Enddate,
        uploadfile: `/upload/${filename}`, 
    });

    await newfile.save();

    return NextResponse.json({
      message: "file added successfully",
      Id: newfile._id,
      ok: true,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({
      message: "Failed to add file",
      ok: false,
      error: error,
    });
  }
}


