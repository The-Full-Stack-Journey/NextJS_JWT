"use client";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

export default function HomeComponent() {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            //Decode the token to get user info
            const decoded: any = jwt.decode(token);
            console.log(decoded);
            if (decoded && decoded.fullName) {
                setUser(decoded.fullName);
            }
        }
    }, [])

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-lg text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-800">Welcome to JWT Auth App</h1>

                {user && <p className="mb-6 text-gray-600">Hello, {user}</p>}

                <p className="mb-6 text-gray-600">Securely authenticate and manage your sessions.</p>
                <div className="flex justify-center gap-4">
                    <a
                        href="/login"
                        className="rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
                    >
                        Login
                    </a>
                    <a
                        href="/register"
                        className="rounded-lg border border-blue-500 px-6 py-3 text-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                        Register
                    </a>
                </div>
            </div>
        </div>
    )
}
