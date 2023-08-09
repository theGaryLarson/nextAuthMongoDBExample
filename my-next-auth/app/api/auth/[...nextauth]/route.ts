import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import startDb from "@/lib/db";
import UserModel from "@/models/userModel";

export const authOptions : NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials as {
                    email: string,
                    password: string,
                };

                await startDb();
                const user = await UserModel.findOne({ email });
                if (!user) throw Error("email/password mismatch");

                const passwordMatch = await user.comparePassword(password);
                if (!passwordMatch) throw Error("email/password mismatch");

                return {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    id: user._id,
                };
            },
        }),

    ],
    // have to add this if you want the same response in your application must add callbacks option
    callbacks: {
        jwt(params: any) {  // requires NEXTAUTH_SECRET var inside env assign ssl 
            if (params.user?.role) {
                params.token.role = params.user.role;
                params.token.id = params.user.id;
            }
            // return final_token
            return params.token;
        },
        session({ session, token }) {
            if (session.user) {
                (session.user as { id: string }).id = token.id as string;
                (session.user as { role: string }).role = token.role as string;
            }
            return session;
        },
    },
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST}