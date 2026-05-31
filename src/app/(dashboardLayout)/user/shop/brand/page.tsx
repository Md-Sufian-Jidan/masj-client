import ManageBrands from "@/components/modules/shop/brand";
import { getAllBrands } from "@/services/brandService";

const ProductBrandPage = async () => {
    const { data, meta } = await getAllBrands();
    return (
        <div>
            <ManageBrands brands={data} />
        </div>
    );
};

export default ProductBrandPage;