"use client";

import { Button, Card, TextInput } from "@tremor/react";
import { NextPage } from "next";
import { useFormState } from "react-dom";

//import { State, authenticate } from "@/app/auth/create/actions";

const CreateProperty: NextPage = () => {
  const [state, formAction] = useFormState<State, FormData>(registerProperty, {});

  return (
    <div className="container mx-auto py-20">
      <Card className="max-w-96 mx-auto">
        <h1 className="mb-5 text-tremor-title font-medium">Sign In</h1>
        <form action={formAction}>
          <div className="mb-5 flex flex-col gap-3">
            <div>
              <TextInput
                required
                name="address"
                type="address"
                placeholder="Address"
                error={!!state.fieldErrors?.address}
                errorMessage={state.fieldErrors?.address}
              />
            </div>
            <div>
              <TextInput
                required
                name="zipcode"
                type="zipcode"
                placeholder="Zipcode"
                error={!!state.fieldErrors?.zipcode}
                errorMessage={state.fieldErrors?.zipcode}
              />
            </div>
            <div>
              <TextInput
                required
                name="type"
                type="type"
                placeholder="Type of property"
                error={!!state.fieldErrors?.type}
                errorMessage={state.fieldErrors?.type}
              />
            </div>
            <div>
              <TextInput
                name="price"
                type="price"
                placeholder="Asking price"
              />
            </div>
            <div>
              <TextInput
                name="rooms"
                type="rooms"
                placeholder="Number of rooms"
              />
            </div>
            <div>
              <TextInput
                name="area"
                type="area"
                placeholder="Square area"
              />
            </div>
            <div>
              <TextInput
                name="built"
                type="built"
                placeholder="Year built"
              />
            </div>
            {state.formError && (
              <small className="text-sm text-red-500">{state.formError}</small>
            )}
          </div>
          <div className="flex flex-row-reverse items-center">
            <Button className="ml-auto" type="submit">
              Register Property
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateProperty;
