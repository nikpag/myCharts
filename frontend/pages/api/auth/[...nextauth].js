import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// This endpoint is called whenever the user signs in/out
export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		})
	],
};

export default NextAuth(authOptions);
