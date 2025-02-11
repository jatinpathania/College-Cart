import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../SagaRedux/Slice";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, isLoading, error } = useSelector((state) => state.app);
    useEffect(() => {
        dispatch(fetchProductDetails(id));
    }, [dispatch, id]);

    return (
        <><Header/>
        <div>
            <h2>{product?.product.name}</h2>
            <p>{product?.product.description}</p>
            <p>Price: ${product?.product.price}</p>
            <img src={product?.product.image} alt={product?.product.name} width="200" />
        </div>
        <Footer/>
        </>
    );
};

export default ProductDetails;
