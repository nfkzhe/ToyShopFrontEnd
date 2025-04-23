import { useRef } from 'react';
import ProductCard from './ProductCard';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Slider from 'react-slick';

const ProductSection = ({ products , title }) => {
    const sliderRef = useRef(null);
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false, // tắt nút mặc định
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="section-title">{title}</h2>

                {/* Nút điều hướng */}
                <div className="flex justify-between mb-4 gap-2">
                    <button
                        onClick={() => sliderRef.current?.slickPrev()}
                        className="p-2 bg-yellow-300 hover:bg-yellow-400 transition"
                    >
                        <BsArrowLeft className="text-xl text-yellow-800" />
                    </button>
                    <button
                        onClick={() => sliderRef.current?.slickNext()}
                        className="p-2 bg-yellow-300 hover:bg-yellow-400 transition"
                    >
                        <BsArrowRight className="text-xl text-yellow-800" />
                    </button>
                </div>

                {/* Slider hiển thị sản phẩm */}
                <Slider ref={sliderRef} {...settings} className="grid gap-6">
                    {products
                        .filter((product) => product.discount > 0)
                        .map((product) => (
                            <div key={product._id} className="px-2">
                                <ProductCard product={product} />
                            </div>
                        ))}
                </Slider>
            </div>
        </section>
    );
};

export default ProductSection;
