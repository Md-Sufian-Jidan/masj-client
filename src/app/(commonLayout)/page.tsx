import Category from "@/components/modules/home/category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import HeroSection from "@/components/modules/home/HeroSection";

const HomePage = () => {
    return (
        <div className="my-6 container mx-auto">
            <HeroSection />
            <Category />
            <FeaturedProducts />
        </div>
    );
};

export default HomePage;