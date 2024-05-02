"use server"

import { getCurrentUser } from "@/app/cookies";
import { User } from "@/db/auth";
import { getPropertiesByUser } from "@/db/homeseeker/property";
import { getUpcomingAppointmentsByUser, getAppointmentsByUser } from "@/db/homeseeker/appointment";

export async function getUserProperties(user_id: number) {
    const properties = await getPropertiesByUser(user_id);
    return properties;
}

export async function getUserAppointments(user_id: number) {
    const appointments = await getAppointmentsByUser(user_id);
    return appointments;
}

export async function fetchUserDetails(): Promise<User | null> {
    const user = await getCurrentUser();
    return user;
}