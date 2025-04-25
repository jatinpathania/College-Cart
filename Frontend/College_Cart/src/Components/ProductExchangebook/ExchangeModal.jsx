import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios'; 
import toast,{Toaster} from "react-hot-toast"

const ExchangeModal = ({ isOpen, onClose, bookData, userData }) => {
  // console.log(bookData.userId._id,bookData.userId.name,userData._id, userData.name)
  const [selectOption, setSelectOption] = useState('');
  const [hostleName, setHostleName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [dayScholarContactNumber, setDayScholarContactNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const backend_url = import.meta.env.VITE_BACKEND_API_URL;

  // console.log(bookData)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectOption) {
      toast.error('Please select an option');
      return;
    }

    if (selectOption === 'Hostler' && (!hostleName || !roomNumber)) {
      toast.error('Hostel name and room number are required for hostlers');
      return;
    }

    if (selectOption === 'Day_Scholar' && !dayScholarContactNumber) {
      toast.error('Contact number is required for day scholars');
      return;
    }
    if(selectOption === 'Day_Scholar' && dayScholarContactNumber.length!=10){
      toast.error('Contact number is required for day scholars correct phone number add');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        sealUser:{ userId:bookData.userId._id,
          userName:bookData.userId.name,
          dayScholarContectNumber:bookData.dayScholarContectNumber || "",
          selectOption:bookData.selectHostel,roomNumber:bookData.roomNumber || "",
          hostleName:bookData.hostleName },
        buyUser: { userId: userData._id, userName:userData.name },
        selectOption,
        hostleName,
        roomNumber,
        dayScholarContectNumber: dayScholarContactNumber
      };

      const response = await axios.post(`${backend_url}/${bookData._id}/order-create-book-exchange`, payload);

      // if (response.data) { 
        toast.success('Exchange order placed successfully!');
        onClose();
      //   return;
      // }
     
    } catch (error) {
      console.error('Error submitting exchange order:', error);
      toast.error(error.response?.data?.message || 'Failed to submit exchange order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Exchange Book: {bookData.name}</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full w-8"
          >
            <X size={20} />
          </button>
        </div>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Option*
            </label>
            <select 
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              value={selectOption}
              onChange={(e) => setSelectOption(e.target.value)}
              // required
            >
              <option value="">Select Option</option>
              <option value="Hostler">Hostler</option>
              <option value="Day_Scholar">Day Scholar</option>
            </select>
          </div>

          {selectOption === "Hostler" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Hostel Name*
                </label>
                <select 
                  className="shadow border rounded w-full py-2 px-3 text-gray-700"
                  name="hostleName" 
                  value={hostleName}
                  onChange={(e) => setHostleName(e.target.value)}
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
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Room Number*
                </label>
                <input 
                  type="text" 
                  className="shadow border rounded w-full py-2 px-3 text-gray-700"
                  placeholder="Enter your room number" 
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  // required
                />
              </div>
            </>
          )}

          {selectOption === "Day_Scholar" && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contact Number*
              </label>
              <input 
                type="text" 
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Enter your contact number" 
                value={dayScholarContactNumber}
                onChange={(e) => setDayScholarContactNumber(e.target.value)}
               
                // required
              />
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Exchange Request'}
            </button>
          </div>
        </form>
      </div>
      
    </div><Toaster/>
    </>
    
  );
};

export default ExchangeModal;