"use client"

import { Card } from "@tremor/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Appointment } from "@/db/homeseeker/appointment";
import { User } from "@/db/auth";
import { Property } from "@/db/homeseeker/property";
import Appointmentform from "@/app/components/appointmentform/page";
import { fetchUserDetails } from "@/app/user/actions";
import { fetchAppointments, fetchPropertyBySchedule } from "./actions";


const Viewschedule = () => {
    const schedule_id = Number(useSearchParams().get('schedule'));
    const [user, setUser] = useState<User | null>(null);
    const [property, setProperty] = useState<Property | null>(null);
    const [appointment, setAppointments] = useState<Appointment[] | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            const userData = await fetchUserDetails();
            const appointmentData = await fetchAppointments(schedule_id);
            const propertyData = await fetchPropertyBySchedule(schedule_id)
            setUser(userData);
            setAppointments(appointmentData);
            setProperty(propertyData);
        }
        fetchDetails()
    }, [schedule_id])

    return (
        <div className="container">
            <div className="flex flex-col items-center justify-center w-1/2 pr-4">
                <div className="flex flex-col gap-5">
                    {appointment && (
                        appointment.map((appointment) => (
                            <Card key={appointment.id}>
                                <div className="mb-3 flex flex-col items-center">
                                    <p>Appointments made already:</p>
                                    <p className="text-slate-600 text-sm">
                                        Start time: {new Date(appointment.start).toLocaleString()}
                                    </p>
                                    <p className="text-slate-600 text-sm">
                                        End time: {new Date(appointment.end).toLocaleString()}
                                    </p>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>
            {user && user.id !== property?.broker_id && <Appointmentform schedule_id={schedule_id} />}
        </div>
    );
};

export default Viewschedule;