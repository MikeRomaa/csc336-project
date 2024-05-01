"use server";

import { Button, Card, TextInput, NumberInput } from "@tremor/react";
import { NextPage } from "next";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { DatePicker, DateRangePicker } from '@tremor/react';
import { Schedule } from "@/db/homeseeker/schedule";
import {
	State,
	registerProperty,
} from "@/app/homeseeker/registerproperty/actions";
import { getPropertyById } from "@/db/homeseeker/property";
import stupid, { makeSchedule } from '@/app/homeseeker/schedule/actions';

export default async function ScheduleForm({
    searchParams,
}: {
        searchParams: {
            pid: number;
        };
    }
) {
    const [schedule, setScheule] = useState<Schedule | null>(null);
	// Get the date input
	const [input, setInput] = useState({
		start: "",
		end: "",
	});
    const propertyInfo = await getPropertyById(searchParams.pid);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInput((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (schedule) {
			const output = await makeSchedule(
				searchParams.pid,
				new Date(`${schedule.start.toISOString().split("T")[0]}T${input.start}`),
				new Date(`${schedule.end.toISOString().split("T")[0]}T${input.end}`),
			)
			/*if (typeof output === "string") {
				setError(output);
			} else {
				setError(null);
			}*/
		}
	};

    return(
        <>
        <h1>Select Times You Are Avaliable To Meet: </h1>
        <h1>{propertyInfo?.address}</h1>
        <h1>{propertyInfo?.zipcode}</h1>
        <div id='times-container'>
            <form onSubmit={handleSubmit} className="flex flex-col just-center items-center">
            <Button className="ml-auto" type="submit">Save Times</Button>
            <label>Start</label>

            <input required
            name="end"
            type="time"
            placeholder="Select end time in the form 00:00"
            value={input.end}
            onChange={handleChange}>
            </input>

            <label>End</label>

            <input required
            name="end"
            type="time"
            placeholder="Select end time in the form 00:00"
            value={input.end}
            onChange={handleChange}>
            </input>
            </form>
        </div>
        
        <Button onClick={stupid}>Add Time+</Button>
        </>
        
    );
}
