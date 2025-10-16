import { useState } from 'react';
import { doctors, appointments, getAppointmentColor } from '../data/mockData';

const Schedule = () => {
  const [selectedDoctor, setSelectedDoctor] = useState('1');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Filter appointments for selected doctor and date
  const filteredAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.startTime);
    return (
      apt.doctorId === selectedDoctor &&
      aptDate.toDateString() === selectedDate.toDateString()
    );
  });

  const selectedDoctorData = doctors.find(d => d.id === selectedDoctor);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Appointment Schedule</h1>
        
        {/* Doctor Selector */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <label className="block text-sm font-medium mb-2">Select Doctor:</label>
          <select 
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                Dr. {doctor.name} - {doctor.specialty}
              </option>
            ))}
          </select>
        </div>

        {/* Schedule Display */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold">
              Dr. {selectedDoctorData?.name} - {selectedDoctorData?.specialty}
            </h2>
            <p className="text-gray-600">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="p-4">
            {filteredAppointments.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No appointments for this date</p>
            ) : (
              <div className="space-y-3">
                {filteredAppointments.map(apt => (
                  <div 
                    key={apt.id} 
                    className={`p-4 rounded-lg border ${getAppointmentColor(apt.type)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{apt.patientName}</h3>
                        <p className="text-sm capitalize">{apt.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">
                          {new Date(apt.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                          {new Date(apt.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
