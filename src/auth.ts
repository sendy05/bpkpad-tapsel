import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string | null | undefined;
            email?: string | null | undefined;
            role?: 'SUPER_ADMIN' | 'EDITOR' | 'AUTHOR';
        };
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/admin/login',
    },
    providers: [
        Credentials({
            credentials: {
                identifier: { label: 'Email atau Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                if (!credentials) return null;
                const identifier = String(credentials.identifier || '').trim();
                const password = String(credentials.password || '');
                if (!identifier || password.length < 3) return null;

                // Use User table instead of admin table
                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: identifier },
                            { username: identifier }
                        ],
                        status: 'Active',
                    },
                });
                if (!user) return null;

                // Verify password using bcrypt
                const isValid = await verifyPassword(password, user.passwordHash);
                if (!isValid) return null;

                // Map User role to session role
                let role: 'SUPER_ADMIN' | 'EDITOR' | 'AUTHOR' = 'AUTHOR';
                if (user.role === 'SuperAdmin') role = 'SUPER_ADMIN';
                else if (user.role === 'Editor') role = 'EDITOR';

                // Update last login
                await prisma.user.update({
                    where: { id: user.id },
                    data: { lastLoginAt: new Date() }
                }).catch(() => {});

                return {
                    id: String(user.id),
                    name: user.name || user.username || 'Admin',
                    email: user.email || undefined,
                    role: role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub as string;
                session.user.role = token.role as any;
            }
            return session;
        },
    },
});

