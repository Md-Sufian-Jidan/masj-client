import { getAllProducts } from "@/services/productService";
import { ICategory } from "@/types";
import ResuableContainer from "@/components/ui/core/ResuableContainer";
import ProductBanner from "@/components/modules/products/banner";
import { getAllCategories } from "@/services/categoryService";
import CategoryCard from "@/components/ui/core/CategoryCard";
import AllProducts from "@/components/modules/products";

const AllProductsPage = async () => {
    const { data: categories } = await getAllCategories();
    const { data: products } = await getAllProducts();

    return (
        <ResuableContainer>
            <ProductBanner
                title="All Products"
                path="Home - Products"
            />

            <h2 className="text-xl font-bold my-5">Featured Collection </h2>
            <div className="grid lg:grid-cols-6 md:grid-cols-3 gap-6 my-5">
                {categories?.slice(0, 6).map((category: ICategory, idx: number) => (
                    <CategoryCard key={idx} category={category} />
                ))}
            </div>
            <AllProducts products={products} />
        </ResuableContainer>
    );
};

export default AllProductsPage;