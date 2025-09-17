import React from 'react';
import { MapPin, Star, Users, Award } from 'lucide-react';
import { Hospital } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface HospitalCardProps {
  hospital: Hospital;
  onClick: () => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onClick }) => {
  const { t, language } = useLanguage();

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 cursor-pointer transition-all duration-300 hover:scale-[1.02] group"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={hospital.image}
          alt={language === 'ar' ? hospital.nameAr : hospital.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {language === 'ar' ? hospital.nameAr : hospital.name}
            </h3>
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
              <span>{language === 'ar' ? hospital.locationAr : hospital.location}</span>
            </div>
          </div>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="h-4 w-4 text-yellow-500 mr-1 rtl:mr-0 rtl:ml-1" />
            <span className="text-sm font-semibold text-gray-900">{hospital.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {language === 'ar' ? hospital.descriptionAr : hospital.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
            <span>{hospital.reviewCount} {t('reviews')}</span>
          </div>
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
            <span>{hospital.accreditation.join(', ')}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {hospital.specialties.slice(0, 2).map((specialty) => (
              <span
                key={specialty.id}
                className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
              >
                {language === 'ar' ? specialty.nameAr : specialty.name}
              </span>
            ))}
            {hospital.specialties.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{hospital.specialties.length - 2}
              </span>
            )}
          </div>
          <div className="text-right rtl:text-left">
            <div className="text-lg font-bold text-blue-600">
              {hospital.pricing.consultation} {hospital.pricing.currency}
            </div>
            <div className="text-xs text-gray-500">{t('consultation')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};