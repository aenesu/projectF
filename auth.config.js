import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/utils/validations/loginSchema";
import { login } from "@/actions/auth/login";

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
                    // ["Bearer", "gjkbhfdskgjhkjehkfjhekwruf"]
                    accessToken: user.token.split[" "][1],
                };
                console.log(payload);
                return payload;
            },
        }),
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            console.log(auth);
            const isLoggedIn = !!auth?.user;

            if (!isLoggedIn) return false;

            return true;
        },
        async jwt() {},
        async session() {},
    },
    pages: {
        signIn: "/login",
    },
};
