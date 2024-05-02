"use client";

import { Button, Card } from "@tremor/react";
import { useState } from "react";
import { makeSchedule } from "@/app/components/scheduleform/actions";

const Scheduleform = ({ property_id }: { property_id: number }) => {
    const [input, setInput] = useState({
        date: "",
        start: "",
        end: "",
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (property_id) {
            const startDateTime = `${input.date}T${input.start}`;
            const endDateTime = `${input.date}T${input.end}`;
            const output = await makeSchedule(
                property_id,
                new Date(startDateTime),
                new Date(endDateTime)
            )
            if (typeof output === "string") {
                setError(output);
            } else {
                setError(null);
                window.location.reload();
            }
        }
    }

    return (
        <div className="container mx-auto py-20">
            {property_id ? (
                <div>
                    <Card className="max-w-96 text-center">
                        <h2>Upload your availability</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-2 mt-3">
                            <div className="flex-1 w-full">
                                <div className="w-full flex justify-center items-center m-2">
                                    <label htmlFor="start">Date</label>
                                    <input
                                        className="ml-auto"
                                        required
                                        name="date"
                                        type="date"
                                        value={input.date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full flex justify-center items-center m-2">
                                    <label htmlFor="start">Start</label>
                                    <input
                                        className="ml-auto"
                                        required
                                        name="start"
                                        type="time"
                                        value={input.start}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full flex justify-center items-center m-2">
                                    <label htmlFor="end">End</label>
                                    <input
                                        className="ml-auto"
                                        required
                                        name="end"
                                        type="time"
                                        value={input.end}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="h-4">
                                {error && (
                                    <small className="text-sm text-red-500">{error}</small>
                                )}
                            </div>
                            <Button type="submit">Add Schedule</Button>
                        </form>
                    </Card>
                </div >
            ) : (null)
            }
        </div >
    );
}

export default Scheduleform;

