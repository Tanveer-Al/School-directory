// Simple Mock Data - Single File
export const doctors = [
  {
    id: '1',
    name: 'Sarah Chen',
    specialty: 'Cardiology',
    workingHours: { start: '08:00 AM', end: '06:00 PM' }
  },
  {
    id: '2', 
    name: 'Michael Rodriguez',
    specialty: 'Pediatrics',
    workingHours: { start: '09:00 AM', end: '07:00 PM' }
  },
  {
    id: '3',
    name: 'Priya Sharma',
    specialty: 'Dermatology', 
    workingHours: { start: '08:30 AM', end: '17:30 PM' }
  }
];

export const appointments = [
  {
    id: '1',
    doctorId: '1',
    patientName: 'John Doe',
    type: 'checkup',
    startTime: '2024-10-15T08:30:00',
    endTime: '2024-10-15T09:00:00'
  },
  {
    id: '2',
    doctorId: '1', 
    patientName: 'Jane Smith',
    type: 'consultation',
    startTime: '2024-10-15T10:00:00',
    endTime: '2024-10-15T11:00:00'
  },
  {
    id: '3',
    doctorId: '2',
    patientName: 'Robert Brown',
    type: 'follow-up', 
    startTime: '2024-10-15T09:30:00',
    endTime: '2024-10-15T10:00:00'
  },
  {
    id: '4',
    doctorId: '3',
    patientName: 'Emily Johnson',
    type: 'procedure',
    startTime: '2024-10-15T11:00:00',
    endTime: '2024-10-15T12:00:00'
  }
];

// Helper functions
export const getAppointmentColor = (type) => {
  const colors = {
    'checkup': 'bg-blue-100 border-blue-300',
    'consultation': 'bg-green-100 border-green-300',
    'follow-up': 'bg-orange-100 border-orange-300',
    'procedure': 'bg-purple-100 border-purple-300'
  };
  return colors[type] || 'bg-gray-100 border-gray-300';
};

export const getDoctorById = (id) => {
  return doctors.find(doctor => doctor.id === id);
};