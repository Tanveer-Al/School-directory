import { appointments, doctors } from '../data/mockData';

class AppointmentService {
  getAppointmentsByDoctorAndDate = (doctorId, date) => {
    try {
      if (!doctorId || !date) {
        throw new Error('Doctor ID and date are required');
      }

      return appointments.filter(apt => {
        const aptDate = new Date(apt.startTime);
        return apt.doctorId === doctorId && 
               aptDate.toDateString() === date.toDateString();
      });
    } catch (error) {
      console.error('Error in getAppointmentsByDoctorAndDate:', error);
      return [];
    }
  };

  getAppointmentsByDoctorAndWeek = (doctorId, startDate) => {
    try {
      if (!doctorId || !startDate) {
        throw new Error('Doctor ID and start date are required');
      }

      const weekAppointments = [];
      
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        const dayAppointments = this.getAppointmentsByDoctorAndDate(doctorId, currentDate);
        
        weekAppointments.push({
          date: new Date(currentDate),
          dayName: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
          appointments: dayAppointments,
          isEmpty: dayAppointments.length === 0
        });
      }
      
      return weekAppointments;
    } catch (error) {
      console.error('Error in getAppointmentsByDoctorAndWeek:', error);
      return [];
    }
  };

  getAllDoctors = () => {
    return doctors.map(doctor => ({
      ...doctor,
      displayName: `Dr. ${doctor.name} - ${doctor.specialty}`
    }));
  };

  getDoctorById = (doctorId) => {
    return doctors.find(doctor => doctor.id === doctorId);
  };

  getAppointmentStats = (doctorId, date, viewType) => {
    const appointments = viewType === 'day' 
      ? this.getAppointmentsByDoctorAndDate(doctorId, date)
      : this.getAppointmentsByDoctorAndWeek(doctorId, date);

    if (viewType === 'day') {
      return {
        total: appointments.length,
        byType: this.groupAppointmentsByType(appointments)
      };
    } else {
      const weekStats = appointments.map(day => ({
        date: day.date,
        total: day.appointments.length,
        byType: this.groupAppointmentsByType(day.appointments)
      }));
      
      return {
        total: weekStats.reduce((sum, day) => sum + day.total, 0),
        dailyStats: weekStats
      };
    }
  };

  groupAppointmentsByType = (appointments) => {
    return appointments.reduce((acc, apt) => {
      acc[apt.type] = (acc[apt.type] || 0) + 1;
      return acc;
    }, {});
  };
}

export { AppointmentService };
