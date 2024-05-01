"use server"

import { getCurrentUser } from "../../cookies";

export async function getUserDetails() {
    return getCurrentUser();
}