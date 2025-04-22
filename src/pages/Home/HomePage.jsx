import HeroSection from '~/components/HeroSection';
import CategorySection from '~/components/CategorySection';
import FeaturedProducts from '~/components/FeaturedProducts';
import Testimonials from '~/components/Testimonials';
import Newsletter from '~/components/Newsletter';
import { useEffect, useState } from 'react';
import { getAllProduct, getTopSold } from '~/untils/ApiHelper';
import DiscountProduct from '~/components/DiscountProduct';

const HomePage = () => {
    // Lọc sản phẩm nổi bật
    const [products, setProduct] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await getAllProduct();
            if (response && response.data) {
                setProduct(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
        return () => {}; // cleanup
    }, []);
    const featuredProducts = products.filter((product) => product.featured);
    console.log(featuredProducts)
    return (
        <div>
            <HeroSection />
            <CategorySection />
            <FeaturedProducts products={featuredProducts} />
            <DiscountProduct products={featuredProducts}/>
            <Testimonials />
            <Newsletter />
        </div>
    );
};

export default HomePage;
