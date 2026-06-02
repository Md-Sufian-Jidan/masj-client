"use server";

import { getNewToken } from "@/services/authService";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const isTokenExpired = async (token: string): Promise<boolean> => {
    if (!token) return true;

    try {
        const decodedToken: { exp: number } = jwtDecode(token);
        return (decodedToken.exp * 1000) < Date.now();
    } catch (error) {
        return true;
    }
};

export const getValidToken = async (): Promise<string> => {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;

    if (!token || await isTokenExpired(token)) {
        const data = await getNewToken();
        if (data.success) {
            token = data?.token;
            cookieStore.set("accessToken", token as string);
        }
    }

    return token;
};