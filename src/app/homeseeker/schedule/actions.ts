"use server";

import {
    createSchedule,
    Schedule,
    getScheduleByID,
    getSchedulesByPropertyID
} from "@/db/homeseeker/schedule";
import { cookies } from "next/headers";
import { decryptCookie } from "@/app/cookies";
import { FormStatus } from "@/types";
import { getCurrentUser } from "@/app/cookies";
import { getPropertyByID } from "@/db/homeseeker/property";
export type State = FormStatus<Schedule>;

/*export default async function stupid() {
    const startTime = document.createElement('input');
    startTime.type = 'datetime-local';
    const labelStart = document.createElement('label');
    labelStart.textContent = "Start";
    labelStart.appendChild(startTime);

    const endTime = document.createElement('input');
    endTime.type = 'datetime-local';
    const labelEnd = document.createElement('label');
    labelEnd.textContent = "End";
    labelEnd.appendChild(endTime);

    const formContainer = document.createElement('form');


    document.getElementById("times-container")?.appendChild(document.createElement('br'));
    formContainer.appendChild(labelStart);
    formContainer.appendChild(labelEnd);
    document.getElementById("times-container")?.appendChild(formContainer);
}*/

export async function makeSchedule(
    pid: number,
	start_time: Date,
	end_time: Date,
): Promise<Schedule | string> {
	

	// Errors checking
	if (!start_time) {
		return "Start time required.";
	}
	if (!end_time) {
		return "End time required.";
	}

	// Check if the start time and end time are valid
	if (start_time > end_time) {
		return "Start time must be earlier than end time.";
	}
	

	// Get user currently logged in
	// Get user currently logged in
	const user = getCurrentUser();
	if (!user) {
		return "Not signed in";
	}

    //Check if this time slot interfeers with any other schedules for this house 
    const propertySchedules = await getSchedulesByPropertyID(pid);
    for(let i = 0; i < propertySchedules.length; i++){
        if(propertySchedules[i].start <= start_time && propertySchedules[i].end >= start_time){
            return "Schedule Time Overlaps With Existing Time"
        }
        else if(propertySchedules[i].start >= start_time && (propertySchedules[i].start <= end_time && propertySchedules[i].end >= end_time)){
            return "Schedule Time Overlaps With Existing Time"
        }
    }

    const duration = (end_time.getTime() - start_time.getTime()) / 60000;
	if (duration < 20) {
		return "Appointments must be at least 20 minutes long.";
	}
	if (duration > 180) {
		return "Appointments must be less than 3 hours long.";
	}

	// Create the property
	const schedule_id = await createSchedule(
		pid as number,
        start_time as Date, 
        end_time as Date,
	);
    if (!schedule_id) {
		return "failed to make schedule";
	}
    const schedule = await getScheduleByID(schedule_id);
	if (!schedule) {
		return "Failed to retrieve schedule.";
	}
	return schedule;

}

export async function fetchPropertyData(propertyId: number) {
	const propertyData = await getPropertyByID(propertyId);
	return propertyData;
};

export async function fetchPropertySchedules(propertyId: number) {
	const propertySchedules = await getSchedulesByPropertyID(propertyId);
	return propertySchedules;
};
