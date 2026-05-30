"use server"
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

const api_url = process.env.NEXT_PUBLIC_BASE_API;

if (!api_url) {
    throw new Error("NEXT_PUBLIC_BASE_API is not defined");
}

export const registerUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${api_url}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const result = await res.json();
        const cookieStore = await cookies();
        if (result.success) {
            cookieStore.set("accessToken", result.data.accessToken);
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong during registration",
        };
    }
};

export const loginUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${api_url}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const result = await res.json();
        const cookieStore = await cookies();
        if (result.success) {
            cookieStore.set("accessToken", result.data.accessToken);
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong during registration",
        };
    }
};

export const getCurrentUser = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    let decodedData = null;

    if (accessToken) {
        decodedData = await jwtDecode(accessToken);
        return decodedData;
    } else {
        return null;
    }
};

export const reCaptchaTokenVerification = async (token: string) => {
    try {

        const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                secret: process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY!,
                response: token,
            }),
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong during recaptcha",
        };
    }
};

export const logout = async () => {
    const cookieStore = await cookies();
    await cookieStore.delete("accessToken");
};