export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'patient' | 'companion' | 'service_provider';
  country?: string;
  language: 'ar' | 'en' | 'fr' | 'tr';
  avatar?: string;
}

export interface Hospital {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  specialties: MedicalSpecialty[];
  rating: number;
  reviewCount: number;
  location: string;
  locationAr: string;
  accreditation: string[];
  doctors: Doctor[];
  pricing: {
    consultation: number;
    currency: string;
  };
  amenities: string[];
}

export interface Doctor {
  id: string;
  name: string;
  nameAr: string;
  specialty: string;
  specialtyAr: string;
  experience: number;
  rating: number;
  image: string;
  languages: string[];
  availability: string[];
}

export interface MedicalSpecialty {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  description: string;
  descriptionAr: string;
}

export interface Booking {
  id: string;
  hospitalId: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  amount: number;
  currency: string;
}

export type Language = 'ar' | 'en' | 'fr' | 'tr';