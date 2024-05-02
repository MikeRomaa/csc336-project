"use client";

import { Button, Card, TextInput, NumberInput } from "@tremor/react";
import { useSearchParams } from "next/navigation";
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
import { getPropertyByID, Property } from "@/db/homeseeker/property";
import  { makeSchedule, fetchPropertyData, fetchPropertySchedules } from '@/app/homeseeker/schedule/actions';

const ScheduleForm: NextPage = () => {
    const propertyId = useSearchParams().get('pid');
	const [property, setProperty] = useState<Property | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [render, setRender] = useState<boolean>(false);
    const [scheduleList, setScheduleList] = useState<{ start: Date; end: Date; }[]>([]);

	// Get the date input
	const [input, setInput] = useState({
		start: "",
		end: "",
	});
    
    useEffect(() => {

		const fetchSchedule = async () => {
			try {
				if (propertyId) {
					const data = await fetchPropertyData(Number(propertyId));
                    setProperty(data);
                    
				}
			} catch (error) {
				console.log(error)
			}
		}

        const fetchPropertySchedule = async () => {
            try {
                if(render){
                    const schedules = await fetchPropertySchedules(Number(propertyId));
                    for(let i = 0; i < schedules.length; i++){
                        setScheduleList((prev) => [
                            ...prev,
                            { start: schedules[i].start, end: schedules[i].end },
                        ]);
                    }
                }
            } catch (error) {
                console.log(error);
            }
            setRender(false);
        }
        fetchPropertySchedule();
		fetchSchedule();
	}, [propertyId, render])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInput((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (property) {
			const output = await makeSchedule(
				Number(propertyId),
				new Date(input.start),
				new Date(input.end),
			)
            if (typeof output === "string") {
				setError(output);
			} else {
				setError(null);
			}
            console.log(output);
            setRender(true);
		}
	};

    return(
        <>
        <h1>Select Times You Are Avaliable To Meet: </h1>
        <h1>{property?.address}</h1>
        <h1>{property?.zipcode}</h1>
        <h1>Current Times</h1>
        {scheduleList.map((schedule) => (
					<Card>
						<div className="mb-3 flex items-center">
							<div>
								<p className="text-slate-600 text-sm">
									Start time: {new Date(schedule.start).toLocaleString()}
								</p>
								<p className="text-slate-600 text-sm">
									End time: {new Date(schedule.end).toLocaleString()}
								</p>
							</div>
						</div>
					</Card>
		))}



        <div id='times-container'>
            <form  onSubmit={handleSubmit} className="flex flex-col just-center items-center">
            <label>Start</label>
            <input required
            name="start"
            type="datetime-local"
            placeholder="Select end time in the form 00:00"
            value={input.start}
            onChange={handleChange}>
            </input>

            <label>End</label>

            <input required
            name="end"
            type="datetime-local"
            placeholder="Select end time in the form 00:00"
            value={input.end}
            onChange={handleChange}>
            </input>

            <div className="h-4">
                {error && (
                    <small className="pb-5 text-sm text-red-500">{error}</small>
                )}
		    </div>
            <Button type="submit">Save Time</Button>
            </form>
        </div>
        
        </>
        
    );
}

export default ScheduleForm;

