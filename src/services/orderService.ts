"use server";

import { IOrder } from "@/types/order";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const api_url = process.env.NEXT_PUBLIC_BASE_API;

if (!api_url) {
    throw new Error("NEXT_PUBLIC_BASE_API is not defined");
}

export const createOrder = async (order: IOrder) => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("accessToken")?.value;
    if (!token) {
        return {
            success: false,
            message: "You are not authorized to place order"
        }
    }
    try {
        const res = await fetch(`${api_url}/order`, {
            method: "POST",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
            next: {
                tags: ["ORDER"]
            }
        });

        return await res.json();
    } catch (error: any) {
        return Error(error);
    }
};