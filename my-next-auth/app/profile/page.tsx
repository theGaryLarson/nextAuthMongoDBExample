"use client";

import React from "react";
import { useSession } from "next-auth/react";


const Profile = () => {
    const { data: session, status } = useSession();
    return (
        <div>
            ClientComponent {status}{' '}
            {status === 'authenticated' && session.user?.name}
        </div>
    );
}

export default Profile;