import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import ImageKit from "imagekit"

const imagekit=new ImageKit({
    publicKey:process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY||"",
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY||"",
    urlEndpoint:process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT||""
});

export async function GET() {
try {
        const {userId}=await auth();
        if(!userId){
            return NextResponse.json({error:"Unauthorized"},{status:401})
        }
       //Basically generate auth tokens for each userid after identification
       const authparams= imagekit.getAuthenticationParameters(); 
       return NextResponse.json(authparams);
} catch (error) {
       return NextResponse.json({error:"Error fetching authentication parameters"},{status:500})
}
 }
