'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

interface AddressesStepProps {
  data: any;
  onComplete: (data: any) => void;
}

const ADDRESS_TYPES = [
  { value: 'BUSINESS', label: 'Business Address' },
  { value: 'SHIPPING', label: 'Shipping Address' },
  { value: 'LEGAL', label: 'Legal/Registered Address' },
  { value: 'PREVIOUS_BUSINESS', label: 'Previous Business Address' }
];

const addressTemplate = {
  functions: ['BUSINESS'],
  building_name: '',
  line_1: '',
  line_2: '',
  line_3: '',
  months_at_address: '',
  city: '',
  state: '',
  post_town: '',
  postal_code: '',
  country: 'GB',
  phone: {
    country_code: '44',
    subscriber_number: ''
  }
};

export default function AddressesStep({ 
  data, 
  onComplete 
}: AddressesStepProps) {
  const [addresses, setAddresses] = useState(
    data.addresses?.length > 0 
      ? data.addresses 
      : [{ 
          functions: ['BUSINESS'], 
          line_1: '', 
          city: '', 
          postal_code: '', 
          country: 'GB' 
        }]
  );

  // Initialize form data from props only once
  useEffect(() => {
    // No need to update parent here
  }, []);

  const handleAddressChange = (index: number, field: string, value: string) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [field]: value
    };
    
    setAddresses(updatedAddresses);
    
    // Update parent when addresses change
    onComplete({
      addresses: updatedAddresses
    });
  };

  const handleFunctionChange = (index: number, value: string) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      functions: [value]
    };
    
    setAddresses(updatedAddresses);
    
    // Update parent when addresses change
    onComplete({
      addresses: updatedAddresses
    });
  };

  const addAddress = () => {
    const newAddresses = [
      ...addresses,
      { functions: ['BUSINESS'], line_1: '', city: '', postal_code: '', country: 'GB' }
    ];
    
    setAddresses(newAddresses);
    
    // Update parent when addresses change
    onComplete({
      addresses: newAddresses
    });
  };

  const removeAddress = (index: number) => {
    if (addresses.length === 1) return;
    
    const newAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(newAddresses);
    
    // Update parent when addresses change
    onComplete({
      addresses: newAddresses
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Addresses</h2>
      <p className="text-sm text-gray-500">
        Add addresses for your business. At least one business address is required.
      </p>

      {addresses.map((address, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="font-medium">Address {index + 1}</div>
            {addresses.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeAddress(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`address-function-${index}`}>Address Type *</Label>
            <Select
              value={address.functions[0]}
              onValueChange={(value) => handleFunctionChange(index, value)}
            >
              <SelectTrigger id={`address-function-${index}`}>
                <SelectValue placeholder="Select address type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BUSINESS">Business</SelectItem>
                <SelectItem value="MAILING">Mailing</SelectItem>
                <SelectItem value="SHIPPING">Shipping</SelectItem>
                <SelectItem value="BILLING">Billing</SelectItem>
                <SelectItem value="OPERATIONS">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`address-line-1-${index}`}>Address Line 1 *</Label>
              <Input
                id={`address-line-1-${index}`}
                value={address.line_1}
                onChange={(e) => handleAddressChange(index, 'line_1', e.target.value)}
                placeholder="Street address"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`address-line-2-${index}`}>Address Line 2</Label>
              <Input
                id={`address-line-2-${index}`}
                value={address.line_2 || ''}
                onChange={(e) => handleAddressChange(index, 'line_2', e.target.value)}
                placeholder="Apt, Suite, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`address-city-${index}`}>City *</Label>
              <Input
                id={`address-city-${index}`}
                value={address.city}
                onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                placeholder="City"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`address-state-${index}`}>State/Province</Label>
              <Input
                id={`address-state-${index}`}
                value={address.state || ''}
                onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                placeholder="State or province"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`address-postal-code-${index}`}>Postal Code *</Label>
              <Input
                id={`address-postal-code-${index}`}
                value={address.postal_code}
                onChange={(e) => handleAddressChange(index, 'postal_code', e.target.value)}
                placeholder="Postal or ZIP code"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`address-country-${index}`}>Country *</Label>
              <Select
                value={address.country}
                onValueChange={(value) => handleAddressChange(index, 'country', value)}
              >
                <SelectTrigger id={`address-country-${index}`}>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GB">United Kingdom</SelectItem>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                  <SelectItem value="DE">Germany</SelectItem>
                  <SelectItem value="FR">France</SelectItem>
                  {/* Add more countries as needed */}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}

      <Button 
        type="button" 
        variant="outline" 
        onClick={addAddress}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Address
      </Button>
    </div>
  );
} 