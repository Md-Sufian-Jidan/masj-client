import ProductBanner from "@/components/modules/products/banner"
import ProductDetails from "@/components/modules/products/productDetails";
import ResuableContainer from "@/components/ui/core/ResuableContainer"
import { getSingleProduct } from "@/services/productService";

const ProductDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const product = await getSingleProduct(id);

    return (
        <ResuableContainer>
            <ProductBanner
                title="Product Details"
                path="Home - Products"
            />
            <ProductDetails product={product} />
        </ResuableContainer>
    )
}

export default ProductDetailsPage