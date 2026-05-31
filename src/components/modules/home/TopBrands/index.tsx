import { Button } from "@/components/ui/button";
import ResuableContainer from "@/components/ui/core/ResuableContainer";
import { getAllBrands } from "@/services/brandService";
import { IBrand } from "@/types";
import Image from "next/image";
import Link from "next/link";

const TopBrands = async () => {
    const { data: brands } = await getAllBrands();

    return (
        <ResuableContainer className="my-36">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Top Brands</h2>
                <Link href="/products">
                    <Button variant="outline" className="rounded-full">
                        All Collection
                    </Button>
                </Link>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-6 my-10 ">
                {
                    Array(12)
                        .fill(brands?.[0])
                        ?.map((brand: IBrand, idx: number) => (
                            <div className="bg-white p-3 rounded-xl" key={idx}>
                                <div className="bg-gray-100 p-2 rounded-xl h-20 w-full">
                                    <Image
                                        src={brand?.logo || "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"}
                                        width={50}
                                        height={50}
                                        alt="category icon"
                                        className="mx-auto h-full w-full object-contain"
                                    />
                                </div>
                            </div>
                        ))
                }
            </div>
        </ResuableContainer>
    );
};

export default TopBrands;