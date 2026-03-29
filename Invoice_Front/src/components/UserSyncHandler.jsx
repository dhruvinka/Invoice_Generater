import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UserSyncHandler() {
  
    const [synced,setSyced]=useState(false);
    const {isLoaded,isSignedIn,getToken}=useAuth();
    const {user}=useUser();
    const {baseURL}=useContext(AppContext);
  useEffect(() => {
    const saveUser = async () => {
        if (!isLoaded || !isSignedIn || synced) return;

        try {
            const token = await getToken();

            const userData = {
                clerkId: user.id,
                email: user.primaryEmailAddress.emailAddress,
                firstname: user.firstName,
                lastname: user.lastName,
                photoUrl: user.photoUrl 
            };

            await axios.post(baseURL + "/users  ", userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSyced(true);

        } catch (error) {
            console.error(error);
            toast.error("User sync failed");
        }
    };

    saveUser(); 

}, [isLoaded, isSignedIn, getToken, user, synced]);
    return null
}
