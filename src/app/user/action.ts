"use server"

import { getCurrentUser } from "@/app/cookies";
import { getPropertiesByUser } from "@/db/homeseeker/property";
import { getUpcomingAppointmentsByUser } from "@/db/homeseeker/appointment";

export async function getUserProperties(userId: number) {
    const properties = await getPropertiesByUser(userId);
    return properties;
}

export async function getUserAppointments(userId: number) {
    const appointments = await getUpcomingAppointmentsByUser(userId);
    return appointments;
}

export async function getUserDetails() {
    return getCurrentUser();
}