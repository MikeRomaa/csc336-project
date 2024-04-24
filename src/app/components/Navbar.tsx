import Link from "next/link";

const Navbar = () => {
	return (
		<nav className="bg-white border-b-4 border-black">
			<ul className="flex flex-row justify-between items-center p-4">
				<li>
					<Link href="/">
						<span className="text-black">Home</span>
					</Link>
				</li>
				<li>
					<Link href="/auth/sign-in">
						<span className="text-black">Login</span>
					</Link>
				</li>
				<li>
					<Link href="/auth/register">
						<span className="text-black">Sign up</span>
					</Link>
				</li>
				<li>
					<Link href="/homeseeker">
						<span className="text-black">Homeseeker</span>
					</Link>
				</li>
				<li>
					<Link href="/homeseeker/registerproperty">
						<span className="text-black">Register Home</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
