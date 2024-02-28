import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "@/styles/styles.scss";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
});

const modulus = localFont({
    src: [
        {
            path: "../public/assets/fonts/Modulus.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/assets/fonts/Modulus_Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/assets/fonts/Modulus-Bold.otf",
            weight: "700",
            style: "normal",
        },
    ],
});

export const metadata = {
    title: {
        default: "Edvance | Revolutionary Student Management Platform",
        template: "%s | Edvance",
    },
    description:
        "Discover Edvance, the leading student management platform designed to innovate education. With Edvance, streamline academic tracking, enhance student engagement, and simplify administrative tasks. Elevate your educational experience today.",
    publisher: "TechPro Education",
    authors: [
        {
            name: "aenesu",
            url: "https://github.com/aenesu",
        },
    ],
    creator: "aenesu",
    applicationName: "Edvance",
    generator: "Next.js",
    icons: {
        icon: "/assets/images/favicon.ico",
    },
    keywords:
        "student management system, educational platform, academic tracking, student engagement, educational innovation, school administration software, Edvance",
    robots: "index, follow",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.edvance.com",
        siteName: "Edvance",
        images: [
            {
                url: "/",
                width: 800,
                height: 600,
                alt: "Edvance | Revolutionary Student Management Platform",
            },
        ],
        description:
            "Discover Edvance, the leading student management platform designed to innovate education. With Edvance, streamline academic tracking, enhance student engagement, and simplify administrative tasks. Elevate your educational experience today.",
        title: "Edvance | Revolutionary Student Management Platform",
    },
    twitter: {
        site: "@Edvance",
        creator: "@aenesu",
        card: "summary_large_image",
        description: "Edvance | Revolutionary Student Management Platform",
        images: [
            {
                url: "/",
                width: 800,
                height: 600,
                alt: "Edvance | Revolutionary Student Management Platform",
            },
        ],
    },
    metadataBase: new URL("https://www.edvance.com"),
};
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${roboto.className} ${modulus.className}`}
                style={{ height: "100% !important" }}>
                {children}
            </body>
        </html>
    );
}
