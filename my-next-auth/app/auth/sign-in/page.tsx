"use client";

// sign in page
import {ChangeEventHandler, FormEventHandler, useEffect, useState} from "react";
import { signIn } from "next-auth/react";
import InputField from "@/components/InputField";
import { useRouter } from "next/navigation";
import Alert from "@/components/Alert";

const SignIn = () => {
    const [error, setError] = useState("");
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });
    const router = useRouter();

    const { email, password } = userInfo;
    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { name, value } = target;
        setUserInfo({ ...userInfo, [name]: value });
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        // Form submission logic
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false, /*needed to display error message coming from our backend.*/
        });


        if (res?.error) {
            setError(res.error);
            // router.replace("/permission-denied")
        } else {
            router.replace("/profile")
        }

        // if the user signs in successfully route them to the profile page. Look at useRouter import from location

    }

    return (
        <div>
            <form className="w-1/3" onSubmit={handleSubmit}>
                {error ? (
                    <div className="mb-4">
                        <Alert value={error}/>
                    </div>
                ) : null}
                <InputField label="email" name="email" value={email} onChange={handleChange} />
                <InputField label="password" name="password" value={password} onChange={handleChange} />
                <button
                    className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    type="submit"
                >
                    Sign In
                </button>
            </form>
        </div>
    )

}

export default SignIn