import React from 'react';
import * as Icons from 'lucide-react';
import { MedicalSpecialty } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface SpecialtyCardProps {
  specialty: MedicalSpecialty;
  onClick: () => void;
}

export const SpecialtyCard: React.FC<SpecialtyCardProps> = ({ specialty, onClick }) => {
  const { t, language } = useLanguage();
  const IconComponent = Icons[specialty.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 cursor-pointer transition-all duration-300 hover:scale-105 group"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-healux-light to-healux-primary/20 rounded-2xl flex items-center justify-center group-hover:from-healux-primary/20 group-hover:to-healux-primary/30 transition-all">
          {IconComponent && <IconComponent className="h-8 w-8 text-healux-primary" />}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {language === 'ar' ? specialty.nameAr : specialty.name}
          </h3>
          <p className="text-sm text-gray-600">
            {language === 'ar' ? specialty.descriptionAr : specialty.description}
          </p>
        </div>
      </div>
    </div>
  );
};