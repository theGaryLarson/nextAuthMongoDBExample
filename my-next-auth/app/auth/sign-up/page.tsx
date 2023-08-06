"use client";

import InputField from "@/components/InputField";
import Link from "next/link"
import {ChangeEventHandler, FormEventHandler, useState} from "react";


const SignUp = () => {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { name, email, password } = userInfo;

    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { name, value } = target;

        setUserInfo({ ...userInfo, [name]: value} );
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        // sends message to POST method created in app/auth/users/route.ts
        const res = await fetch("/api/auth/users", {
            method: "POST",
            body: JSON.stringify(userInfo),
        }).then( (res) => res.json());
        console.log(res);
    }

    return (
        <>
            <form className="w-1/3" onSubmit={handleSubmit}>
                <InputField
                    label="Name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
                <InputField
                    label="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <InputField
                    label="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <button
                    className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    type="submit"
                >
                    Sign Up
                </button>
            </form>
        </>
    )
}

export default SignUp