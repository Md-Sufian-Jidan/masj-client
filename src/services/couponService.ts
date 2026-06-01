"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { ICoupon } from "@/types";

const api_url = process.env.NEXT_PUBLIC_BASE_API;

if (!api_url) {
    throw new Error("NEXT_PUBLIC_BASE_API is not defined");
}

export const addCoupon = async (couponData: ICoupon) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;
        if (!token) {
            return {
                success: false,
                message: "You are not authorized to create a coupon",
            };
        }

        const res = await fetch(`${api_url}/coupon/${couponData.couponCode}`, {
            method: "POST",
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(couponData),
        });
        revalidateTag("COUPON", "CACHE");
        return await res.json();
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong during coupon creation",
        };
    }
};

export const getAllCoupons = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
        return {
            success: false,
            message: "You are not authorized to get coupons",
        };
    }

    try {
        const res = await fetch(`${api_url}/coupon`, {
            next: {
                tags: ["COUPON"],
            },
            headers: {
                Authorization: token,
            },
        });
        return await res.json();
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong during coupon retrieval",
        };
    }
};

export const deleteCoupon = async (id: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
        return {
            success: false,
            message: "You are not authorized to delete a coupon",
        };
    }

    try {
        const res = await fetch(`${api_url}/coupon/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: token,
            },
        });
        revalidateTag("COUPON", "CACHE");
        return await res.json();
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong during coupon deletion",
        };
    }
};

export const getCouponByCode = async (code: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
        return {
            success: false,
            message: "You are not authorized to get a coupon",
        };
    }

    try {
        const res = await fetch(`${api_url}/coupon/code/${code}`, {
            next: {
                tags: ["COUPON"],
            },
            headers: {
                Authorization: token,
            },
        });
        return await res.json();
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong during coupon retrieval",
        };
    }
};