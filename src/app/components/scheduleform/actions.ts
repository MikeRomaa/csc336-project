"use server";

import {
	createSchedule,
	Schedule,
	getScheduleByID
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


	// Get user currently logged in
	// Get user currently logged in
	const user = getCurrentUser();
	if (!user) {
		return "Not signed in";
	}

	/* Check if the address was already registered
	const existingProperty = await getPropertyByAddress(address as string);
	if (existingProperty !== null) {
		return { formError: "Address already registered" };
	}*/

	// Create the property
	const schedule_id = await createSchedule(
		pid as number,
		start_time as Date,
		end_time as Date,
	);
	if (!schedule_id) {
		return "Error creating schedule"
	}

	// Get the schedule
	const schedule = await getScheduleByID(schedule_id);
	if (!schedule) {
		return "Failed to retrieve appointment.";
	}
	return schedule;
}

export async function fetchPropertyData(property_id: number) {
	const propertyData = await getPropertyByID(property_id);
	return propertyData;
};
