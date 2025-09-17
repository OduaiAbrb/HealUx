import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { medicalSpecialties, hospitals } from '../data/mockData';
import { SpecialtyCard } from '../components/medical/SpecialtyCard';
import { HospitalCard } from '../components/medical/HospitalCard';
import { HospitalProfile } from '../components/medical/HospitalProfile';
import { BookingModal } from '../components/booking/BookingModal';
import { MedicalSpecialty, Hospital } from '../types';

interface MedicalBookingPageProps {
  onBack: () => void;
}

export const MedicalBookingPage: React.FC<MedicalBookingPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<'specialty' | 'hospitals' | 'profile'>('specialty');
  const [selectedSpecialty, setSelectedSpecialty] = useState<MedicalSpecialty | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    hospitalId: string;
    doctorId: string;
  }>({ isOpen: false, hospitalId: '', doctorId: '' });

  const handleSpecialtySelect = (specialty: MedicalSpecialty) => {
    setSelectedSpecialty(specialty);
    setCurrentStep('hospitals');
  };

  const handleHospitalSelect = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setCurrentStep('profile');
  };

  const handleBookAppointment = (hospitalId: string, doctorId: string) => {
    setBookingModal({ isOpen: true, hospitalId, doctorId });
  };

  const handleBack = () => {
    if (currentStep === 'profile') {
      setCurrentStep('hospitals');
      setSelectedHospital(null);
    } else if (currentStep === 'hospitals') {
      setCurrentStep('specialty');
      setSelectedSpecialty(null);
    } else {
      onBack();
    }
  };

  const filteredHospitals = selectedSpecialty
    ? hospitals.filter(hospital =>
        hospital.specialties.some(spec => spec.id === selectedSpecialty.id)
      )
    : hospitals;

  if (currentStep === 'profile' && selectedHospital) {
    return (
      <>
        <HospitalProfile
          hospital={selectedHospital}
          onBack={handleBack}
          onBookAppointment={handleBookAppointment}
        />
        <BookingModal
          isOpen={bookingModal.isOpen}
          onClose={() => setBookingModal({ ...bookingModal, isOpen: false })}
          hospitalId={bookingModal.hospitalId}
          doctorId={bookingModal.doctorId}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4 rtl:mr-0 rtl:ml-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentStep === 'specialty' && t('selectSpecialty')}
                {currentStep === 'hospitals' && t('findHospitals')}
              </h1>
              {selectedSpecialty && (
                <p className="text-gray-600">
                  {selectedSpecialty.name} - {filteredHospitals.length} hospitals found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'specialty' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicalSpecialties.map((specialty) => (
              <SpecialtyCard
                key={specialty.id}
                specialty={specialty}
                onClick={() => handleSpecialtySelect(specialty)}
              />
            ))}
          </div>
        )}

        {currentStep === 'hospitals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="bg-blue-100 px-4 py-2 rounded-full">
                  <span className="text-blue-700 font-medium">
                    {selectedSpecialty?.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHospitals.map((hospital) => (
                <HospitalCard
                  key={hospital.id}
                  hospital={hospital}
                  onClick={() => handleHospitalSelect(hospital)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal({ ...bookingModal, isOpen: false })}
        hospitalId={bookingModal.hospitalId}
        doctorId={bookingModal.doctorId}
      />
    </div>
  );
};