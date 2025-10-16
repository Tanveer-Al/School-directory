import { useState } from "react";
import { doctors, appointments, getAppointmentColor } from "../data/mockData";

const DayView = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("1");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Generate time slots from 8 AM to 6 PM (30-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute of [0, 30]) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        slots.push({
          time: timeString,
          hour: hour,
          minute: minute,
        });
      }
    }
    return slots;
  };

  // Get appointments for selected doctor and date
  const getFilteredAppointments = () => {
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.startTime);
      return (
        apt.doctorId === selectedDoctor &&
        aptDate.toDateString() === selectedDate.toDateString()
      );
    });
  };

  // Get appointments for specific time slot
  const getAppointmentsForTimeSlot = (timeSlot) => {
    const filteredAppointments = getFilteredAppointments();
    return filteredAppointments.filter((apt) => {
      const aptTime = new Date(apt.startTime);
      return (
        aptTime.getHours() === timeSlot.hour &&
        aptTime.getMinutes() === timeSlot.minute
      );
    });
  };

  const timeSlots = generateTimeSlots();
  const filteredAppointments = getFilteredAppointments();
  const selectedDoctorData = doctors.find((d) => d.id === selectedDoctor);

  // Date navigation
  const handleDateChange = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Day View Schedule
          </h1>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          {/* Doctor Selector */}
          <div className="mb-4">
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
          </div>

          {/* Date Navigation */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleDateChange(-1)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                ← Previous Day
              </button>

              <button
                onClick={() => setSelectedDate(new Date())}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Today
              </button>

              <button
                onClick={() => handleDateChange(1)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Next Day →
              </button>
            </div>

            <div className="text-lg font-semibold text-gray-900">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Doctor Info */}
          {selectedDoctorData && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                <strong>Dr. {selectedDoctorData.name}</strong> -{" "}
                {selectedDoctorData.specialty}
              </p>
              <p className="text-blue-600 text-sm">
                Working Hours: {selectedDoctorData.workingHours.start} -{" "}
                {selectedDoctorData.workingHours.end}
              </p>
            </div>
          )}
        </div>

        {/* Schedule Grid */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 bg-gray-100 border-b">
            <div className="col-span-2 p-4 font-semibold text-gray-700">
              Time
            </div>
            <div className="col-span-10 p-4 font-semibold text-gray-700">
              Appointments
            </div>
          </div>

          {/* Time Slots */}
          <div className="max-h-96 overflow-y-auto">
            {timeSlots.map((slot) => {
              const slotAppointments = getAppointmentsForTimeSlot(slot);

              return (
                <div
                  key={slot.time}
                  className="grid grid-cols-12 border-b hover:bg-gray-50"
                >
                  {/* Time Label */}
                  <div className="col-span-2 p-4 bg-gray-50 text-gray-600 font-medium">
                    {slot.time}
                  </div>

                  {/* Appointments */}
                  <div className="col-span-10 p-3">
                    {slotAppointments.length === 0 ? (
                      <div className="text-gray-400 text-sm py-2">
                        No appointments
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {slotAppointments.map((apt) => (
                          <div
                            key={apt.id}
                            className={`p-3 rounded-lg border-l-4 ${getAppointmentColor(
                              apt.type
                            )}`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  {apt.patientName}
                                </h3>
                                <p className="text-sm text-gray-600 capitalize">
                                  {apt.type}
                                </p>
                              </div>
                              <div className="text-right text-sm text-gray-500">
                                <p>
                                  {new Date(apt.startTime).toLocaleTimeString(
                                    [],
                                    { hour: "2-digit", minute: "2-digit" }
                                  )}{" "}
                                  -
                                  {new Date(apt.endTime).toLocaleTimeString(
                                    [],
                                    { hour: "2-digit", minute: "2-digit" }
                                  )}
                                </p>
                                <p>
                                  (
                                  {Math.round(
                                    (new Date(apt.endTime) -
                                      new Date(apt.startTime)) /
                                      (1000 * 60)
                                  )}{" "}
                                  min)
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-4 border-t">
            <p className="text-sm text-gray-600">
              Total appointments for {selectedDate.toLocaleDateString()}:{" "}
              <strong>{filteredAppointments.length}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
