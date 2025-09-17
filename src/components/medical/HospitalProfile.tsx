import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Award, 
  Clock, 
  Users, 
  Calendar,
  Phone,
  Globe,
  CheckCircle
} from 'lucide-react';
import { Hospital } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface HospitalProfileProps {
  hospital: Hospital;
  onBack: () => void;
  onBookAppointment: (hospitalId: string, doctorId: string) => void;
}

export const HospitalProfile: React.FC<HospitalProfileProps> = ({ 
  hospital, 
  onBack, 
  onBookAppointment 
}) => {
  const { t, language } = useLanguage();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'doctors' | 'amenities'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'amenities', label: 'Amenities' },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={hospital.image}
          alt={language === 'ar' ? hospital.nameAr : hospital.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 rtl:left-auto rtl:right-4 p-2 bg-white bg-opacity-90 rounded-full hover:bg-white transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 text-white">
          <h1 className="text-2xl font-bold mb-2">
            {language === 'ar' ? hospital.nameAr : hospital.name}
          </h1>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 mr-1 rtl:mr-0 rtl:ml-1" />
              <span className="font-semibold">{hospital.rating}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
              <span>{language === 'ar' ? hospital.locationAr : hospital.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 rtl:space-x-reverse">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'ar' ? hospital.descriptionAr : hospital.description}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Specialties</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hospital.specialties.map((specialty) => (
                    <div
                      key={specialty.id}
                      className="bg-blue-50 rounded-lg p-4 text-center"
                    >
                      <div className="text-blue-600 font-semibold">
                        {language === 'ar' ? specialty.nameAr : specialty.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Accreditation</h2>
                <div className="flex flex-wrap gap-3">
                  {hospital.accreditation.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-green-50 text-green-700 px-3 py-2 rounded-lg"
                    >
                      <Award className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      <span className="font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-8">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {hospital.pricing.consultation} {hospital.pricing.currency}
                  </div>
                  <div className="text-gray-600">Consultation Fee</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-3 rtl:mr-0 rtl:ml-3" />
                    <span>{hospital.reviewCount} Reviews</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-3 rtl:mr-0 rtl:ml-3" />
                    <span>+962 6 123 4567</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe className="h-5 w-5 mr-3 rtl:mr-0 rtl:ml-3" />
                    <span>English, Arabic</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium">
                  {t('bookAppointment')}
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'doctors' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Medical Team</h2>
            {hospital.doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <img
                    src={doctor.image}
                    alt={language === 'ar' ? doctor.nameAr : doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {language === 'ar' ? doctor.nameAr : doctor.name}
                        </h3>
                        <p className="text-blue-600 font-medium mb-2">
                          {language === 'ar' ? doctor.specialtyAr : doctor.specialty}
                        </p>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                            <span>{doctor.experience} {t('yearsExperience')}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1 rtl:mr-0 rtl:ml-1" />
                            <span>{doctor.rating}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onBookAppointment(hospital.id, doctor.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {t('bookAppointment')}
                      </button>
                    </div>
                    <div className="mt-3">
                      <div className="text-sm text-gray-600 mb-1">{t('availableLanguages')}:</div>
                      <div className="flex flex-wrap gap-2">
                        {doctor.languages.map((lang, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'amenities' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Hospital Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hospital.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center bg-green-50 text-green-700 p-4 rounded-lg"
                >
                  <CheckCircle className="h-5 w-5 mr-3 rtl:mr-0 rtl:ml-3" />
                  <span className="font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};