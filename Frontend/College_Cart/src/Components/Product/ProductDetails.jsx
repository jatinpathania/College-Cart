import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../SagaRedux/Slice";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Skeleton from '@mui/material/Skeleton';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, isLoading, error } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(fetchProductDetails(id));
    }, [dispatch, id]);

    if (isLoading) {
        return (
            <>
                <Header />
                <div className="amazon-container">
                    <Skeleton variant="text" width={200} height={20} />
                    
                    <div className="product-grid">
                        <div className="image-column">
                            <div className="main-image-container">
                                <Skeleton variant="rectangular" width="100%" height={400} />
                            </div>
                        </div>
                        <div className="details-column">
                            <Skeleton variant="text" width="80%" height={32} />
                            <Skeleton variant="text" width={150} height={24} />
                            
                            <div className="price-block">
                                <Skeleton variant="text" width={100} height={40} /> 
                                <Skeleton variant="text" width={150} height={20} />
                                <Skeleton variant="text" width={120} height={16} />
                            </div>

                            <div className="delivery-info">
                                <Skeleton variant="text" width={200} height={24} />
                                <Skeleton variant="text" width={150} height={20} />
                            </div>

                            <div className="about-section">
                                <Skeleton variant="text" width={150} height={24} />
                                <Skeleton variant="text" width="100%" height={20} />
                                <Skeleton variant="text" width="100%" height={20} />
                                <Skeleton variant="text" width="80%" height={20} />
                            </div>
                        </div>
                        <div className="buy-box-column">
                            <div className="buy-box">
                                <Skeleton variant="text" width={120} height={32} /> 
                                <Skeleton variant="text" width={180} height={24} />
                                <Skeleton variant="text" width={200} height={20} />
                                <Skeleton variant="rectangular" width="100%" height={40} style={{ marginBottom: '10px', borderRadius: '20px' }} /> 
                                <Skeleton variant="rectangular" width="100%" height={40} style={{ borderRadius: '20px' }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{marginTop:'100px'}}>
                    <Footer />
                </div>
            </>
        );
    }
    return (
        <>
            <Header />
            <div className="amazon-container">
                <div className="breadcrumb">
                    {product?.product.category} {'>'} {product?.product.brand}
                </div>
                
                <div className="product-grid">
                    <div className="image-column">
                        <div className="main-image-container">
                            <img 
                                src={product?.product.image} 
                                alt={product?.product.name} 
                                className="main-product-image"
                            />
                            <div className="image-zoom-lens"></div>
                        </div>
                    </div>
                    <div className="details-column">
                        <h1 className="product-name">{product?.product.name}</h1>
                        <div className="brand-link">Visit the {product?.product.brand} Store</div>
                        
                        <div className="price-block">
                            <div className="price-section">
                                <span className="rupee-symbol">&#8377; </span>
                                <span className="current-price">{product?.product.newAmount}</span>
                            </div>
                            <div className="original-price">
                                M.R.P.: <span className="strikethrough">&#8377; {product?.product.prevAmount}</span>
                            </div>
                            <div className="inclusive-tax">Inclusive of all taxes</div>
                        </div>

                        <div className="delivery-info">
                            {product?.product.selectHostel === "Hostler" ? (
                                <div className="hostel-details">
                                    <div className="location-icon">&#128205;</div>
                                    <div>
                                        <div className="hostel-name">
                                            {product?.product.hostleName} Hostel
                                        </div>
                                        <div className="room-number">
                                            Room {product?.product.roomNumber}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="contact-details">
                                    <div className="phone-icon">&#128222;</div>
                                    <div className="contact-number">
                                        {product?.product.dayScholarContectNumber}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="about-section">
                            <h2>About this item</h2>
                            <div className="description-text">
                                {product?.product.description}
                            </div>
                        </div>
                    </div>
                    <div className="buy-box-column">
                        <div className="buy-box">
                            <div className="buy-box-price">
                                <span className="rupee-symbol">₹</span>
                                <span className="price-amount">{product?.product.newAmount}</span>
                            </div>
                            <div className="delivery-message">
                                Available for contact
                            </div>
                            <div className="seller-info">
                                Sold by: {product?.product.selectHostel === "Hostler" ? 
                                    `${product?.product.hostleName} Hostel - Room ${product?.product.roomNumber}` : 
                                    'Day Scholar'}
                            </div>
                            <button className="buy-now-button">
                                Buy Now
                            </button>
                            <button className="add-to-cart-button">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
           <div style={{marginTop:'100px'}}>
           <Footer />
           </div>
        </>
    );
};

export default ProductDetails;