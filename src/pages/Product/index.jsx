import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { getProductDetail } from '~/untils/ApiHelper';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import ProductDescription from '~/components/Product/productDescription';
import ZoomLens from '~/components/Product/ZoomLens';
import { useCart } from '../../contexts/CartContext';
const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProducts] = useState([]);
    const { id } = useParams();
    const [image, setImage] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);
    const { addToCart } = useCart();

    let VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product, quantity); // Thêm sản phẩm vào giỏ hàng
        console.log(`Sản phẩm ${product.ProductName} đã được thêm vào giỏ hàng!`);
    };

    const getDetail = useCallback(async () => {
        try {
            const response = await getProductDetail(id);
            if (response && response.data) {
                setProducts(response.data);
                setImage(response.data.image[0]);
            }
        } catch (e) {
            console.log(e);
        }
    }, [id]);

    useEffect(() => {
        getDetail();
        return () => {}; // cleanup
    }, [getDetail]);

    const handleQuantityChange = (event) => {
        const newQuantity = event.target.value;
        if (!isNaN(newQuantity) && newQuantity > 0) {
            setQuantity(Number(newQuantity));
        }
    };

    const incrementQuantity = () => {
        if (quantity >= product.ProductQuantity) {
            setQuantity(product.ProductQuantity);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const handleChooseImg = (item) => {
        setImage(item);
    };
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div>
            <div className="container mx-auto px-4 py-6 bg-white shadow-md">
                <div className="product-item d-flex flex-row row">
                    <div className="col-lg-6">
                        <div className="mt-0">
                            {!isMobile ? (
                                // 👉 Hiển thị slider và nút khi KHÔNG phải mobile
                                <div className="d-flex row align-items-center">
                                    <div className="lg-6">
                                        <ZoomLens src={image ? image : product.image[0]} zoom={2.5} aspectRatio={1} />
                                    </div>

                                    <Slider
                                        ref={sliderRef}
                                        arrows={false}
                                        dots={false}
                                        infinite={false}
                                        speed={400}
                                        slidesToShow={4}
                                        slidesToScroll={1}
                                        afterChange={(index) => setCurrentIndex(index)}
                                    >
                                        {product.image?.map((img, index) => (
                                            <div className="col" key={index}>
                                                <img
                                                    alt={`thumb-${index}`}
                                                    className="w-20 h-20"
                                                    src={img}
                                                    style={{
                                                        maxHeight: 100,
                                                        maxWidth: 100,
                                                        marginRight: 10,
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => handleChooseImg(img)}
                                                />
                                            </div>
                                        ))}
                                    </Slider>

                                    <div className="col-lg-6 mx-auto">
                                        <button
                                            onClick={() => {
                                                const prevIndex =
                                                    (currentIndex - 1 + product.image.length) % product.image.length;
                                                setCurrentIndex(prevIndex);
                                                handleChooseImg(product.image[prevIndex]);
                                                sliderRef.current.slickPrev();
                                            }}
                                            className="btn me-4"
                                        >
                                            <BsArrowLeft />
                                        </button>
                                        <button
                                            onClick={() => {
                                                const nextIndex = (currentIndex + 1) % product.image.length;
                                                setCurrentIndex(nextIndex);
                                                handleChooseImg(product.image[nextIndex]);
                                                sliderRef.current.slickNext();
                                            }}
                                            className="btn"
                                        >
                                            <BsArrowRight />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <ZoomLens src={image ? image : product.image[0]} zoom={2.5} aspectRatio={1} />
                            )}
                        </div>
                    </div>
                    <div className="col-lg-6 relative">
                        <h2 className="text-2xl font-bold">{product.ProductName}</h2>
                        <div className="d-flex align-items-center mt-2">
                            <span className="rating text-primary">★★★★☆</span>
                            <span className="rating ml-2 text-gray-600"> (0 Reviews)</span>
                        </div>
                        <div className="d-flex align-items-center mt-1">
                            <span className="ml-2 text-gray-600">Mã SP: {product._id}</span>
                        </div>
                        <div className="d-flex align-items-center mt-1">
                            <span className="ml-2 font-bold text-black">Đã bán : {product.sold}</span>
                        </div>
                        <ProductDescription text={product.ProductDes} />
                        <p className="mt-1 price">Giá:{VND.format(product.ProductPrice)}</p>
                        <div className="mt-0">
                            <label className="block text-gray-700" htmlFor="quantity">
                                Sẵn có : {product.ProductQuantity}
                            </label>
                            <div className="input-group">
                                <button className="btn btn-danger" onClick={decrementQuantity}>
                                    -
                                </button>
                                <input
                                    className="w-25"
                                    id="quantity"
                                    name="quantity"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                />
                                <button className="btn btn-success" onClick={incrementQuantity}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 d-flex flex-row">
                            <button className="btn btn-primary" onClick={handleAddToCart}>
                                Thêm vào giỏ hàng <AiOutlineShoppingCart />
                            </button>
                        </div>
                        <div className="mt-4">
                            <ul className="list-group flex-row overflow-auto" style={{ gap: 8, flexWrap: 'nowrap' }}>
                                {[1, 2, 3, 4].map((i) => (
                                    <li key={i} className="list-group-item p-1 border-0">
                                        <img
                                            src={`/assets/images/card${i}.jpg`}
                                            alt={`card${i}`}
                                            width="60"
                                            height="40"
                                            style={{ objectFit: 'cover', borderRadius: 4 }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
