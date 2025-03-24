import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './addproduct.css';
import Header from '../Header/Header';
import { productNew } from '../SagaRedux/Slice';
import MessageHandler from "../Signup/MessageHandler"

const AddProduct = () => {
    const dispatch = useDispatch();
    const { isLoading, error, message, product } = useSelector((state) => state.app);

    const PRODUCT_CATEGORIES = [
        "Electronics",
        // "Furniture",
        "Clothing",
        "Books",
        // "Stationary",
        "Sports Equipment",
        // "Miscellaneous"
        "Grocery"
    ];

    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: '',
        quantity:'',
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
        if (file) {
            if (file.type.startsWith('image/')) {
                setFormData(prevData => ({
                    ...prevData,
                    image: file
                }));

            } else {
                e.target.value = '';
            }
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
        if (message && message.includes('success')) {
            setFormData({
                name: '',
                brand: '',
                quantity:'',
                selectHostel: '',
                hostleName: '',
                roomNumber: '',
                dayScholarContectNumber: '',
                prevAmount: '',
                newAmount: '',
                image: null,
                description: ''
            });
            // const fileInput = document.querySelector('input[type="file"]');
            // if (fileInput) fileInput.value = '';
        }
        console.log(product)
    }, [message, product]);

    return (
        <>
            <Header />
            <div className="form-wrapper">
                <div className="form-container">
                    <h2 className="form-title">Add New Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Product Name*</label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter product name"
                            // required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Brand Name*</label>
                            <input
                                type="text"
                                name="brand"
                                className="form-input"
                                value={formData.brand}
                                onChange={handleChange}
                                placeholder="Enter brand name"
                            // required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Quantity*</label>
                            <input
                                type="number"
                                name="quantity"
                                className="form-input"
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder="Enter quantity"
                                min="1"
                            // required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Product Category*</label>
                            <select
                                name="category"
                                className="form-select"
                                value={formData.category}
                                onChange={handleChange}
                            // required
                            >
                                <option value="">Select Category</option>
                                {PRODUCT_CATEGORIES.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Select Option*</label>
                            <select
                                name="selectHostel"
                                className="form-select"
                                value={formData.selectHostel}
                                onChange={handleChange}
                            // required
                            >
                                <option value="">Select Category</option>
                                <option value="Hostler">Hostler</option>
                                <option value="Day_Scholar">Day Scholar</option>
                            </select>
                        </div>

                        {formData.selectHostel === 'Hostler' && (
                            <>
                                <div className="form-group">
                                    <label className="form-label">Hostel Name*</label>
                                    <select
                                        name="hostleName"
                                        className="form-select"
                                        value={formData.hostleName}
                                        onChange={handleChange}
                                    // required
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

                                <div className="form-group">
                                    <label className="form-label">Room Number*</label>
                                    <input
                                        type="text"
                                        name="roomNumber"
                                        className="form-input"
                                        value={formData.roomNumber}
                                        onChange={handleChange}
                                        placeholder="Enter room number"
                                    // required
                                    />
                                </div>
                            </>
                        )}

                        {formData.selectHostel === 'Day_Scholar' && (
                            <div className="form-group">
                                <label className="form-label">Contact Number*</label>
                                <input
                                    type="tel"
                                    name="dayScholarContectNumber"
                                    className="form-input"
                                    value={formData.dayScholarContectNumber}
                                    onChange={handleChange}
                                    placeholder="Enter contact number"
                                // required

                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">Buy Amount*</label>
                            <input
                                type="number"
                                name="prevAmount"
                                className="form-input"
                                value={formData.prevAmount}
                                onChange={handleChange}
                                placeholder="Enter previous amount"
                                min="10"
                            // required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Selling Amount*</label>
                            <input
                                type="number"
                                name="newAmount"
                                className="form-input"
                                value={formData.newAmount}
                                onChange={handleChange}
                                placeholder="Enter new amount"
                                min="10"
                            // required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Product Image*</label>
                            <input
                                type="file"
                                name="image"
                                className="form-input"
                                onChange={handleImageChange}
                                accept="image/*"
                            // required
                            />

                        </div>

                        <div className="form-group">
                            <label className="form-label">Description*</label>
                            <textarea
                                name="description"
                                className="form-textarea"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter product description"
                            // required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="submit-button"
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