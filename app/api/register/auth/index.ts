import User from "@/database/user.modal";
import { connectToDatabase } from "@/types/mongoose";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
     const { email, password, username, name } =  await req.json()
     await connectToDatabase()
     await User.create({email,password,username,name})
     const {searchParams} =  new URL(req.url)
     const step = searchParams.get('step')

     if(step === '1'){
        const { email } = await req.json();
        const isExistingUser = await User.findOne(email)

        if(isExistingUser){
            return NextResponse.json(
                {error: "Email yoq Loy yaxshilab qara "},
                {status: 400}
            )
        }

        return NextResponse.json({ success: true })
     }
    }catch(error){
       const result = error as Error ;
       return NextResponse.json({ error:result.message}, {status:400})
    }
}