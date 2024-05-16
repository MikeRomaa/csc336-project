"use client";

import Link from "next/link";
import type React from "react";

import type { User } from "@/db/auth";
import { useEffect, useState } from "react";
import { fetchUserDetails } from "./actions";

export const Navbar: React.FC = () => {
	const [currUser, setUser] = useState<null | User>(null);
	useEffect(() => {
		async function user() {
			const u = await fetchUserDetails();
			setUser(u);
			console.log(u);
		}
		user();
	}, []);
	return (
		<nav className="bg-white border-b-4 border-black">
			<ul className="flex flex-row justify-between items-center p-4">
				<li>
					<Link href="/">
						<span className="font-semibold text-2xl text-center text-blue-900">
							Home
						</span>
					</Link>
				</li>
				<li>
					<Link href="/homeseeker">
						<span className="font-semibold text-2xl text-center text-blue-900">
							Homeseeker
						</span>
					</Link>
				</li>
				<li>
					<Link href="/tutortime">
						<span className="font-semibold text-2xl text-center text-blue-900">
							TutorTime
						</span>
					</Link>
				</li>
				<li>
					<Link href="/user">
						<span className="font-semibold text-2xl text-center text-blue-900">
							Account
						</span>
					</Link>
				</li>
				{!currUser ? (
					<li>
						<Link href="/auth/sign-in">
							<span className="font-semibold text-2xl text-center text-blue-900">
								Login
							</span>
						</Link>
					</li>
				) : (
					<li>
						<Link href="/">
							<span className="font-semibold text-2xl text-center text-red-900">
								Logout
							</span>
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};
