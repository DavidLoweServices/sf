'use client';

import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ReviewStepProps {
  data: any;
  onComplete: (data: any) => void;
}

export default function ReviewStep({ data, onComplete }: ReviewStepProps) {
  const [attestations, setAttestations] = useState(data.attestations || [{
    name: 'propay_sub_merchant_terms_and_conditions_uk',
    ip_address: '',
    time_of_attestation: new Date().toISOString()
  }]);
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [currentIp, setCurrentIp] = useState('');

  // Fetch IP address on component mount
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setCurrentIp(data.ip);
        
        // Update attestations with the IP
        updateAttestations(data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
        // Fallback to a placeholder
        setCurrentIp('0.0.0.0');
        updateAttestations('0.0.0.0');
      }
    };
    
    fetchIpAddress();
  }, []);
  
  const updateAttestations = (ip: string) => {
    const updatedAttestations = attestations.map(attestation => ({
      ...attestation,
      ip_address: ip,
      time_of_attestation: new Date().toISOString()
    }));
    
    setAttestations(updatedAttestations);
    
    onComplete({
      attestations: updatedAttestations,
      notifications: data.notifications || {
        status_url: 'https://www.example.com/notifications/status'
      }
    });
  };
  
  // Save when terms are accepted
  useEffect(() => {
    if (termsAccepted && currentIp) {
      onComplete({
        attestations,
        notifications: data.notifications || {
          status_url: 'https://www.example.com/notifications/status'
        }
      });
    }
  }, [termsAccepted, attestations, currentIp, data.notifications, onComplete]);

  // Format the data for display
  const formatAddress = (address) => {
    if (!address) return 'Not provided';
    
    const parts = [
      address.building_name,
      address.line_1,
      address.line_2,
      address.line_3,
      address.city,
      address.state,
      address.post_town,
      address.postal_code,
      address.country
    ].filter(Boolean);
    
    return parts.join(', ');
  };
  
  const formatPerson = (person) => {
    if (!person) return 'Not provided';
    
    return `${person.first_name} ${person.middle_name ? person.middle_name + ' ' : ''}${person.last_name}, ${person.email}`;
  };

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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Review Onboarding Information</h2>
      <p className="text-sm text-gray-500 mb-6">
        Please review all the information you have provided before submitting it for processing.
      </p>

      <Accordion type="single" collapsible className="w-full" defaultValue="business-info">
        <AccordionItem value="business-info" className="border rounded-lg mb-4 border-gray-200">
          <AccordionTrigger className="px-4 py-3">
            Business Information
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-gray-500">Business Name</h3>
                <p>{data.businessInfo?.name || 'Not provided'}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Legal Name</h3>
                <p>{data.businessInfo?.legal_name || 'Not provided'}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Business Type</h3>
                <p>{data.businessInfo?.type || 'Not provided'}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Legal Entity</h3>
                <p>{data.businessInfo?.legal_entity || 'Not provided'}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">MCC</h3>
                <p>{data.businessInfo?.merchant_category_code || 'Not provided'}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Registration Number</h3>
                <p>{data.businessInfo?.registration_number || 'Not provided'}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Website</h3>
                <p>{data.businessInfo?.website || 'Not provided'}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Email</h3>
                <p>{data.businessInfo?.notification_email || 'Not provided'}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-medium text-sm text-gray-500">Description</h3>
                <p>{data.businessInfo?.description || 'Not provided'}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="addresses" className="border rounded-lg mb-4 border-gray-200">
          <AccordionTrigger className="px-4 py-3">
            Addresses
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            {data.addresses && data.addresses.length > 0 ? (
              data.addresses.map((address, index) => (
                <div key={index} className="mb-4 pb-4 border-b border-gray-100 last:border-0">
                  <h3 className="font-medium mb-2">
                    {address.functions.map(fn => fn.replace('_', ' ')).join(', ')}
                  </h3>
                  <p className="text-sm">{formatAddress(address)}</p>
                  {address.phone && (
                    <p className="text-sm mt-1">
                      Phone: +{address.phone.country_code} {address.phone.subscriber_number}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No addresses provided</p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="payment-processing" className="border rounded-lg mb-4 border-gray-200">
          <AccordionTrigger className="px-4 py-3">
            Payment Processing
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="mb-4">
              <h3 className="font-medium mb-2">Processing Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm text-gray-500">Monthly Sales</h4>
                  <p>£{data.payment_processing_statistics?.total_monthly_sales_amount || '0'}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500">Average Transaction</h4>
                  <p>£{data.payment_processing_statistics?.average_ticket_sales_amount || '0'}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500">Highest Transaction</h4>
                  <p>£{data.payment_processing_statistics?.highest_ticket_sales_amount || '0'}</p>
                </div>
              </div>
            </div>

            {data.payment_methods && data.payment_methods.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Bank Account Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm text-gray-500">Account Type</h4>
                    <p>{data.payment_methods[0].bank_transfer.account_type || 'Not provided'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Account Holder Type</h4>
                    <p>{data.payment_methods[0].bank_transfer.account_holder_type || 'Not provided'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Bank Code</h4>
                    <p>{data.payment_methods[0].bank_transfer.bank.code || 'Not provided'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Bank Address</h4>
                    <p>{formatAddress(data.payment_methods[0].bank_transfer.bank.address)}</p>
                  </div>
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="persons" className="border rounded-lg mb-4 border-gray-200">
          <AccordionTrigger className="px-4 py-3">
            Persons
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            {data.persons && data.persons.length > 0 ? (
              data.persons.map((person, index) => (
                <div key={index} className="mb-4 pb-4 border-b border-gray-100 last:border-0">
                  <h3 className="font-medium mb-2">
                    {formatPerson(person)}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-gray-500">Roles</h4>
                      <p>{person.functions.map(fn => fn.replace('_', ' ')).join(', ')}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500">Date of Birth</h4>
                      <p>{person.date_of_birth || 'Not provided'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500">Job Title</h4>
                      <p>{person.job_title || 'Not provided'}</p>
                    </div>
                    {person.equity_percentage && (
                      <div>
                        <h4 className="text-sm text-gray-500">Equity Percentage</h4>
                        <p>{person.equity_percentage}%</p>
                      </div>
                    )}
                    <div className="md:col-span-2">
                      <h4 className="text-sm text-gray-500">Address</h4>
                      <p>{formatAddress(person.addresses[0])}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No persons provided</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="border-t border-gray-200 pt-6 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium mb-4">Terms and Conditions</h3>
          
          <div className="flex items-start space-x-3 mb-6">
            <Checkbox 
              id="terms" 
              checked={termsAccepted}
              onCheckedChange={handleTermsChange}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm font-normal">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> for merchant onboarding. I confirm that all information provided is accurate and complete.
            </Label>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="ip-address" className="text-sm">Your IP Address</Label>
              <Input 
                id="ip-address" 
                value={currentIp} 
                disabled 
                className="bg-gray-100 mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">This IP address will be recorded with your submission for verification purposes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 