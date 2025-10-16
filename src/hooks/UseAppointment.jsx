import { useState, useEffect } from 'react';
import { AppointmentService } from '../services/AppointmentService';

const useAppointments = (doctorId, date, viewType = 'day') => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const service = new AppointmentService();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let result;
        
        if (viewType === 'day') {
          result = service.getAppointmentsByDoctorAndDate(doctorId, date);
        } else {
          result = service.getAppointmentsByDoctorAndWeek(doctorId, date);
        }
        
        setAppointments(result);
      } catch (err) {
        setError('Failed to fetch appointments. Please try again.');
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId, date, viewType]);

  // Helper function to get appointments for a specific time slot
  const getAppointmentsForTimeSlot = (targetTime, targetDate = null) => {
    if (!appointments || appointments.length === 0) return [];

    if (viewType === 'day') {
      return appointments.filter(apt => {
        const aptTime = new Date(apt.startTime);
        const [targetHour, targetMinute] = targetTime.split(':').map(Number);
        
        return aptTime.getHours() === targetHour && 
               aptTime.getMinutes() === targetMinute;
      });
    } else {
      // For week view, we need to consider the date as well
      const dayAppointments = appointments.find(dayData => {
        const dayDate = new Date(dayData.date);
        return targetDate && dayDate.toDateString() === targetDate.toDateString();
      });
      
      if (!dayAppointments) return [];
      
      return dayAppointments.appointments.filter(apt => {
        const aptTime = new Date(apt.startTime);
        const [targetHour] = targetTime.split(':').map(Number);
        
        return aptTime.getHours() === targetHour;
      });
    }
  };

  // Get current doctor details
  const getCurrentDoctor = () => {
    const service = new AppointmentService();
    return service.getDoctorById(doctorId);
  };

  // Check if there are any appointments
  const hasAppointments = () => {
    if (viewType === 'day') {
      return appointments && appointments.length > 0;
    } else {
      return appointments && appointments.some(day => day.appointments.length > 0);
    }
  };

  // Get total appointments count
  const getTotalAppointments = () => {
    if (viewType === 'day') {
      return appointments ? appointments.length : 0;
    } else {
      return appointments ? appointments.reduce((total, day) => total + day.appointments.length, 0) : 0;
    }
  };

  return {
    // State
    appointments,
    loading,
    error,
    
    // Helper functions
    getAppointmentsForTimeSlot,
    getCurrentDoctor,
    hasAppointments,
    getTotalAppointments,
    
    // Derived state
    isEmpty: !hasAppointments(),
  };
};

export { useAppointments };