import React, { useState, useEffect, useContext } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { UserDataContext } from '../Header/context';
import { useNavigate } from 'react-router-dom';
import toast, {Toaster}  from 'react-hot-toast';

const Setting = () => {
  const backend_url = import.meta.env.VITE_BACKEND_API_URL;
  const [allRequests, setAllRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data } = useContext(UserDataContext);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllRequests = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${backend_url}/allrequest`);
        const filterLoginUser = res.data.allRequest.filter(
          (user) => user.approvedBookForUser.userId === data._id
        );
        setAllRequests(filterLoginUser);
        console.log(filterLoginUser)
        setIsLoading(false);
      } catch (error) {
        console.log("Failed to load requests");
        setIsLoading(false);
      }
    };

    fetchAllRequests();
  }, [data._id, backend_url]);

  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'approve':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancel':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const deleteRequesthandle=async(requestId)=>{
    try {
      const response = await axios.delete(`${backend_url}/${requestId}/deleteRequest`)
      toast.success("Request delete successful")
    } catch (error) {
      console.log("Error",error)
      toast.error("Request during error")
    }
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Book Exchange Requests</h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : allRequests.length === 0 ? (
          <div className="bg-gray-100 rounded-lg p-6 text-center">
            <p className="text-lg text-gray-600">You don't have any book exchange requests yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allRequests.map((request) => (
              <div key={request._id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      {request.bookName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Request ID: {request._id.substring(0, 8)}...
                    </p>
                  </div>
                  <div className="font-medium">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(request.approvedStatus)}`}>
                      {request.approvedStatus}
                    </span>
                  </div>
                </div>

                <div>
                  {
                   request.approvedUserByBook.selectOption === "Hostler" && (
                      <>
                      <p className="text-sm text-gray-500">User: {request.approvedUserByBook.selectOption}</p>
                    <p className="text-sm text-gray-500">Room Number: {request.approvedUserByBook.roomNumber}</p>
                    <p className="text-sm text-gray-500">Hostle Name: {request.approvedUserByBook.hostleName}</p>
                      </>
                    )
                  }
                  {
                    request.approvedUserByBook.selectOption === "Day_Scholar" && (
                <>  <p className="text-sm text-gray-500">User: {request.approvedUserByBook.selectOption}</p>
                  <p className="text-sm text-gray-500">Contect Number: {request.approvedUserByBook.dayScholarContectNumber}</p>
                </> )
                  }
                  </div>

                <div className="mt-4 text-sm text-gray-600 flex justify-between">
                  <p>Approved Date: {new Date(request.createdAt).toLocaleDateString()}</p>
                  <button onClick={()=>navigate("/all-products-exchange-books")} className='font-bold bg-black p-2 w-[100px] text-white hover:bg-gray-900'>Book</button>
                </div>

                {
                  request.approvedStatus === 'Cancel' ? (
                         <div className='flex'>
              <p className='mt-4 text-sm text-gray-600'>This book again request try before delete this request <span onClick={()=>deleteRequesthandle(request._id)} className='mt-4 text-sm text-red-600 cursor-pointer underline hover:text-red-600'>Delete.</span></p>
            </div>
                   ):(
                    <div className='flex'>
                    <p className='mt-4 text-sm text-gray-600'>This book delete the after read <span onClick={()=>deleteRequesthandle(request._id)} className='mt-4 text-sm text-red-600 cursor-pointer underline hover:text-red-600'>Delete.</span></p>
                  </div>
                   )
                }                 
              </div>
              
            ))}
          </div>
          
        )}
      </div>
      <Toaster/>
    </>
  );
};
export default Setting;