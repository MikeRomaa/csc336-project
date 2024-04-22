import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { pool } from "@/db/index";

export interface Property extends RowDataPacket {
	property_id: number;
	broker_id: number;
	address: string;
	zipcode: number;
	type: string;
	price?: number;
	rooms?: number;
	area?: number;
	built?: number;
}

/**
 * Retrieves all properties from database.
 */
export async function getProperties(): Promise<Property[]> {
	const [res] = await pool.execute<Property[]>(
		"SELECT * FROM bookings_db.hs_property",
	);

	return res;
}

/**
 * Retrieves all properties from a certain zipcode.
 */
export async function getPropertiesByZipcode(
	zipcode: number,
): Promise<Property[]> {
	const [res] = await pool.execute<Property[]>(
		`SELECT * FROM bookings_db.hs_property
        WHERE zipcode = :zipcode`,
		{ zipcode },
	);

	return res;
}

/**
 * Retrieve a property with given id
 */
export async function getPropertyById(id: number): Promise<Property | null> {
	const [res] = await pool.execute<Property[]>(
		`SELECT * FROM bookings_db.hs_property
        WHERE id = :id`,
		{ id },
	);
	if (res.length !== 1) {
		return null;
	}

	return res[0];
}

/**
 * Retrieve a property with given address
 */
export async function getPropertyByAddress(
	address: string,
): Promise<Property | null> {
	const [res] = await pool.execute<Property[]>(
		`SELECT * FROM bookings_db.hs_property
        WHERE address = :address`,
		{ address },
	);
	if (res.length === 1) {
		return res[0];
	}

	return null;
}

/**
 * Creates a property with the given parameters.
 *
 * @returns id of newly created property
 */

export async function createProperty(
	broker_id: number,
	address: string,
	zipcode: number,
	type: string,
	price?: number,
	rooms?: number,
	area?: number,
	built?: number,
): Promise<number | null> {
	try {
		const params = {
			broker_id,
			address,
			zipcode,
			type,
			price: price !== undefined ? price : null, // Replace undefined with null
			rooms: rooms !== undefined ? rooms : null, // Replace undefined with null
			area: area !== undefined ? area : null, // Replace undefined with null
			year_built: built !== undefined ? built : null, // Replace undefined with null
		};

		const [res] = await pool.execute<ResultSetHeader>(
			`INSERT INTO bookings_db.hs_property (broker_id, address, zipcode, type, price, rooms, area, year_built)
            VALUES (:broker_id, :address, :zipcode, :type, :price, :rooms, :area, :year_built)`,
			params,
		);
		return res.insertId;
	} catch (e) {
		console.error(e);
		return null;
	}
}

/**
 * Deletes a property with given id.
 */
export async function deleteProperty(id: number): Promise<void> {
	await pool.execute("DELETE FROM bookings_db.hs_property WHERE id = :id", {
		id,
	});
}

/**
 * Update certain fields of a property with a given id.
 */
export async function updateProperty(
	id: number,
	address?: string,
	zipcode?: number,
	type?: string,
	price?: number,
	rooms?: number,
	area?: number,
	built?: number,
): Promise<void> {
	await pool.execute(
		`UPDATE bookings_db.hs_property
        SET address = :address,
            zipcode = :zipcode,
            type = :type,
            price = :price,
            rooms = :rooms,
            area = :area,
            year_built = :built
        WHERE id = :id`,
		{ address, zipcode, type, price, rooms, area, built, id },
	);
}