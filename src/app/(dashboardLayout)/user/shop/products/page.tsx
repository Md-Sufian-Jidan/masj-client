import ManageProducts from "@/components/modules/shop/product";
import { getAllProducts } from "@/services/productService";


const ManageProductsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ page: string }>;
}) => {
    const { page } = await searchParams;
    const { data, meta } = await getAllProducts(page, "2"); // limit is sending statically TODO: make it dynamic

    return (
        <div>
            <ManageProducts products={data} meta={meta} />
        </div>
    );
};

export default ManageProductsPage;