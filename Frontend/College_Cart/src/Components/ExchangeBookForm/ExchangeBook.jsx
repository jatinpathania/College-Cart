import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Header from "../Header/Header";
import styles from "./exchange.module.css";
import axios from 'axios';
import { getToken } from '../../util/tokenService';
import toast, { Toaster } from 'react-hot-toast';

const ExchangeBook = () => {
  const backend_url = import.meta.env.VITE_BACKEND_API_URL;

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
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.formContainer}>
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
                    required: 'Contact number is required' 
                  })}
                  type="tel"
                  placeholder="Enter contact number"
                />
                {errors.dayScholarContectNumber && <span className={styles.error}>{errors.dayScholarContectNumber.message}</span>}
              </div>
            )}

            <div className={styles.formGroup}>
              <label>Book Description</label>
              <textarea
                {...register('description', { 
                  required: 'Description is required' 
                })}
                placeholder="Describe the book's condition, edition, etc."
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
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      onChange(e.target.files ? e.target.files[0] : null);
                    }}
                  />
                )}
              />
              {errors.image && <span className={styles.error}>{errors.image.message}</span>}
            </div>

            <button type="submit" className={styles.submitButton}>
              Add Book for Exchange
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ExchangeBook;