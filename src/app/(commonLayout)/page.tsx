import Category from "@/components/modules/home/category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import HeroSection from "@/components/modules/home/HeroSection";
import TopBrands from "@/components/modules/home/TopBrands";

const HomePage = () => {
    return (
        <div className="my-6 container mx-auto">
            <HeroSection />
            <Category />
            <FeaturedProducts />
            <TopBrands />
        </div>
    );
};

export default HomePage;