import Credentials from "next-auth/providers/credentials";

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
                console.log("credentials", credentials);
            
                //Login logic goes here
            },
        }),
    ],
    callbacks: {},
    pages: {
        signIn: "/login",
    },
};
