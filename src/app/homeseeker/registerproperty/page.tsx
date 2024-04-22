"use client";

import { Button, Card, TextInput, NumberInput } from "@tremor/react";
import { NextPage } from "next";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useEffect } from "react";

import {
	State,
	registerProperty,
} from "@/app/homeseeker/registerproperty/actions";

const HomeRegister: NextPage = () => {
	const [state, formAction] = useFormState<State, FormData>(
		registerProperty,
		{},
	);
	useEffect(() => {
		console.log("Form data:", state);
	}, [state]);
	return (
		<div className="container mx-auto py-20">
			<Card className="max-w-96 mx-auto">
				<h1 className="mb-5 text-tremor-title font-medium">Register A Home</h1>
				<form action={formAction}>
					<div className="mb-5 flex flex-col gap-3">
						<div>
							<TextInput
								required
								name="address"
								type="text"
								placeholder="Street-address"
								error={!!state.fieldErrors?.address}
								errorMessage={state.fieldErrors?.address}
							/>
						</div>
						<div>
							<TextInput
								required
								name="zipcode"
								type="text"
								placeholder="Zip-code"
								error={!!state.fieldErrors?.zipcode}
								errorMessage={state.fieldErrors?.zipcode}
							/>
						</div>
						<div>
							<TextInput
								required
								name="type"
								type="text"
								placeholder="For Sale or For Rent"
								error={!!state.fieldErrors?.type}
								errorMessage={state.fieldErrors?.type}
							/>
						</div>
						<div>
							<NumberInput
								name="rooms"
								placeholder="Number of rooms"
								error={!!state.fieldErrors?.rooms}
								errorMessage={state.fieldErrors?.rooms}
							/>
						</div>
						<div>
							<NumberInput
								name="area"
								placeholder="Square-footage"
								error={!!state.fieldErrors?.area}
								errorMessage={state.fieldErrors?.area}
							/>
						</div>
						<div>
							<NumberInput
								name="price"
								placeholder="Asking Price"
								error={!!state.fieldErrors?.price}
								errorMessage={state.fieldErrors?.price}
							/>
						</div>
						<div>
							<NumberInput
								name="year-built"
								placeholder="Year-built"
								error={!!state.fieldErrors?.year}
								errorMessage={state.fieldErrors?.year}
							/>
						</div>
						{state.formError && (
							<small className="text-sm text-red-500">{state.formError}</small>
						)}
					</div>
					<div className="items-center">
						<Button className="ml-auto" type="submit">
							Upload
						</Button>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default HomeRegister;
