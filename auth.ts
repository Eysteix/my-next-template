import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import bcrypt from 'bcryptjs';
import { z } from "zod"



const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})


export const { 
  handlers,
  auth,
  signIn,
  signOut
} = NextAuth({
  // @ts-expect-error: Required to satisfy TypeScript inference for NextAuth destructuring
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      authorization:{
        params:{
          prompt:"select_account"
        }
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
       try{
        const data = formSchema.parse(credentials);
       
        const{email,password} = data;

        const user = await prisma.user.findUnique({
          where: { email: email },
          select:{
            id:true,
            name:true,
            email:true,
            image:true,
            password:true,
            role:true
          }
        });
       
        if (!user || !user.password) {
          console.log('User not found');
          throw new Error ("Invalid Credentials")
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          console.log('Invalid password');
          throw new Error ("Invalid Credentials")
        }

        console.log('User authenticated successfully:', user.email);
        return{
          id: user.id,
          email: user.email || "",
          name: user.name || "",
          image: user.image,
          role: user.role
        }
        
      }
       
       catch(error){
          console.error('Authentication error:', error);
          return null;
       }
      
      },
      })

  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/signin',
  },
  callbacks:{
    async jwt({ token, user}) {
      // Add custom claims to JWT
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Add custom claims to session
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
 
      const isAuthRoute = nextUrl.pathname.startsWith('/auth')
      const isPublicRoute = nextUrl.pathname === '/'


      // Allow public routes
      if (isPublicRoute || isAuthRoute) {
        return true
      }

      // Protect dashboard routes
      if (nextUrl.pathname.startsWith('/dashboard')) {
        return isLoggedIn
      }

      // Protect admin routes
       if (nextUrl.pathname.startsWith('/admin')) {
        return auth?.user?.role === 'ADMIN'
      }

      return true
    }
  }
})