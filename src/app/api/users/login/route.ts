import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"
import {NextRequest , NextResponse} from 'next/server'


connect()


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const { email , password} = reqBody

        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json(
                {
                    error: "user NOT FOUND"
                }
            )
        }



        const validPass = await bcryptjs.compare(password , user.password)

        if (!validPass) {
            return NextResponse.json(
                {
                    error: "check credentials"
                }
            )
        }

        const tokenData = {
            id : user._id,
            username: user.username,
            email:user.email
        }

        const token = jwt.sign(tokenData , process.env.TOKEN_SECRET! , {expiresIn:'1d'})
        
        const response = NextResponse.json({
            message:"logged in"
            ,
            success: true
        })

        response.cookies.set("token" , token , {httpOnly:true})


        return response





    } 
    catch (error:any) {
        return NextResponse.json(
            {
                error: error.message
            },
            {status:500}
        )
    }
}