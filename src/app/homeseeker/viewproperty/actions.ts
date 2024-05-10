"use server";

import { getPropertyByID, deleteProperty, updateProperty } from "@/db/homeseeker/property";
import { getSchedulesByPropertyID, deleteSchedule } from "@/db/homeseeker/schedule";
import type { Property } from "@/db/homeseeker/property";

export async function fetchPropertyData(property_id: number) {
    const propertyData = await getPropertyByID(property_id);
    return propertyData;
};

export async function fetchSchedules(property_id: number) {
    return getSchedulesByPropertyID(property_id);
}


export async function deletePropertyById(id: number): Promise<boolean> {
    try {
        const schedules = await getSchedulesByPropertyID(id);
        for (const schedule of schedules) {
            await deleteSchedule(schedule.id);
        }

        await deleteProperty(id);
        return true;
    } catch (error) {
        console.error("Failed to delete property and schedules:", error);
        return false;
    }
}

export async function updatePropertyDetails(id: number, updatedDetails: Property): Promise<boolean> {
    try {
        //Check each property and set it to null if undefined
        const address = updatedDetails.address ?? null;
        const zipcode = updatedDetails.zipcode ?? null;
        const type = updatedDetails.type ?? null;
        const price = updatedDetails.price ?? null;
        const rooms = updatedDetails.rooms ?? null;
        const area = updatedDetails.area ?? null;
        const built = updatedDetails.built ?? null;

        await updateProperty(id, address, zipcode, type, price, rooms, area, built);
        return true;
    } catch (error) {
        console.error("Failed to update property:", error);
        return false;
    }
}

