import React, { useContext,useState,useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Header from "../Header/Header";
import styles from "./exchange.module.css";
import axios from 'axios';
import { getToken } from '../../util/tokenService';
import toast, { Toaster } from 'react-hot-toast';
import { UserDataContext } from '../Header/context';

const ExchangeBook = () => {
  const backend_url = import.meta.env.VITE_BACKEND_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=>{
    window.scrollTo(0, 0); 
  },[])

  const hostelOptions = [
    "Boss", 
    "Aryabhata", 
    "Sarabhai", 
    "Kalpana", 
    "Gargi", 
    "Teresa", 
    "New girls hostel"
  ];

  const { control, register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      selectHostel: '',
      hostleName: '',
      roomNumber: '',
      dayScholarContectNumber: '',
      description: '',
      image: null
    }
  });

  const selectHostel = watch('selectHostel');

  const onSubmit = async (data) => {
    setIsLoading(true);
    const submitData = new FormData();
    submitData.append('name', data.name);
    submitData.append('selectHostel', data.selectHostel);
    submitData.append('description', data.description);
    
    if (data.image) {
      submitData.append('image', data.image);
    }

    if (data.selectHostel === 'Hostler') {
      submitData.append('hostleName', data.hostleName || '');
      submitData.append('roomNumber', data.roomNumber || '');
    }

    if (data.selectHostel === 'Day_Scholar') {
      submitData.append('dayScholarContectNumber', data.dayScholarContectNumber || '');
    }

    try {
      const token = getToken();
      const response = await axios.post(`${backend_url}/create`, submitData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success(response.data.message);
      reset();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.response?.data?.message || 'Product creating Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header hideSearch/>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>List Your Book for Exchange</h2>
          <p className={styles.formDescription}>
            Fill out the details below to add your book to our exchange platform.
            Your information will only be visible to verified campus members.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Book Name</label>
              <input
                {...register('name', { 
                  required: 'Book name is required' 
                })}
                placeholder="Enter book name"
              />
              {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Are you a Hostler or Day Scholar?</label>
              <Controller
                name="selectHostel"
                control={control}
                rules={{ required: 'Select hostel type' }}
                render={({ field }) => (
                  <select {...field}>
                    <option value="">Select Type</option>
                    <option value="Hostler">Hostler</option>
                    <option value="Day_Scholar">Day Scholar</option>
                  </select>
                )}
              />
              {errors.selectHostel && <span className={styles.error}>{errors.selectHostel.message}</span>}
            </div>

            {selectHostel === 'Hostler' && (
              <>
                <div className={styles.formGroup}>
                  <label>Hostel Name</label>
                  <Controller
                    name="hostleName"
                    control={control}
                    rules={{ required: 'Hostel name is required' }}
                    render={({ field }) => (
                      <select {...field}>
                        <option value="">Select Hostel</option>
                        {hostelOptions.map(hostel => (
                          <option key={hostel} value={hostel}>{hostel}</option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.hostleName && <span className={styles.error}>{errors.hostleName.message}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>Room Number</label>
                  <input
                    {...register('roomNumber', { 
                      required: 'Room number is required' 
                    })}
                    placeholder="Enter room number"
                  />
                  {errors.roomNumber && <span className={styles.error}>{errors.roomNumber.message}</span>}
                </div>
              </>
            )}

            {selectHostel === 'Day_Scholar' && (
              <div className={styles.formGroup}>
                <label>Contact Number</label>
                <input
                  {...register('dayScholarContectNumber', { 
                    required: 'Contact number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Please enter a valid 10-digit phone number'
                    }
                  })}
                  type="tel"
                  placeholder="Enter contact number"
                />
                {errors.dayScholarContectNumber && (
                  <span className={styles.error}>{errors.dayScholarContectNumber.message}</span>
                )}
              </div>
            )}

            <div className={styles.formGroup}>
              <label>Book Description</label>
              <textarea
                {...register('description', { 
                  required: 'Description is required',
                  minLength: {
                    value: 30,
                    message: 'Description should be at least 30 characters'
                  }
                })}
                placeholder="Describe the book's condition, edition, author, etc."
              />
              {errors.description && <span className={styles.error}>{errors.description.message}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Book Image</label>
              <Controller
                name="image"
                control={control}
                rules={{ required: 'Book image is required' }}
                render={({ field: { onChange } }) => (
                  <div className={styles.fileInputContainer}>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={(e) => {
                        onChange(e.target.files ? e.target.files[0] : null);
                      }}
                      className={styles.fileInput}
                    />
                    <label htmlFor="image-upload" className={styles.fileInputLabel}>
                      Choose a photo...
                    </label>
                  </div>
                )}
              />
              {errors.image && <span className={styles.error}>{errors.image.message}</span>}
            </div>

            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? (
                <span className={styles.buttonLoading}>
                  <span className={styles.spinner}></span>
                  Processing...
                </span>
              ) : (
                'List My Book for Exchange'
              )}
            </button>
          </form>
        </div>
      </div>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Exchange Your Books</h1>
          <p className={styles.heroSubtitle}>
            Connect with fellow students to trade textbooks and save money!
          </p>
          <div className={styles.heroBenefits}>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>📚</span>
              <span>Find the books you need</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>💰</span>
              <span>Save up to 70% on textbooks</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>🤝</span>
              <span>Trade with trusted campus members</span>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </>
  );
};

export default ExchangeBook;