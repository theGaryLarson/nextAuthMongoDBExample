// New way to add routes inside of Next.js 13

import startDb from "@/lib/db";
import {NextResponse} from "next/server";
import UserModel from "../../../../models/userModel"

interface NewUserRequest {
    name: string;
    email: string;
    password: string;
}

interface NewUserResponse {
    id: string;
    name: string;
    email: string;
    role: string;
}

type NewResponse = NextResponse<{user?: NewUserResponse; error?: string}>
export const POST = async (req: Request): Promise<NewResponse> => {
    const body = (await req.json()) as NewUserRequest;

    await startDb();

    const existingUser = await UserModel.findOne({ email: body.email})
    if (existingUser) {
        return NextResponse.json(
            {error: "email is already in use!"},
            {status: 422}
        );
    }
    // if a new user create with NewUserRequest
    const user = await UserModel.create({...body});

    return NextResponse.json({
        user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
    },

    });
}