import { useState } from "react";
import { doctors, appointments, getAppointmentColor } from "../data/mockData";

const WeekView = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("1");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get Monday of current week
  const getWeekStartDate = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  // Generate week days (Monday to Sunday)
  const generateWeekDays = () => {
    const startDate = getWeekStartDate(new Date(selectedDate));
    const days = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      days.push(currentDate);
    }
    return days;
  };

  // Generate time slots (hourly from 8 AM to 6 PM)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
    }
    return slots;
  };

  // Get appointments for specific day and time
  const getAppointmentsForDayAndTime = (day, time) => {
    const [hour] = time.split(":").map(Number);

    return appointments.filter((apt) => {
      const aptDate = new Date(apt.startTime);
      const aptHour = aptDate.getHours();

      return (
        apt.doctorId === selectedDoctor &&
        aptDate.toDateString() === day.toDateString() &&
        aptHour === hour
      );
    });
  };

  const weekDays = generateWeekDays();
  const timeSlots = generateTimeSlots();
  const selectedDoctorData = doctors.find((d) => d.id === selectedDoctor);

  // Week navigation
  const handleWeekChange = (weeks) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + weeks * 7);
    setSelectedDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Week View Schedule</h1>
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

          {/* Week Navigation */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleWeekChange(-1)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                ← Previous Week
              </button>

              <button
                onClick={() => setSelectedDate(new Date())}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                This Week
              </button>

              <button
                onClick={() => handleWeekChange(1)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Next Week →
              </button>
            </div>

            <div className="text-lg font-semibold text-gray-900">
              Week of{" "}
              {weekDays[0].toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}{" "}
              -{" "}
              {weekDays[6].toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
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

        {/* Week Grid */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            {/* Week Header */}
            <div className="grid grid-cols-8 min-w-[800px] bg-gray-100 border-b">
              <div className="p-4 font-semibold text-gray-700 border-r">Time</div>
              {weekDays.map((day) => (
                <div
                  key={day.toDateString()}
                  className="p-4 font-semibold text-gray-700 text-center border-r last:border-r-0"
                >
                  <div className="text-sm">
                    {day.toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                  <div className="text-lg">{day.getDate()}</div>
                  <div className="text-xs text-gray-500">
                    {day.toLocaleDateString("en-US", { month: "short" })}
                  </div>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            {timeSlots.map((time) => (
              <div
                key={time}
                className="grid grid-cols-8 min-w-[800px] border-b hover:bg-gray-50 last:border-b-0"
              >
                {/* Time Column */}
                <div className="p-4 bg-gray-50 text-gray-600 font-medium border-r">
                  {time}
                </div>

                {/* Day Columns */}
                {weekDays.map((day) => {
                  const dayAppointments = getAppointmentsForDayAndTime(day, time);

                  return (
                    <div
                      key={day.toDateString()}
                      className="p-2 border-r last:border-r-0 min-h-20"
                    >
                      {dayAppointments.length === 0 ? (
                        <div className="text-gray-300 text-xs text-center mt-4">
                          -
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {dayAppointments.map((apt) => (
                            <div
                              key={apt.id}
                              className={`p-2 rounded text-xs ${getAppointmentColor(
                                apt.type
                              )}`}
                            >
                              <div className="font-semibold truncate">
                                {apt.patientName.split(" ")[0]}
                              </div>
                              <div className="capitalize text-xs opacity-75">
                                {apt.type}
                              </div>
                              <div className="text-xs opacity-60">
                                {new Date(apt.startTime).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="bg-gray-50 p-4 border-t">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <span className="text-sm font-semibold text-gray-700">
                Appointment Types:
              </span>
              {["checkup", "consultation", "follow-up", "procedure"].map(
                (type) => (
                  <div key={type} className="flex items-center gap-1">
                    <div
                      className={`w-3 h-3 rounded ${getAppointmentColor(type)}`}
                    ></div>
                    <span className="text-xs text-gray-600 capitalize">
                      {type}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekView;
