"use client"

import Link from "next/link";
import { getUserDetails } from "./action";
import { useRouter } from "next/navigation";

const Navbar = () => {
	const router = useRouter();
	const handleAccount = async () => {
		const response = await getUserDetails();
		if (!response) {
			router.push("/auth/sign-in");
			return;
		}
		router.push(`/user?user=${response.id}`)
	}

	return (
		<nav className="bg-white border-b-4 border-black">
			<ul className="flex flex-row justify-between items-center p-4">
				<li>
					<Link href="/">
						<span className="text-black">Home</span>
					</Link>
				</li>
				<li>
					<Link href="/homeseeker">
						<span className="text-black">Homeseeker</span>
					</Link>
				</li>
				<li>
					<Link href="/tutortime">
						<span className="text-black">TutorTime</span>
					</Link>
				</li>
				<li>
					<button onClick={handleAccount}>
						<span className="text-black">Account</span>
					</button>
				</li>
				<li>
					<Link href="/auth/sign-in">
						<span className="text-black">Login</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
