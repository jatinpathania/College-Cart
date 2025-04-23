import React, { useState,useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './addproduct.module.css';
import Header from '../Header/Header';
import { productNew } from '../SagaRedux/Slice';
import MessageHandler from "../Signup/MessageHandler"

const AddProduct = () => {
    const dispatch = useDispatch();

    const { isLoading, error, message, product } = useSelector((state) => state.app);

    const PRODUCT_CATEGORIES = [
        "Electronics",
        "Clothing",
        "Books",
        "Sports Equipment",
        "Grocery"
    ];

    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: '',
        quantity: '',
        selectHostel: '',
        hostleName: '',
        roomNumber: '',
        dayScholarContectNumber: '',
        prevAmount: '',
        newAmount: '',
        image: null,
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setFormData(prevData => ({
                ...prevData,
                image: file
            }));
        } else {
            e.target.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productFormData = new FormData();
        Object.keys(formData).forEach(key => {
            if (key !== 'image') {
                productFormData.append(key, formData[key]);
            }
        });
        productFormData.append('image', formData.image);
        dispatch(productNew(productFormData));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (message && message.includes('success')) {
            setFormData({
                name: '',
                brand: '',
                quantity: '',
                selectHostel: '',
                hostleName: '',
                roomNumber: '',
                dayScholarContectNumber: '',
                prevAmount: '',
                newAmount: '',
                image: null,
                description: ''
            });
        }
        console.log(product)
    }, [message, product]);

    return (
        <>
            <Header hideSearch/>
            <div className={styles["form-wrapper"]}>
            <h1 className={styles.pageHeading}>Your First Step Towards Selling!  Start Selling Today</h1>
                <div className={styles["form-container"]}>
                    <h2 className={styles["form-title"]}>Add New Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>Product Name*</label>
                            <input
                                type="text"
                                name="name"
                                className={styles["form-input"]}
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter product name"
                            />
                        </div>

                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>Brand Name*</label>
                            <input
                                type="text"
                                name="brand"
                                className={styles["form-input"]}
                                value={formData.brand}
                                onChange={handleChange}
                                placeholder="Enter brand name"
                            />
                        </div>

                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>Quantity*</label>
                            <input
                                type="number"
                                name="quantity"
                                className={styles["form-input"]}
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder="Enter quantity"
                                min="1"
                            />
                        </div>

                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>Product Category*</label>
                            <select
                                name="category"
                                className={styles["form-select"]}
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select Category</option>
                                {PRODUCT_CATEGORIES.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>Select Option*</label>
                            <select
                                name="selectHostel"
                                className={styles["form-select"]}
                                value={formData.selectHostel}
                                onChange={handleChange}
                            >
                                <option value="">Select Category</option>
                                <option value="Hostler">Hostler</option>
                                <option value="Day_Scholar">Day Scholar</option>
                            </select>
                        </div>

                        {formData.selectHostel === 'Hostler' && (
                            <>
                                <div className={styles["form-group"]}>
                                    <label className={styles["form-label"]}>Hostel Name*</label>
                                    <select
                                        name="hostleName"
                                        className={styles["form-select"]}
                                        value={formData.hostleName}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Hostel</option>
                                        <option value="Boss">Boss</option>
                                        <option value="Aryabhata">Aryabhata</option>
                                        <option value="Sarabhai">Sarabhai</option>
                                        <option value="Kalpana">Kalpana</option>
                                        <option value="Gargi">Gargi</option>
                                        <option value="Teresa">Teresa</option>
                                        <option value="New girls hostel">New girls hostel</option>
                                    </select>
                                </div>

                                <div className={styles["form-group"]}>
                                    <label className={styles["form-label"]}>Room Number*</label>
                                    <input
                                        type="text"
                                        name="roomNumber"
                                        className={styles["form-input"]}
                                        value={formData.roomNumber}
                                        onChange={handleChange}
                                        placeholder="Enter room number"
                                    />
                                </div>
                            </>
                        )}

                        {formData.selectHostel === 'Day_Scholar' && (
                            <div className={styles["form-group"]}>
                                <label className={styles["form-label"]}>Contact Number*</label>
                                <input
                                    type="tel"
                                    name="dayScholarContectNumber"
                                    className={styles["form-input"]}
                                    value={formData.dayScholarContectNumber}
                                    onChange={handleChange}
                                    placeholder="Enter contact number"
                                />
                            </div>
                        )}

                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>Buy Amount*</label>
                            <input
                                type="number"
                                name="prevAmount"
                                className={styles["form-input"]}
                                value={formData.prevAmount}
                                onChange={handleChange}
                                placeholder="Enter previous amount"
                                min="10"
                            />
                        </div>

                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>Selling Amount*</label>
                            <input
                                type="number"
                                name="newAmount"
                                className={styles["form-input"]}
                                value={formData.newAmount}
                                onChange={handleChange}
                                placeholder="Enter new amount"
                                min="10"
                            />
                        </div>

                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>Product Image*</label>
                            <input
                                type="file"
                                name="image"
                                className={styles["form-input"]}
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </div>

                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>Description*</label>
                            <textarea
                                name="description"
                                className={styles["form-textarea"]}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter product description"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className={styles["submit-button"]}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Adding Product...' : 'Add Product'}
                        </button>
                    </form>
                </div>
            </div>
            <MessageHandler />
        </>
    );
};

export default AddProduct;
