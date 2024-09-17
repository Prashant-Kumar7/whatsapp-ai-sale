import prisma from "@/db";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req : NextRequest)=>{
    const body = await req.json();
    const hashPassword = await hash(body.password, 10)

    try {
        const user = await prisma.user.create({
            data : {
                email : body.email,
                password : hashPassword
            }
        })

        return NextResponse.json(user)

    } catch (error) {
        return NextResponse.json({
            error : error
        })
    }

    

}