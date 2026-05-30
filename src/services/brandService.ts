"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

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
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
        return {
            success: false,
            message: "You are not authorized to create a brand"
        }
    }
    try {
        const res = await fetch(`${api_url}/brand`, {
            method: "POST",
            body: brandData,
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
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
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
        return {
            success: false,
            message: "You are not authorized to delete a brand"
        }
    }

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