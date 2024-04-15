import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { pool } from "@/db/index";

export interface hs_Schedule extends RowDataPacket {
  id: number;
  property_id: number;
  start: Date;
  end: Date;
}

/**
 * Retrieves all schedules made from database.
 */
export async function getSchedules(): Promise<hs_Schedule[]> {
  const [res] = await pool.execute<hs_Schedule[]>(
    "SELECT * FROM bookings_db.hs_Schedule"
  );

  return res;
}

/**
 * Retrieves all schedules made for a certain property from database.
 */
export async function getSchedulesByPropertyID(
  property_id: number
): Promise<hs_Schedule[]> {
  const [res] = await pool.execute<hs_Schedule[]>(
    `SELECT * FROM bookings_db.hs_Schedule
        WHERE property_id = :property_id`,
    { property_id }
  );

  return res;
}

/**
 * Retrieves all upcoming schedules for a certain property from database.
 */
export async function getUpcomingSchedules(
  property_id: number
): Promise<hs_Schedule[]> {
  const [res] = await pool.execute<hs_Schedule[]>(
    `SELECT * FROM bookings_db.hs_Schedule WHERE property_id = :property_id
        AND start > NOW()`,
    { property_id }
  );

  return res;
}

/**
 * Creates a schedule with the given parameters.
 *
 * @returns id of newly created schedule
 */
export async function createSchedule(
  property_id: number,
  start: Date,
  end: Date
): Promise<number> {
  const [res] = await pool.execute<ResultSetHeader>(
    `INSERT INTO bookings_db.hs_Schedule (property_id, start, end)
        VALUES (:property_id, :start, :end)`,
    { property_id, start, end }
  );

  return res.insertId;
}

/**
 * Deletes a schedule with given id.
 */
export async function deleteSchedule(id: number): Promise<void> {
  await pool.execute("DELETE FROM bookings_db.hs_Schedule WHERE id = :id", {
    id,
  });
}

/**
 * Update time of a schedule with a given id.
 */
export async function updateSchedule(
  id: number,
  start: Date,
  end: Date
): Promise<void> {
  await pool.execute(
    `UPDATE bookings_db.hs_Schedule
        SET start = :start,
            end = :end
        WHERE id = :id`,
    { start, end, id }
  );
}
