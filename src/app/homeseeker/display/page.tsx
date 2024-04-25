import { Button, Card } from "@tremor/react";
import Link from "next/link";
import { getProperties } from "@/db/homeseeker/property";

export default async function Home() {
	const properties = await getProperties();

	return (
		<div className="container mx-auto py-20">
			<h1 className="mb-5 text-tremor-metric font-medium">Properties</h1>
			<div className="grid grid-cols-2 gap-5">
				{properties.map((property) => (
					<Card key={property.id}>
						<div className="mb-3 flex items-center">
							<div>
								<h2 className="text-tremor-title font-medium">
									{property.address}
								</h2>
								<p className="text-slate-600 text-sm">
									Offered by {property.zipcode}
								</p>
							</div>
							<Link href={`/homeseeker/schedule/?pid=${property.id}`}>Book Now</Link>
						</div>
						<p>{property.type}</p>
					</Card>
				))}
			</div>
		</div>
	);
}
