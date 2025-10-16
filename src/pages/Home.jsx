import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Hospital Appointment
            <span className="text-blue-600 block">Scheduler</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Efficiently manage doctor appointments with our intuitive scheduling
            system. View daily and weekly schedules, filter by doctors, and
            streamline hospital operations.
          </p>
        </div>

        {/* Features Grid */}

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/day"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Day View
            </h3>
            <p className="text-gray-600">
              View appointments in daily calendar format with 30-minute slots
            </p>
          </Link>

          <Link
            to="/week"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">📆</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Week View
            </h3>
            <p className="text-gray-600">
              Get overview of entire week's schedule across multiple days
            </p>
          </Link>

          <Link
            to="/doctor"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">👨‍⚕</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Doctor Filter
            </h3>
            <p className="text-gray-600">
              Filter appointments by specific doctors and specialties
            </p>
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/schedule"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
          >
            Get Started - View Schedule
          </Link>

          <Link
            to="/about"
            className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
          >
            Learn More
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">3+</div>
            <div className="text-gray-600">Doctors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">50+</div>
            <div className="text-gray-600">Patients</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <div className="text-gray-600">Access</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">100%</div>
            <div className="text-gray-600">Reliable</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
