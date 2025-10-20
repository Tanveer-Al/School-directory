import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AddSchool = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('email', data.email);
    if (data.image[0]) formData.append('image', data.image[0]);

    try {
      await axios.post('http://localhost:5000/api/schools', formData);
      alert('School added successfully!');
      navigate('/show-schools');
      reset();
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error adding school. Please try again.';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 sm:p-4">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Add School</h2>
        
        {submitError && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {submitError}
          </div>
        )}
        
        <div className="mb-3 sm:mb-4">
          <label className="block text-sm font-medium mb-1">🏫 School Name</label>
          <input 
            {...register('name', { required: 'Name is required' })} 
            placeholder="Enter school name" 
            className="w-full p-2 sm:p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            aria-label="School Name"
          />
          {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name.message}</p>}
        </div>
        
        <div className="mb-3 sm:mb-4">
          <label className="block text-sm font-medium mb-1">📍 Address</label>
          <input 
            {...register('address', { required: 'Address is required' })} 
            placeholder="Enter address" 
            className="w-full p-2 sm:p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            aria-label="Address"
          />
          {errors.address && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.address.message}</p>}
        </div>
        
        <div className="mb-3 sm:mb-4">
          <label className="block text-sm font-medium mb-1">🏙️ City</label>
          <input 
            {...register('city', { required: 'City is required' })} 
            placeholder="Enter city" 
            className="w-full p-2 sm:p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            aria-label="City"
          />
          {errors.city && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.city.message}</p>}
        </div>
        
        <div className="mb-3 sm:mb-4">
          <label className="block text-sm font-medium mb-1">📧 Email</label>
          <input 
            {...register('email', { 
              required: 'Email is required', 
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' } 
            })} 
            placeholder="Enter email (e.g., school@example.com)" 
            className="w-full p-2 sm:p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            aria-label="Email"
          />
          {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email.message}</p>}
        </div>
        
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium mb-1">🖼️ School Image</label>
          <input 
            type="file" 
            {...register('image')} 
            accept="image/*" 
            className="w-full p-2 sm:p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            aria-label="School Image"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full bg-blue-500 text-white p-2 sm:p-3 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Adding...' : 'Add School'}
        </button>
      </form>
    </div>
  );
};

export default AddSchool;
