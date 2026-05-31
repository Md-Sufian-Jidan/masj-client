import UpdateProductForm from "@/components/modules/shop/product/UpdateProductForm";
import { getSingleProduct } from "@/services/productService";

const UpdateProductPage = async (
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const { data: product } = await getSingleProduct(id);

    return (
        <div className="flex justify-between items-center mb-6">
            <UpdateProductForm product={product} />
        </div>
    )
}

export default UpdateProductPage;