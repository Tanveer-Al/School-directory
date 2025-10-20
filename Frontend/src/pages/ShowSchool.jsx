import { useEffect, useState } from 'react';
import axios from 'axios';

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSchools = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/schools');
      setSchools(response.data);
    } catch (err) {
      setError('Failed to load schools. Please check your connection and try again.');
      console.error('Error fetching schools:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const handleRetry = () => {
    fetchSchools();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading schools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center bg-white p-6 rounded-lg shadow-md max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={handleRetry} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            aria-label="Retry loading schools"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Schools</h2>
        <button 
          onClick={handleRetry} 
          className="bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-blue-600 transition-colors text-sm"
          aria-label="Refresh schools list"
        >
          Refresh
        </button>
      </div>
      {schools.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No schools found. Add some schools first!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {schools.map((school) => (
            <div key={school.id} className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img 
                src={school.image_path ? `http://localhost:5000/schoolImages/${school.image_path}` : '/placeholder-image.png'} 
                alt={`Image of ${school.name}`} 
                className="w-full h-32 sm:h-40 md:h-48 object-cover rounded mb-3 sm:mb-4" 
                onError={(e) => { e.target.src = '/placeholder-image.png'; }} // Fallback image
              />
              <h3 className="text-base sm:text-lg font-semibold mb-2">{school.name}</h3>
              <p className="text-gray-600 text-sm mb-1">📍 {school.address}</p>
              <p className="text-gray-600 text-sm">🏙️ {school.city}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowSchools;
