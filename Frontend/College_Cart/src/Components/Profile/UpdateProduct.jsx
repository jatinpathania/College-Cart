import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getToken } from '../../util/tokenService';
import './updateProduct.css';

const backend_url = import.meta.env.VITE_BACKEND_API_URL;

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

const UpdateProduct = ({ isOpen, onClose, productData }) => {

  if (!isOpen) return null;
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    quantity:'',
    category: '',
    selectHostel: '',
    hostleName: '',
    roomNumber: '',
    dayScholarContectNumber: '',
    prevAmount: '',
    newAmount: '',
    description: ''
  });

  useEffect(() => {
    if (productData) {
      setFormData({
        name: productData.name || '',
        brand: productData.brand || '',
        quantity: productData.quantity || '',
        category: productData.category || '',
        selectHostel: productData.selectHostel || '',
        hostleName: productData.hostleName || '',
        roomNumber: productData.roomNumber || '',
        dayScholarContectNumber: productData.dayScholarContectNumber || '',
        prevAmount: productData.prevAmount || '',
        newAmount: productData.newAmount || '',
        description: productData.description || ''
      });
      setImagePreview(productData.image || '');
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const token = getToken();
    
    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

    const response =  await axios.put(`${backend_url}/${productData._id}/product-update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success(response.data.message);
      onClose();
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error.response?.data?.message || "Error during product update");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Update Product</h2>
        
        <form onSubmit={handleUpdateProduct} className="form-container">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="inputColorText"
              required
            />
          </div>

          <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="inputColorText"
              required
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="Number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="inputColorText"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="inputColorText"
              required
            >
              <option value="">Select Category</option>
              {PRODUCT_CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Student Type</label>
            <select
              name="selectHostel"
              value={formData.selectHostel}
              onChange={handleChange}
              className="inputColorText"
              required
            >
              <option value="">Select Type</option>
              <option value="Hostler">Hostler</option>
              <option value="Day_Scholar">Day Scholar</option>
            </select>
          </div>

          {formData.selectHostel === 'Hostler' ? (
            <>
              <div className="form-group">
                <label>Hostel Name</label>
                <select
                  name="hostleName"
                  value={formData.hostleName}
                  onChange={handleChange}
                  className="inputColorText"
                  required
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
                <label>Room Number</label>
                <input
                  type="text"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  className="inputColorText"
                  required
                />
              </div>
            </>
          ) : formData.selectHostel === 'Day Scholar' ? (
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="text"
                name="dayScholarContectNumber"
                value={formData.dayScholarContectNumber}
                onChange={handleChange}
                className="inputColorText"
                required
              />
            </div>
          ) : null}

          <div className="form-group">
            <label>Buy Amount</label>
            <input
              type="number"
              name="prevAmount"
              value={formData.prevAmount}
              onChange={handleChange}
              className="inputColorText"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Selling Amount</label>
            <input
              type="number"
              name="newAmount"
              value={formData.newAmount}
              onChange={handleChange}
              className="inputColorText"
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label>Product Image</label>
            <div className="image-upload-container">
              {imagePreview && (
                <img 
                  src={imagePreview} 
                  alt="Product preview" 
                  className="image-preview"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="image-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="inputColorText"
              required
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="update-button"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;