"use client"

import React from "react";
import Link from "next/link";

export default function AuthProfileMenu() {
    const isAuth = false;

    if (isAuth) {
        return (
            <p>
                <button>logout</button>
            </p>
        )
    }
    return (
        <ul className="flex items-center space-x-6">
            <li>
                <Link href="/auth/sign-in">Login</Link>
            </li>
            <li>
                <Link
                    className="bg-blue-500 text-white rounded p-3 inline-block shadow-sm"
                    href="/auth/sign-up"
                >
                  Sign-up
                </Link>
            </li>
        </ul>
    )
}