import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/ui/core/CategoryCard";
import { getAllCategories } from "@/services/categoryService";
import { ICategory } from "@/types";
import Link from "next/link";
import ResuableContainer from "@/components/ui/core/ResuableContainer";

const Category = async () => {
    const { data: categories } = await getAllCategories();
    return (
        <ResuableContainer className="my-20">
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-2xl">Category</h2>
                <Link href="/products">
                    <Button variant="outline" className="rounded-full">
                        View All
                    </Button>
                </Link>
            </div>
            <div className="grid lg:grid-cols-6 md:grid-cols-3 gap-8 my-5">
                {
                    Array(12)
                        .fill(categories?.[0])
                        .map((category: ICategory, idx: number) => (
                            <CategoryCard key={idx} category={category} />
                        ))
                }
            </div>
        </ResuableContainer>
    )
};

export default Category;