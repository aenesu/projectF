import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/utils/validations/login-schema";
import { login } from "@/actions/auth/login";
import { apiPrefix, publicRoutes } from "@/routes";
import { isTokenValid } from "@/utils/functions/is-token-valid";
import { getUser } from "@/actions/user/get-user";
import { isUserAuthorized } from "@/utils/functions/is-user-authorized";

export const config = {
    providers: [
        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const validatedFields = loginSchema.safeParse(credentials);

                const user = await login(validatedFields.data);

                if (!user) return null;

                const userInfo = await getUser(user.token);

                if (!userInfo) return null;

                const userInformation = { ...user, ...userInfo };

                const payload = {
                    user: userInformation,
                    accessToken: user?.token?.split(" ")[1],
                };
                return payload;
            },
        }),
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isApiAuthRoute = nextUrl.pathname.startsWith(apiPrefix);
            const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
            const isValidToken = isTokenValid(auth?.accessToken);
            const isOnProtectedRoute =
                nextUrl.pathname.startsWith("/dashboard");
            const isOnLoginRoute = nextUrl.pathname.startsWith("/login");

            if (isApiAuthRoute) return true;

            if (!isLoggedIn || !isValidToken) return false;

            if (isPublicRoute || isOnLoginRoute) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            } else if (isOnProtectedRoute) {
                const canAccess = isUserAuthorized(
                    auth?.user?.role,
                    nextUrl.pathname
                );

                if (!canAccess)
                    return Response.redirect(new URL("/unauthorized", nextUrl));

                return true;
            }

            return true;
        },
        // this callback is called for every route needs JWT
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            if (!isTokenValid(token.accessToken)) return null;

            session.accessToken = token.accessToken;
            session.user = token.user;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};
