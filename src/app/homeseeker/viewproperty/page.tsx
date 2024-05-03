"use client"

import { Button, Card, TextInput, NumberInput } from "@tremor/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Property } from "@/db/homeseeker/property";
import Link from "next/link";
import { Schedule } from "@/db/homeseeker/schedule";
import { User } from "@/db/auth";
import Scheduleform from "../../components/scheduleform/page";
import { fetchPropertyData, fetchSchedules, deletePropertyById, updatePropertyDetails } from "./actions";
import { fetchUserDetails } from "@/app/user/actions";


const Viewproperty = () => {
    const property_id = Number(useSearchParams().get('id'));
    const [user, setUser] = useState<User | null>(null);
    const [property, setProperty] = useState<Property | null>(null);
    const [schedules, setSchedules] = useState<Schedule[] | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editedProperty, setEditedProperty] = useState<Partial<Property>>({});

    useEffect(() => {
        const fetchDetails = async () => {
            const propertyData = await fetchPropertyData(property_id);
            const userData = await fetchUserDetails();
            const scheduleData = await fetchSchedules(property_id);
            setProperty(propertyData);
            setUser(userData);
            setSchedules(scheduleData);
        }
        fetchDetails()
    }, [property_id])

        const handleDelete = async () => {
            const success = await deletePropertyById(property_id);
            if (success) {
                alert('Property deleted successfully');
            } else {
                alert('Failed to delete the property');
            }
        };

        const handleEdit = () => {
            setEditMode(true);
            setEditedProperty({
                address: property?.address,
                zipcode: property?.zipcode,
                type: property?.type,
                rooms: property?.rooms,
                area: property?.area,
                price: property?.price,
                built: property?.built,
            });
        };
        const handleSave = async () => {
            const success = await updatePropertyDetails(property_id, editedProperty);
            if (success) {
                setEditMode(false);
                alert('Property updated successfully');
            } else {
                alert('Failed to update the property');
            }
        };
    
        const handleCancel = () => {
            setEditMode(false);
            setEditedProperty({});
        };
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setEditedProperty(prevState => ({
                ...prevState,
                [name]: value,
            }));
        };
    


    return (
        <div className="container">
        <div className="flex flex-col items-center justify-center w-1/2 pr-4">
            {property ? (
                <div className="flex flex-row">
                    <Card className="mt-5 flex flex-row gap-3 justify-center">
                        <p>Properties details:</p>
                        <p>Address: {property.address}</p>
                        <p>Zipcode: {property.zipcode}</p>
                        <p>Type: {property.type}</p>
                        {property.price ? <p>Asking price: {property.price}</p> : null}
                        {property.area ? <p>Area: {property.area}</p> : null}
                        {property.rooms ? <p>Rooms: {property.rooms}</p> : null}
                        {property.built ? <p>Year built: {property.built}</p> : null}
                    </Card>
                </div>
            ) : (null)}
            {user && user.id === property?.broker_id && ( // Only show buttons if user is signed in
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row mt-4">
                        {!editMode ? (
                            <Button onClick={handleEdit}>Edit</Button>
                        ) : (
                            <>
                                <Button onClick={handleSave}>Save</Button>
                                <Button onClick={handleCancel} className="bg-red-500">Cancel</Button>
                            </>
                        )}
                        <Button onClick={handleDelete} className="bg-red-500">Delete</Button>
                    </div>
                    {editMode && (
                        <Card className="mt-5 p-4">
                            <h2 className="text-lg font-semibold mb-2">Edit Property</h2>
                            <TextInput name="address" value={editedProperty.address || ''} onChange={handleChange} placeholder="Address" />
                            <NumberInput name="zipcode" value={editedProperty.zipcode || ''} onChange={handleChange} placeholder="Zipcode" />
                            <TextInput name="type" value={editedProperty.type || ''} onChange={handleChange} placeholder="Type" />
                            <NumberInput name="rooms" value={editedProperty.rooms || ''} onChange={handleChange} placeholder="Rooms" />
                            <NumberInput name="area" value={editedProperty.area || ''} onChange={handleChange} placeholder="Area" />
                            <NumberInput name="price" value={editedProperty.price || ''} onChange={handleChange} placeholder="Price" />
                            <NumberInput name="built" value={editedProperty.built || ''} onChange={handleChange} placeholder="Year Built" />
                        </Card>
                    )}
                </div>
            )}
        </div>
        {user && user.id === property?.broker_id && <Scheduleform property_id={property_id} />}
    </div>
);
};

export default Viewproperty;
