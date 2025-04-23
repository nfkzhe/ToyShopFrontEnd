import HeroSection from '~/components/HeroSection';
import CategorySection from '~/components/CategorySection';
import Testimonials from '~/components/Testimonials';
import Newsletter from '~/components/Newsletter';
import { useEffect, useState } from 'react';
import { getDiscountedProducts, getFeaturedProducts, getTopSold} from '~/untils/ApiHelper';
import { Helmet } from 'react-helmet-async';
import ProductSection from '~/components/ProductSection';

const HomePage = () => {
    // Lọc sản phẩm nổi bật
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [discountedProducts, setDiscountedProducts] = useState([])
    const [bestSeller, setBestSeller] = useState([])
    const fetchFeaturedProducts = async () => {
        try {
            const response = await getFeaturedProducts();
            if (response && response.data) {
                setFeaturedProducts(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const fetchDiscountedProducts = async () => {
        try {
            const response = await getDiscountedProducts();
            if (response && response.data) {
                setDiscountedProducts(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const fetchBestSellerpRoducts = async () => {
        try{
            const response = await getTopSold();
            if(response && response.data) {
                setBestSeller(response.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchFeaturedProducts();
        fetchDiscountedProducts();
        fetchBestSellerpRoducts();
    }, []);
    console.log("featured" , featuredProducts)
    return (
        <div>
            <Helmet>
                <title>Trang chủ | RAPTOYS</title>
                <meta name="description" content="Khám phá đồ chơi chất lượng cao cho mọi lứa tuổi tại RAPTOYS." />
                <meta name="keywords" content="đồ chơi, toyshop, raptoys, đồ chơi trẻ em, cửa hàng đồ chơi" />
            </Helmet>
            <HeroSection />
            <CategorySection />
            <ProductSection products={featuredProducts} title="Sản phẩm nổi bật"/>
            <ProductSection products={discountedProducts} title="Sản phẩm đang giảm giá" />
            <ProductSection products={bestSeller} title={"Sản phẩm đang bán chạy"} />
            <Testimonials />
            <Newsletter />
        </div>
    );
};

export default HomePage;
