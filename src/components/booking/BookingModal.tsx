import React, { useState } from 'react';
import { X, Calendar, Clock, CreditCard, Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { hospitals } from '../../data/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  hospitalId: string;
  doctorId: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  hospitalId,
  doctorId,
}) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<'datetime' | 'payment' | 'confirmation'>('datetime');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  if (!isOpen) return null;

  const hospital = hospitals.find(h => h.id === hospitalId);
  const doctor = hospital?.doctors.find(d => d.id === doctorId);

  if (!hospital || !doctor) return null;

  const availableDates = [
    '2025-01-15',
    '2025-01-16',
    '2025-01-17',
    '2025-01-20',
    '2025-01-21',
  ];

  const availableTimes = [
    '09:00',
    '10:00',
    '11:00',
    '14:00',
    '15:00',
    '16:00',
  ];

  const handleNext = () => {
    if (step === 'datetime' && selectedDate && selectedTime) {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('confirmation');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {step === 'datetime' && t('bookAppointment')}
              {step === 'payment' && 'Payment'}
              {step === 'confirmation' && t('bookingConfirmed')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {step === 'datetime' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{doctor.name}</h3>
                <p className="text-blue-600 text-sm">{doctor.specialty}</p>
                <p className="text-gray-600 text-sm">{hospital.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('selectDate')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 text-sm rounded-lg border transition-all ${
                        selectedDate === date
                          ? 'border-healux-primary bg-healux-light text-healux-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {new Date(date).toLocaleDateString()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('selectTime')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm rounded-lg border transition-all ${
                        selectedTime === time
                          ? 'border-healux-primary bg-healux-light text-healux-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-healux-primary text-white py-3 rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-healux-secondary transition-colors"
              >
                {t('next')}
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Consultation Fee</span>
                  <span className="font-bold text-healux-primary">
                    {hospital.pricing.consultation} {hospital.pricing.currency}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {selectedDate} at {selectedTime}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center p-4 border-2 border-healux-primary bg-healux-light rounded-xl">
                    <input type="radio" name="payment" defaultChecked className="mr-3 rtl:mr-0 rtl:ml-3" />
                    <CreditCard className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2 text-healux-primary" />
                    <span className="font-medium text-healux-primary">Credit Card</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-healux-primary focus:border-transparent"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-healux-primary focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-healux-primary focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-healux-primary text-white py-3 rounded-xl hover:bg-healux-secondary transition-colors"
              >
                Pay {hospital.pricing.consultation} {hospital.pricing.currency}
              </button>
            </div>
          )}

          {step === 'confirmation' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-healux-light rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-healux-primary" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t('bookingConfirmed')}
                </h3>
                <p className="text-gray-600 mb-6">
                  Your appointment has been scheduled successfully
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-left rtl:text-right">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-medium">{doctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hospital:</span>
                    <span className="font-medium">{hospital.name}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-healux-primary text-white py-3 rounded-xl hover:bg-healux-secondary transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};