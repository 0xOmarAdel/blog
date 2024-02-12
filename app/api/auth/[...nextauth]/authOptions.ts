import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import { connectToDB } from "@/db";
import { NextAuthOptions } from "next-auth";
import { Profile } from "next-auth";

interface UpdatedProfile extends Profile {
  given_name?: string;
  family_name?: string;
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session!.user!.email });

      return {
        ...session,
        user: {
          ...session.user,
          id: sessionUser._id.toString(),
          isAdmin: sessionUser.isAdmin,
        },
      };
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile!.email });

        // if not, create a new document and save user in MongoDB
        console.log(profile);
        if (!userExists) {
          await User.create({
            email: (profile as UpdatedProfile).email,
            firstName: (profile as UpdatedProfile).given_name,
            lastName: (profile as UpdatedProfile).family_name,
            image: (profile as UpdatedProfile).picture!,
          });
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  },
} as NextAuthOptions;
