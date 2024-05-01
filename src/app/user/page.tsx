"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button, Card } from "@tremor/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { User } from "@/db/auth";
import { Appointment } from "@/db/homeseeker/appointment";
import { Property } from "@/db/homeseeker/property";
import { getUserProperties, getUserAppointments, getUserDetails } from "./action";

const Account: NextPage = () => {
    const userParam = useSearchParams().get('user');
    const userId = userParam ? Number(userParam) : null;
    const [user, setUser] = useState<User | null>(null);
    const [properties, setProperties] = useState<Property[] | null>(null);
    const [appointments, setAppointments] = useState<Appointment[] | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (userId) {
                    const data = await getUserDetails();
                    if (data?.id !== Number(userId)) {
                        setUser(null);
                    }
                    setUser(data);
                    const propertiesData = await getUserProperties(Number(userId));
                    const appointmentData = await getUserAppointments(Number(userId));
                    setProperties(propertiesData);
                    setAppointments(appointmentData);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserDetails();
    }, [userId])

    return (
        <div>
            {user ? (
                <div className="flex flex-row flex-grow">
                    <div className="flex flex-col items-center justify-center w-1/2 pr-4">
                        <h1 className="mb-5 text-tremor-title font-medium text-center">
                            Welcome, {user.first_name} {user.last_name}!
                        </h1>
                        <Card className="max-w-96 mx-auto mb-4">
                            <h2>Your email: {user.email}</h2>
                            <h2>Your id: {user.id}</h2>
                        </Card>
                        <Card className="max-w-96 mx-auto overflow-y-auto ">
                            {properties && properties.length > 0 ? (
                                <div className="flex flex-col items-center justify-center">
                                    <h2 className="text-tremor-title font-medium text-center">Your Properties:</h2>
                                    <ul>
                                        {properties.map((property) => (
                                            <li key={property.id}>
                                                <Card>
                                                    <div className="mb-3 flex flex-col items-center">
                                                        <h2 className="text-tremor-title font-medium">
                                                            Address: {property.address}
                                                        </h2>
                                                        <p>Type: {property.type}</p>
                                                        <p>Price: {property.price}</p>
                                                        <p>Area: {property.area}</p>
                                                    </div>
                                                </Card>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <Link href="/homeseeker/registerproperty">
                                    <span>You have no property registered. Register now to start your journey!</span>
                                </Link>
                            )}
                        </Card>
                    </div>
                    <div className="w-1/2">
                        <Card className="max-w-96 mx-auto overflow-y-auto flex-grow">
                            {appointments && appointments.length > 0 ? (
                                <div className="flex flex-col items-center justify-center">
                                    <h2 className="text-tremor-title font-medium text-center">Your Appointments:</h2>
                                    <ul>
                                        {appointments.map((appointment) => (
                                            <li key={appointment.id}>
                                                {new Date(appointment.start).toLocaleString()} - {new Date(appointment.end).toLocaleString()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p>No appointments found. Check your schedules or properties!</p>
                            )}
                        </Card>
                    </div>
                </div>
            ) : (
                <div className="grid place-items-center h-screen">
                    <Button>
                        <Link href="/auth/sign-in" className="color:white visited:text-white">
                            <span>Please sign in to view your account!</span>
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Account;