import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { getAllCategories } from '~/untils/ApiHelper';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
const CategorySection = () => {
    const [categories, setCategories] = useState([]);
    const sliderRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllCategories();
                if (response && response.data) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const settings = {
        infinite: true,
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
        <section className="py-12 bg-yellow-50">
            <div className="container mx-auto px-4">
                <h2 className="section-title">Danh mục sản phẩm</h2>

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

                <Slider ref={sliderRef} {...settings}>
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            onClick={() => navigate(`/products?category=${category._id}`)}
                            className="px-2 cursor-pointer"
                        >
                            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-center p-4">
                                <img
                                    src={category.image || '/placeholder.svg'}
                                    alt={category.CateName}
                                    className="w-24 h-24 mx-auto mb-4"
                                />
                                <h3 className="text-xl font-semibold text-yellow-800 mb-2">{category.CateName}</h3>
                                <p className="text-gray-600">{category.description}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default CategorySection;
