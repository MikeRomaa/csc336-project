"use server";

import { Property, createProperty } from "@/db/property";
import { cookies } from "next/headers";
import { decryptCookie } from "@/app/cookies";
import { FormStatus } from "@/types";

export type State = FormStatus<Property>;

export async function registerProperty(
  _prev: State,
  formData: FormData
): Promise<State> {
  const address = formData.get("address");
  const zipcode = Number(formData.get("zipcode"));
  const type = formData.get("type");
  const price = formData.get("price")
    ? Number(formData.get("price"))
    : undefined;
  const rooms = formData.get("rooms")
    ? Number(formData.get("rooms"))
    : undefined;
  const area = formData.get("area") ? Number(formData.get("area")) : undefined;
  const year_built = formData.get("year_built")
    ? Number(formData.get("year_built"))
    : undefined;

  const fieldErrors: Map<string, string> | undefined = new Map();

  if (!address) {
    fieldErrors.set("address", "Required");
  }
  if (!zipcode) {
    fieldErrors.set("zipcode", "Required");
  }
  if (!type) {
    fieldErrors.set("type", "Required");
  }
  if (fieldErrors.size > 0) {
    return { fieldErrors: Object.fromEntries(fieldErrors) };
  }

  const sessionCookie = cookies()?.get("session")?.value;
  if (!sessionCookie) {
    return { fieldErrors: { session: "Session cookie not found" } };
  }
  const decryptedUser = decryptCookie(sessionCookie);
  if (!decryptedUser) {
    return { fieldErrors: { session: "Invalid session cookie" } };
  }
  const userId = decryptedUser.id;

  const propertyId = await createProperty(
    userId as number,
    address as string,
    zipcode as number,
    type as string,
    price as number,
    rooms as number,
    area as number,
    year_built as number
  );

  if (!propertyId) {
    return { fieldErrors: { email: "Property already registered." } };
  }

  const property: Property = {
    id: propertyId as number,
    broker_id: userId as number,
    address: address as string,
    zipcode: zipcode as number,
    type: type as string,
    price: price as number,
    rooms: rooms as number,
    area: area as number,
    built: year_built as number,
  };

  return { data: property };
}
