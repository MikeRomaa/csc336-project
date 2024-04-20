"use client";

import { Button, Card, TextInput } from "@tremor/react";
import { NextPage } from "next";
import Link from "next/link";
import { useFormState} from "react-dom";
import { useEffect } from "react";

import { State, registerProperty } from "@/app/auth/homeRegister/actions";

const HomeRegister: NextPage = () => {
	const [state, formAction] = useFormState<State, FormData>(registerProperty, {});
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
								name="type"
								type="text"
								placeholder="For Sale or For Rent"
							/>
						</div>
                        <div>
							<TextInput
								required
								name="address"
								type="text"
								placeholder="street-address"
							/>
                            
						</div>
                        <div>
							<TextInput
								required
								name="zipcode"
								type="text"
								placeholder="zip-code"
							/>
						</div>
                        <div>
							<TextInput
								required
								name="rooms"
								type="text"
								placeholder="# of rooms"
							/>
						</div>
                        <div>
							<TextInput
								required
								name="area"
								type="text"
								placeholder="area_ft2"
							/>
						</div>
                        <div>
							<TextInput
								required
								name="year-built"
								type="text"
								placeholder="year-built"
							/>
						</div>
						<div>
							<TextInput
								required
								name="price"
								type="text"
								placeholder="Asking Price"
							/>
						</div>
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
