"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const api_url = process.env.NEXT_PUBLIC_BASE_API;

if (!api_url) {
    throw new Error("NEXT_PUBLIC_BASE_API is not defined");
}

export const addFlashSale = async (productData: any): Promise<any> => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("accessToken")?.value;
    if (!token) {
        return {
            success: false,
            message: "You are not authorized to add product to flash sale"
        }
    }

    try {
        const res = await fetch(`${api_url}/flash-sale`, {
            method: "POST",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });

        revalidateTag("PRODUCT", "CACHE");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};

// get Flash Sale Products
export const getFlashSaleProducts = async () => {
    try {
        const res = await fetch(`${api_url}/flash-sale`, {
            next: {
                tags: ["PRODUCT"],
            },
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};