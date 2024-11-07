import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDtataFromToken";
import User from '@/models/userModel'

import {NextRequest , NextResponse} from 'next/server'


connect()


export async function POST(request:NextRequest){

    try {

        const userId =  await getDataFromToken(request)
        console.log(userId)
        const user = await User.findOne({_id: userId}).select("-password")

        if (!user) {
            return NextResponse.json(
                {
                    error: "invalid token"
                }
            )
        }
        console.log(user)

        return NextResponse.json(
            {
                message: "User found",
                data : user
            }
        )


        
    } catch (error:any) {
        return NextResponse.json(
            {
                error: error.message
            },
            {status:500}
        )
    }



}