"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const api_url = process.env.NEXT_PUBLIC_BASE_API;

if (!api_url) {
    throw new Error("NEXT_PUBLIC_BASE_API is not defined");
}

// get all products
export const getAllProducts = async (page?: string, limit?: string, query?: { [key: string]: string | string[] | undefined }) => {

    const params = new URLSearchParams();
    if (query?.price) {
        params.append("minPrice", "0");
        params.append("maxPrice", query.price.toString());
    }

    if (query?.category) {
        params.append("categories", query?.category.toString());
    }
    if (query?.brand) {
        params.append("brands", query?.brand.toString());
    }
    if (query?.rating) {
        params.append("ratings", query?.rating.toString());
    }

    try {
        const res = await fetch(`${api_url}/product?page=${page}&limit=${limit}&${params}`, {
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

export const getSingleProduct = async (productId: string) => {
    try {
        const res = await fetch(
            `${api_url}/product/${productId}`,
            {
                next: {
                    tags: ["PRODUCT"],
                },
            }
        );
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};

// add product
export const addProduct = async (productData: FormData): Promise<any> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
        return {
            success: false,
            message: "You are not authorized to create a product",
        };
    }
    try {
        const res = await fetch(`${api_url}/product`, {
            method: "POST",
            body: productData,
            headers: {
                Authorization: token,
            },
        });
        revalidateTag("PRODUCT", "CACHE");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};

// update product
export const updateProduct = async (productData: FormData, productId: string): Promise<any> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
        return {
            success: false,
            message: "You are not authorized to update a product",
        };
    }

    try {
        const res = await fetch(`${api_url}/product/${productId}`, {
            method: "PATCH",
            body: productData,
            headers: {
                Authorization: token,
            },
        });
        revalidateTag("PRODUCT", "CACHE");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};