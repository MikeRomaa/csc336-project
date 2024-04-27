"use server";

import { Button, Card, TextInput, NumberInput } from "@tremor/react";
import { NextPage } from "next";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { DatePicker, DateRangePicker } from '@tremor/react';

import {
	State,
	registerProperty,
} from "@/app/homeseeker/registerproperty/actions";
import { getPropertyById } from "@/db/homeseeker/property";
import stupid from '@/app/homeseeker/schedule/actions';

export default async function Schedule({
    searchParams,
}: {
        searchParams: {
            pid: number;
        };
    }
) {
    const propertyInfo = await getPropertyById(searchParams.pid);
    
    return(
        <>
        <h1>Select Times You Are Avaliable To Meet: </h1>
        <h1>{propertyInfo?.address}</h1>
        <h1>{propertyInfo?.zipcode}</h1>
        <form id='times-container'>
            <Button>Save Times</Button>
            <label>Start</label>
            <input type="datetime-local"></input>
            <label>End</label>
            <input type="datetime-local"></input>
        </form>
        
        <Button onClick={stupid}>Add Time+</Button>
        </>
        
    );
}
