import React, { useState } from 'react';
import { 
  Calendar, 
  Hotel, 
  MapPin, 
  Car, 
  HeadphonesIcon,
  ChevronRight,
  Stethoscope,
  Globe,
  Shield,
  Users
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from '../components/auth/AuthModal';

interface HomePageProps {
  onServiceSelect: (service: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onServiceSelect }) => {
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const services = [
    {
      id: 'medical',
      icon: Calendar,
      title: t('medicalBooking'),
      description: 'Book appointments with top specialists',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      id: 'recovery',
      icon: Hotel,
      title: t('recoveryStay'),
      description: 'Comfortable accommodation for recovery',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      id: 'tourism',
      icon: MapPin,
      title: t('tourism'),
      description: 'Explore Jordan\'s attractions',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      id: 'transport',
      icon: Car,
      title: t('transport'),
      description: 'Airport transfers and city transport',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      id: 'support',
      icon: HeadphonesIcon,
      title: t('supportServices'),
      description: '24/7 multilingual support',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600',
    },
  ];

  const features = [
    {
      icon: Stethoscope,
      title: 'World-Class Healthcare',
      description: 'Access to internationally accredited hospitals and renowned specialists',
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Services available in Arabic, English, French, and Turkish',
    },
    {
      icon: Shield,
      title: 'Trusted & Secure',
      description: 'JCI-accredited facilities with the highest safety standards',
    },
    {
      icon: Users,
      title: 'Personalized Care',
      description: 'Dedicated patient coordinators for your entire journey',
    },
  ];

  const handleServiceClick = (serviceId: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    onServiceSelect(serviceId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('discoverJordan')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('qualityCare')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleServiceClick('medical')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 font-semibold shadow-lg"
              >
                {t('bookAppointment')}
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive medical tourism services designed to make your healthcare journey seamless and comfortable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className={`${service.bgColor} rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-100 group`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${service.bgColor} rounded-xl flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${service.iconColor}`} />
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Jordan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Jordan is recognized as a leading destination for medical tourism in the Middle East
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Medical Journey?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of patients who have trusted us with their healthcare needs
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-white text-blue-600 px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </section>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};