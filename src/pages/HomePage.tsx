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
      color: 'from-healux-primary to-healux-secondary',
      bgColor: 'bg-healux-light',
      iconColor: 'text-healux-primary',
    },
    {
      id: 'recovery',
      icon: Hotel,
      title: t('recoveryStay'),
      description: 'Comfortable accommodation for recovery',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      id: 'tourism',
      icon: MapPin,
      title: t('tourism'),
      description: 'Explore Jordan\'s attractions',
      color: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50',
      iconColor: 'text-violet-600',
    },
    {
      id: 'transport',
      icon: Car,
      title: t('transport'),
      description: 'Airport transfers and city transport',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      id: 'support',
      icon: HeadphonesIcon,
      title: t('supportServices'),
      description: '24/7 multilingual support',
      color: 'from-healux-secondary to-healux-accent',
      bgColor: 'bg-healux-light',
      iconColor: 'text-healux-secondary',
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
    <div className="min-h-screen bg-gradient-to-br from-healux-light via-white to-healux-light">
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
                className="bg-gradient-to-r from-healux-primary to-healux-secondary text-white px-8 py-4 rounded-2xl hover:from-healux-secondary hover:to-healux-accent transition-all transform hover:scale-105 font-semibold shadow-lg"
              >
                {t('bookAppointment')}
              </button>
              <button className="border-2 border-healux-primary text-healux-primary px-8 py-4 rounded-2xl hover:bg-healux-primary hover:text-white transition-all font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-healux-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-healux-secondary rounded-full blur-3xl"></div>
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
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-healux-primary transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-healux-primary transition-colors">
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
                  <div className="w-16 h-16 bg-gradient-to-r from-healux-light to-healux-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-healux-primary" />
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-healux-primary to-healux-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Medical Journey?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Join thousands of patients who have trusted us with their healthcare needs
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-white text-healux-primary px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </section>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};