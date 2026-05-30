"use server";

import { cookies } from "next/headers";

const api_url = process.env.NEXT_PUBLIC_BASE_API;

if (!api_url) {
    throw new Error("NEXT_PUBLIC_BASE_API is not defined");
}

export const createCategory = async (formData: FormData) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;
        if (!token) {
            return {
                success: false,
                message: "You are not authorized to create a category",
            };
        }

        const res = await fetch(`${api_url}/category`, {
            method: "POST",
            headers: {
                Authorization: token,
                // "Content-Type": "multipart/form-data",
            },
            body: formData,
        });
        return await res.json();
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong during category creation",
        };
    }
};

export const getAllCategories = async () => {
    try {
        const res = await fetch(`${api_url}/category`, {
            cache: "no-store"
        });
        return await res.json();
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong during category retrieval",
        };
    }
};