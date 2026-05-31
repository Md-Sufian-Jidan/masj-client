import { ICategory } from "@/types";
import Image from "next/image";

const CategoryCard = ({ category }: { category: ICategory }) => {
    return (
        <div className="bg-[#f0f0f0] bg-opacity-50 border border-[#d0d0d0] rounded-2xl text-center p-6 h-44">
            <Image
                src={category?.icon || "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"}
                width={100}
                height={150}
                alt="category icon"
                className="mx-auto"
            />
            <h3 className="text-lg font-semibold truncate mt-3">{category?.name || 'N/A'}</h3>
        </div>
    );
};

export default CategoryCard;