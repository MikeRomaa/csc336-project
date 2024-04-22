import { Button, Card } from "@tremor/react";

import { getProperties } from "@/db/property";

export default async function Home() {
    const properties = await getProperties();

    return (
        <div className="container mx-auto py-20">
            <h1 className="mb-5 text-tremor-metric font-medium">Services</h1>
            <div className="grid grid-cols-2 gap-5">
                {properties.map((property) => (
                    <Card key={property.property_id}>
                        <div className="mb-3 flex items-center">
                            <div>
                                <h2 className="text-tremor-title font-medium">
                                    {property.address}
                                </h2>
                                <p className="text-slate-600 text-sm">
                                    Offered by {property.zipcode}
                                </p>
                            </div>
                            <Button className="ml-auto">Book Now!</Button>
                        </div>
                        <p>{property.type}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}
