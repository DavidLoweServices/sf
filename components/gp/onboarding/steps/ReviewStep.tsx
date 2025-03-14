'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  StepProps, 
  Attestation,
  Person,
  Address,
  COUNTRIES 
} from '../types';

export default function ReviewStep({ 
  data, 
  onComplete 
}: StepProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [attestations, setAttestations] = useState<Attestation[]>(data.attestations || [{
    name: 'propay_sub_merchant_terms_and_conditions_uk',
    ip_address: '',
    time_of_attestation: new Date().toISOString()
  }]);

  // Initialize form data from props only once
  useEffect(() => {
    // No need to update parent here
  }, []);

  const handleTermsChange = (checked: boolean) => {
    setTermsAccepted(checked);
    
    if (checked) {
      const updatedAttestations = attestations.map(attestation => ({
        ...attestation,
        ip_address: '127.0.0.1', // This would be the actual IP in production
        time_of_attestation: new Date().toISOString()
      }));
      
      setAttestations(updatedAttestations);
      
      // Update parent when attestations change
      onComplete({
        attestations: updatedAttestations
      });
    }
  };

  const formatAddress = (address: Address | undefined) => {
    if (!address) return 'N/A';
    
    const parts = [];
    if (address.line_1) parts.push(address.line_1);
    if (address.line_2) parts.push(address.line_2);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.postal_code) parts.push(address.postal_code);
    if (address.country) parts.push(getCountryName(address.country));
    
    return parts.join(', ');
  };

  const getCountryName = (code: string) => {
    return COUNTRIES[code as keyof typeof COUNTRIES] || code;
  };

  const getAddressByFunction = (addresses: Address[] | undefined, func: string) => {
    return addresses?.find(addr => addr.functions.includes(func));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Review Your Application</h2>
      <p className="text-sm text-gray-500">
        Please review all information carefully before submitting. You will need to accept the terms and conditions to proceed.
      </p>

      <div className="border border-gray-200 rounded-lg p-6 space-y-8">
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Business Name</p>
              <p>{data.businessInfo?.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Legal Name</p>
              <p>{data.businessInfo?.legal_name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Business Type</p>
              <p>{data.businessInfo?.type || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Merchant Category Code</p>
              <p>{data.businessInfo?.merchant_category_code || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Registration Number</p>
              <p>{data.businessInfo?.registration_number || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Website</p>
              <p>{data.businessInfo?.website || 'N/A'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500">Business Description</p>
              <p>{data.businessInfo?.description || 'N/A'}</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Business Address</h3>
          <div>
            <p>{formatAddress(getAddressByFunction(data.addresses, 'BUSINESS'))}</p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Payment Processing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Monthly Sales Volume</p>
              <p>£{data.payment_processing_statistics?.total_monthly_sales_amount || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Average Transaction</p>
              <p>£{data.payment_processing_statistics?.average_ticket_sales_amount || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Highest Transaction</p>
              <p>£{data.payment_processing_statistics?.highest_ticket_sales_amount || 'N/A'}</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Person Information</h3>
          {data.persons?.map((person: Person, index: number) => (
            <div key={index} className="border border-gray-100 rounded-md p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p>{person.first_name} {person.last_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <p>{person.functions.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{person.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                  <p>{person.date_of_birth}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Country of Birth</p>
                  <p>{getCountryName(person.birth_country)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Citizenship</p>
                  <p>{getCountryName(person.citizenship_country)}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p>{formatAddress(getAddressByFunction(person.addresses, 'PERSONAL'))}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="pt-4 border-t border-gray-200">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms" 
              checked={termsAccepted}
              onCheckedChange={handleTermsChange}
            />
            <div className="grid gap-1.5 leading-none">
              <Label 
                htmlFor="terms" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I accept the terms and conditions
              </Label>
              <p className="text-sm text-gray-500">
                By checking this box, you agree to our{" "}
                <a href="#" className="text-primary underline">
                  Terms of Service
                </a>
                {" "}and{" "}
                <a href="#" className="text-primary underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 