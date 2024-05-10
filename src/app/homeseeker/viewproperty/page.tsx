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
            <div className="container px-4">
                
                <div className="flex flex-row justify-between items-start w-full space-x-4">
                    
                    <div className="w-3/4"> 
                        
                        {property ? (
                            <>
                                <Card className="mt-5 p-5 bg-white rounded-lg"> 
                                    <div className="grid grid-cols-2 gap-4 text-lg">
                                        {property.address ? <p><strong>Address:</strong> {property.address}</p> : null}
                                        {property.zipcode ? <p><strong>Zipcode:</strong> {property.zipcode}</p> : null}
                                        {property.type ? <p><strong>Type:</strong> {property.type}</p> : null}
                                        {property.price ? <p><strong>Asking Price:</strong> ${property.price?.toLocaleString()}</p> : null}
                                        {property.area ? <p><strong>Area:</strong> {property.area} sq ft</p> : null}
                                        {property.rooms ? <p><strong>Rooms:</strong> {property.rooms}</p> : null}
                                        {property.built ? <p><strong>Year Built:</strong> {property.built}</p> : null}
                                    </div>
                                </Card>
                                {user && user.id === property?.broker_id && (
                                    <div className="mt-4 flex justify-center space-x-4"> {/* Button container for editing */}
                                        {!editMode ? (
                                            <>
                                                <Button onClick={handleEdit}>Edit</Button>
                                                <Button onClick={handleDelete} className="bg-red-500">Delete</Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button onClick={handleSave}>Save</Button>
                                                <Button onClick={handleCancel} className="bg-red-500">Cancel</Button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : null}
                        {editMode && user && user.id === property?.broker_id && (
                            <Card className="mt-5 p-4">
                                <h2 className="text-lg font-semibold mb-2">Edit Property</h2>
                                <TextInput name="address" value={editedProperty.address || ''} onChange={handleChange} placeholder="Address" />
                                <TextInput name="zipcode" value={editedProperty.zipcode || ''} onChange={handleChange} placeholder="Zipcode" />
                                <TextInput name="type" value={editedProperty.type || ''} onChange={handleChange} placeholder="Type" />
                                <NumberInput name="rooms" value={editedProperty.rooms || ''} onChange={handleChange} placeholder="Rooms" />
                                <TextInput name="area" value={editedProperty.area || ''} onChange={handleChange} placeholder="Area" />
                                <TextInput name="price" value={editedProperty.price || ''} onChange={handleChange} placeholder="Price" />
                                <TextInput name="built" value={editedProperty.built || ''} onChange={handleChange} placeholder="Year Built" />
                            </Card>
                        )}
                        {user && user.id === property?.broker_id && (
                <div className="mt-5"> {/* Adjusted width and added mt-5 to match the left column */}
                    <Scheduleform property_id={property_id} />
                </div>
            )}
                    </div>
        
                    
                <div className="w-1/4 mt-5">
                    {schedules ? (
                        schedules.map((schedule) => (
                            <Card key={schedule.id}>
                                <div className="mb-3 flex flex-col items-center">
                                    <p className="text-slate-600 text-sm">
                                        Start time: {new Date(schedule.start).toLocaleString()}
                                    </p>
                                    <p className="text-slate-600 text-sm">
                                        End time: {new Date(schedule.end).toLocaleString()}
                                    </p>
                                    <Link
                                        href={{
                                            pathname: "/homeseeker/makeappointment",
                                            query: { schedule: schedule.id },
                                        }}
                                    >
                                        <Button className="ml-auto">
                                            Make an appointment!
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <p>No schedules found yet.</p>
                    )}
                </div>
            
                    
                </div>
            </div>
        );
};

export default Viewproperty;
