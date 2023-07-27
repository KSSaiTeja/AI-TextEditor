import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
	title: "AI Text Editor",
	description: "AI Powered Text Editor for creators",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-zinc-900">{children}</body>
		</html>
	);
}
