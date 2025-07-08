import React, { useState } from 'react';
import { klaviyoService } from '../services/klaviyoService';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  desiredDate: string;
  guestCount: string;
  leadStage: 'Hot' | 'Hot - Manual Reply';
}

const LeadEntryForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
    desiredDate: '',
    guestCount: '',
    leadStage: 'Hot'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    // Get EST time
    const now = new Date();
    const estTime = now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false }); // HH:mm:ss
    const estDateTimeISO = new Date(
      now.toLocaleString('en-US', { timeZone: 'America/New_York' })
    ).toISOString();

    // Format phone number for Klaviyo (add +1 if it's a US number)
    const formatPhoneForKlaviyo = (phone: string) => {
      if (!phone) return phone;
      // Remove all non-digits
      const digits = phone.replace(/\D/g, '');
      // If it's 10 digits, assume it's a US number and add +1
      if (digits.length === 10) {
        return `+1${digits}`;
      }
      // If it already starts with +, return as is
      if (phone.startsWith('+')) {
        return phone;
      }
      // Otherwise, return the original
      return phone;
    };

    // Validate phone number (basic US mobile validation)
    const validatePhoneNumber = (phone: string) => {
      if (!phone) return true; // Phone is optional
      const digits = phone.replace(/\D/g, '');
      // Check if it's a valid US mobile number (10 digits, starts with valid area code)
      if (digits.length === 10) {
        // Basic check for valid US area codes (this is a simplified check)
        const areaCode = parseInt(digits.substring(0, 3));
        // Most US area codes are between 200-999, but some specific ones are invalid
        if (areaCode >= 200 && areaCode <= 999) {
          // Additional check: avoid obviously fake/test numbers
          // Check if it's a common test pattern (like 999, 888, etc.)
          if (areaCode === 999 || areaCode === 888 || areaCode === 777) {
            return false;
          }
          return true;
        }
      }
      return false;
    };

    const formattedPhone = formatPhoneForKlaviyo(formData.phone);
    const isPhoneValid = validatePhoneNumber(formData.phone);

    try {
      // Step 1: Send to Zapier webhook
      const zapierUrl = process.env.NODE_ENV === 'production' 
        ? '/api/zapier' 
        : 'http://localhost:4000/api/zapier';
        
      const zapierResponse = await fetch(zapierUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'WeddingPro/The Knot',
          submissionDate: estDateTimeISO,
          submissionTime: estTime,
          inquirySource: 'Manual Entry'
        }),
      });

      if (!zapierResponse.ok) {
        throw new Error('Failed to send to Zapier');
      }

      // Step 2: Create/get Klaviyo profile
      const profileResult = await klaviyoService.createOrGetProfile(
        formData.email,
        formData.firstName,
        formData.lastName,
        formData.leadStage,
        formattedPhone
      );

      if (!profileResult.success) {
        throw new Error(`Klaviyo profile error: ${profileResult.error}`);
      }

      // Step 3: Update phone number if we have one and it's valid
      if (formattedPhone && profileResult.profileId && isPhoneValid) {
        const phoneResult = await klaviyoService.updateProfilePhone(
          profileResult.profileId,
          formattedPhone
        );

        if (!phoneResult.success && phoneResult.code !== 409) {
          // Don't fail completely for phone conflicts, just warn
          console.warn('Phone update warning:', phoneResult.error);
        }
      } else if (formData.phone && !isPhoneValid) {
        console.warn('Phone number appears to be invalid or a landline:', formData.phone);
      }

      setSubmitStatus('success');
      setStatusMessage('Lead submitted successfully! The lead has been added to your CRM and Klaviyo, and nurturing sequences have been triggered.');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: '',
        desiredDate: '',
        guestCount: '',
        leadStage: 'Hot'
      });

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="https://i.imgur.com/qfTW5j0.png" 
            alt="Milea Estate Vineyard" 
            className="mx-auto mb-6"
            style={{ width: '20%', height: 'auto' }}
          />
          <h1 className="text-3xl font-gilda text-text mb-2">
            Milea Estate Manual Lead Entry
          </h1>
          <p className="text-accent">
            Enter WeddingPro and The Knot leads manually
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-form rounded-lg shadow-md p-8 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-text mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-text placeholder:text-accent"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-text mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-text placeholder:text-accent"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-text placeholder:text-accent"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-text placeholder:text-accent"
              />
            </div>

            {/* Desired Date */}
            <div>
              <label htmlFor="desiredDate" className="block text-sm font-medium text-text mb-2">
                Desired Date
              </label>
              <input
                type="date"
                id="desiredDate"
                name="desiredDate"
                value={formData.desiredDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-text placeholder:text-accent"
              />
            </div>

            {/* Guest Count */}
            <div>
              <label htmlFor="guestCount" className="block text-sm font-medium text-text mb-2">
                Estimated Guest Count
              </label>
              <input
                type="number"
                id="guestCount"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-text placeholder:text-accent"
              />
            </div>
          </div>

          {/* Lead Stage Dropdown */}
          <div className="mt-6">
            <label htmlFor="leadStage" className="block text-sm font-medium text-text mb-2">
              Lead Stage *
            </label>
            <select
              id="leadStage"
              name="leadStage"
              value={formData.leadStage}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-text"
            >
              <option value="Hot">Hot</option>
              <option value="Hot - Manual Reply">Hot - Manual Reply</option>
            </select>
          </div>

          {/* Message */}
          <div className="mt-6">
            <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-text placeholder:text-accent"
              placeholder="Enter any additional details about the inquiry..."
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="button button-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Lead'}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
              {statusMessage}
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {statusMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LeadEntryForm; 