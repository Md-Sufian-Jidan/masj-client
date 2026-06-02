"use server";
import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

const api_url = process.env.NEXT_PUBLIC_BASE_API;

if (!api_url) {
    throw new Error("NEXT_PUBLIC_BASE_API is not defined");
}

//  get all brands
export const getAllBrands = async () => {
    try {
        const res = await fetch(`${api_url}/brand`, {
            next: {
                tags: ["Brands"],
            },
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};

// create brand
export const createBrand = async (brandData: FormData): Promise<any> => {
    const token = await getValidToken();
    try {
        const res = await fetch(`${api_url}/brand`, {
            method: "POST",
            body: brandData,
            headers: {
                Authorization: token,
            },
        });
        revalidateTag("Brands", "CACHE");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};

// delete brand
export const deleteBrand = async (brandId: string): Promise<any> => {
    const token = await getValidToken();
    try {
        const res = await fetch(
            `${api_url}/brand/${brandId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: token,
                },
            }
        );
        revalidateTag("Brands", "CACHE");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};