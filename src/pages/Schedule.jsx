import React, { useState } from "react";
// DayView और WeekView इम्पोर्ट करें अगर वे मौजूद हैं
import DayView from "../components/DayView";
import WeekView from "../components/WeekView";
import { doctors } from "../data/mockData";

const BookAppointment = ({ showForm, setShowForm }) => {
  if (!showForm) return null; // फॉर्म न दिखाने पर

  const handleSubmit = (e) => {
    e.preventDefault();
    // यहां फॉर्म सबमिशन लॉजिक ऐड करें, जैसे API कॉल
    console.log("Appointment booked!"); // टेस्ट के लिए
    setShowForm(false); // फॉर्म बंद करें
  };

  const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute of [0, 30]) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({
          time: timeString,
          hour: hour,
          minute: minute
        });
      }
    }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={() => setShowForm(false)}
        >
          &times; {/* क्लोज बटन */}
        </button>
        <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="doctor"
              className="block text-sm font-medium text-gray-700"
            >
              Doctor
            </label>
            <select
              id="doctor"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  Dr. {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

const Schedule = () => {
  const [view, setView] = useState("day"); // 'day' or 'week'
  const [showBookForm, setShowBookForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                view === "day"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setView("day")}
            >
              Day View
            </button>
            <button
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                view === "week"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setView("week")}
            >
              Week View
            </button>
          </div>
        </div>
        {view === "day" ? <DayView /> : <WeekView />}
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition-colors"
          onClick={() => setShowBookForm(true)}
        >
          Book Appointment
        </button>
      </div>
      {showBookForm && (
        <BookAppointment
          showForm={showBookForm}
          setShowForm={setShowBookForm}
        />
      )}
    </div>
  );
};

export default Schedule; // यह फाइल Schedule कम्पोनेंट एक्सपोर्ट करेगी
