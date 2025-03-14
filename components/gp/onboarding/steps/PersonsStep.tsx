'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

interface PersonsStepProps {
  data: any;
  onComplete: (data: any) => void;
}

export default function PersonsStep({ 
  data, 
  onComplete 
}: PersonsStepProps) {
  const [persons, setPersons] = useState(
    data.persons?.length > 0 
      ? data.persons 
      : [{
          functions: ['APPLICANT', 'BENEFICIAL_OWNER'],
          first_name: '',
          last_name: '',
          email: '',
          date_of_birth: '',
          birth_country: 'GB',
          citizenship_country: 'GB',
          addresses: [{
            functions: ['PERSONAL'],
            line_1: '',
            city: '',
            postal_code: '',
            country: 'GB'
          }]
        }]
  );

  // Initialize form data from props only once
  useEffect(() => {
    // No need to update parent here
  }, []);

  const handlePersonChange = (index: number, field: string, value: string) => {
    const updatedPersons = [...persons];
    updatedPersons[index] = {
      ...updatedPersons[index],
      [field]: value
    };
    
    setPersons(updatedPersons);
    
    // Update parent when persons change
    onComplete({
      persons: updatedPersons
    });
  };

  const handleFunctionChange = (personIndex: number, value: string) => {
    const updatedPersons = [...persons];
    updatedPersons[personIndex] = {
      ...updatedPersons[personIndex],
      functions: [value]
    };
    
    setPersons(updatedPersons);
    
    // Update parent when persons change
    onComplete({
      persons: updatedPersons
    });
  };

  const handleAddressChange = (personIndex: number, addressIndex: number, field: string, value: string) => {
    const updatedPersons = [...persons];
    updatedPersons[personIndex].addresses[addressIndex] = {
      ...updatedPersons[personIndex].addresses[addressIndex],
      [field]: value
    };
    
    setPersons(updatedPersons);
    
    // Update parent when persons change
    onComplete({
      persons: updatedPersons
    });
  };

  const addPerson = () => {
    const newPersons = [
      ...persons,
      {
        functions: ['APPLICANT', 'BENEFICIAL_OWNER'],
        first_name: '',
        last_name: '',
        email: '',
        date_of_birth: '',
        birth_country: 'GB',
        citizenship_country: 'GB',
        addresses: [{
          functions: ['PERSONAL'],
          line_1: '',
          city: '',
          postal_code: '',
          country: 'GB'
        }]
      }
    ];
    
    setPersons(newPersons);
    
    // Update parent when persons change
    onComplete({
      persons: newPersons
    });
  };

  const removePerson = (index: number) => {
    if (persons.length === 1) return;
    
    const newPersons = persons.filter((_, i) => i !== index);
    setPersons(newPersons);
    
    // Update parent when persons change
    onComplete({
      persons: newPersons
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Persons Information</h2>
      <p className="text-sm text-gray-500">
        Add details of individuals associated with the business, such as directors, beneficial owners, and authorized representatives.
      </p>

      {persons.map((person, personIndex) => (
        <div key={personIndex} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="font-medium">Person {personIndex + 1}</div>
            {persons.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removePerson(personIndex)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`person-function-${personIndex}`}>Person Type *</Label>
            <Select
              value={person.functions[0]}
              onValueChange={(value) => handleFunctionChange(personIndex, value)}
            >
              <SelectTrigger id={`person-function-${personIndex}`}>
                <SelectValue placeholder="Select person type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BENEFICIAL_OWNER">Beneficial Owner</SelectItem>
                <SelectItem value="APPLICANT">Applicant</SelectItem>
                <SelectItem value="DIRECTOR">Director</SelectItem>
                <SelectItem value="AUTHORIZED_REPRESENTATIVE">Authorized Representative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`person-first-name-${personIndex}`}>First Name *</Label>
              <Input
                id={`person-first-name-${personIndex}`}
                value={person.first_name}
                onChange={(e) => handlePersonChange(personIndex, 'first_name', e.target.value)}
                placeholder="First name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`person-last-name-${personIndex}`}>Last Name *</Label>
              <Input
                id={`person-last-name-${personIndex}`}
                value={person.last_name}
                onChange={(e) => handlePersonChange(personIndex, 'last_name', e.target.value)}
                placeholder="Last name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`person-email-${personIndex}`}>Email *</Label>
              <Input
                id={`person-email-${personIndex}`}
                value={person.email}
                onChange={(e) => handlePersonChange(personIndex, 'email', e.target.value)}
                placeholder="email@example.com"
                type="email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`person-dob-${personIndex}`}>Date of Birth *</Label>
              <Input
                id={`person-dob-${personIndex}`}
                value={person.date_of_birth}
                onChange={(e) => handlePersonChange(personIndex, 'date_of_birth', e.target.value)}
                placeholder="YYYY-MM-DD"
                type="date"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`person-birth-country-${personIndex}`}>Country of Birth *</Label>
              <Select
                value={person.birth_country}
                onValueChange={(value) => handlePersonChange(personIndex, 'birth_country', value)}
              >
                <SelectTrigger id={`person-birth-country-${personIndex}`}>
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
            
            <div className="space-y-2">
              <Label htmlFor={`person-citizenship-${personIndex}`}>Country of Citizenship *</Label>
              <Select
                value={person.citizenship_country}
                onValueChange={(value) => handlePersonChange(personIndex, 'citizenship_country', value)}
              >
                <SelectTrigger id={`person-citizenship-${personIndex}`}>
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

          <div className="mt-6">
            <h4 className="text-md font-medium mb-3">Personal Address</h4>
            {person.addresses.map((address, addressIndex) => (
              <div key={addressIndex} className="border border-gray-100 rounded-md p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`person-${personIndex}-address-line1-${addressIndex}`}>Address Line 1 *</Label>
                    <Input
                      id={`person-${personIndex}-address-line1-${addressIndex}`}
                      value={address.line_1}
                      onChange={(e) => handleAddressChange(personIndex, addressIndex, 'line_1', e.target.value)}
                      placeholder="Street address"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`person-${personIndex}-address-line2-${addressIndex}`}>Address Line 2</Label>
                    <Input
                      id={`person-${personIndex}-address-line2-${addressIndex}`}
                      value={address.line_2 || ''}
                      onChange={(e) => handleAddressChange(personIndex, addressIndex, 'line_2', e.target.value)}
                      placeholder="Apt, Suite, etc."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`person-${personIndex}-address-city-${addressIndex}`}>City *</Label>
                    <Input
                      id={`person-${personIndex}-address-city-${addressIndex}`}
                      value={address.city}
                      onChange={(e) => handleAddressChange(personIndex, addressIndex, 'city', e.target.value)}
                      placeholder="City"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`person-${personIndex}-address-postal-${addressIndex}`}>Postal Code *</Label>
                    <Input
                      id={`person-${personIndex}-address-postal-${addressIndex}`}
                      value={address.postal_code}
                      onChange={(e) => handleAddressChange(personIndex, addressIndex, 'postal_code', e.target.value)}
                      placeholder="Postal code"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`person-${personIndex}-address-country-${addressIndex}`}>Country *</Label>
                    <Select
                      value={address.country}
                      onValueChange={(value) => handleAddressChange(personIndex, addressIndex, 'country', value)}
                    >
                      <SelectTrigger id={`person-${personIndex}-address-country-${addressIndex}`}>
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
          </div>
        </div>
      ))}

      <Button 
        type="button" 
        variant="outline" 
        onClick={addPerson}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Person
      </Button>
    </div>
  );
} 