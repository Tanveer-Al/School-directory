import React, { useState } from 'react';
import { doctors, appointments, getAppointmentColor } from '../data/mockData';

const DoctorSelector = () => {
  const [selectedDoctor, setSelectedDoctor] = useState('1');

  // Filter appointments for selected doctor
  const doctorAppointments = appointments.filter(
    (apt) => apt.doctorId === selectedDoctor
  );

  const selectedDoctorData = doctors.find((d) => d.id === selectedDoctor);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Selector</h1>
        </div>

        {/* Doctor Selector */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Doctor:
          </label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="w-full md:w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                Dr. {doctor.name} - {doctor.specialty}
              </option>
            ))}
          </select>

          {/* Doctor Info */}
          {selectedDoctorData && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                <strong>Dr. {selectedDoctorData.name}</strong> - {selectedDoctorData.specialty}
              </p>
              <p className="text-blue-600 text-sm">
                Working Hours: {selectedDoctorData.workingHours.start} - {selectedDoctorData.workingHours.end}
              </p>
            </div>
          )}
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Appointments</h2>
          {doctorAppointments.length === 0 ? (
            <div className="text-gray-400 text-sm py-2">No appointments found.</div>
          ) : (
            <ul className="space-y-3">
              {doctorAppointments.map((apt) => (
                <li
                  key={apt.id}
                  className={`p-3 rounded-lg border-l-4 ${getAppointmentColor(apt.type)}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold">{apt.patientName}</span>
                      <span className="ml-2 text-xs capitalize text-gray-600">{apt.type}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(apt.startTime).toLocaleDateString()}<br />
                      {new Date(apt.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                      {new Date(apt.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorSelector;