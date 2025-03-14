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
import { Textarea } from '@/components/ui/textarea';
import { 
  StepProps, 
  BusinessInfo, 
  BUSINESS_TYPES, 
  LEGAL_ENTITY_TYPES 
} from '../types';

export default function BusinessInformationStep({ 
  data, 
  onComplete 
}: StepProps) {
  const [formData, setFormData] = useState<BusinessInfo>({
    name: data.businessInfo?.name || '',
    type: data.businessInfo?.type || 'MERCHANT',
    legal_name: data.businessInfo?.legal_name || '',
    dba: data.businessInfo?.dba || '',
    merchant_category_code: data.businessInfo?.merchant_category_code || '',
    website: data.businessInfo?.website || '',
    description: data.businessInfo?.description || '',
    registration_number: data.businessInfo?.registration_number || '',
    ip_address: data.businessInfo?.ip_address || '',
    notification_email: data.businessInfo?.notification_email || '',
    legal_entity: data.businessInfo?.legal_entity || 'LIMITED_COMPANY',
    reference: data.businessInfo?.reference || '',
    language: data.businessInfo?.language || 'en'
  });

  // Initialize form data from props only once
  useEffect(() => {
    // No need to update parent here
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Update parent when form data changes
      onComplete({
        businessInfo: newData
      });
      
      return newData;
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Update parent when form data changes
      onComplete({
        businessInfo: newData
      });
      
      return newData;
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Business Information</h2>
      <p className="text-sm text-gray-500">
        Provide basic information about the business that will be onboarded to the payment processing system.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Business Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Business Name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Business Type *</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleSelectChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(BUSINESS_TYPES).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="legal_name">Legal Name *</Label>
          <Input
            id="legal_name"
            name="legal_name"
            value={formData.legal_name}
            onChange={handleChange}
            placeholder="Legal Business Name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dba">Doing Business As (DBA)</Label>
          <Input
            id="dba"
            name="dba"
            value={formData.dba}
            onChange={handleChange}
            placeholder="DBA Name (if different)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="merchant_category_code">Merchant Category Code *</Label>
          <Input
            id="merchant_category_code"
            name="merchant_category_code"
            value={formData.merchant_category_code}
            onChange={handleChange}
            placeholder="e.g. 5999"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Business Website</Label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://www.example.com"
            type="url"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Business Description *</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the business and its products/services"
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="registration_number">Registration Number *</Label>
          <Input
            id="registration_number"
            name="registration_number"
            value={formData.registration_number}
            onChange={handleChange}
            placeholder="Business Registration Number"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notification_email">Notification Email *</Label>
          <Input
            id="notification_email"
            name="notification_email"
            value={formData.notification_email}
            onChange={handleChange}
            placeholder="notifications@example.com"
            type="email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="legal_entity">Legal Entity Type *</Label>
          <Select
            value={formData.legal_entity}
            onValueChange={(value) => handleSelectChange('legal_entity', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select legal entity type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(LEGAL_ENTITY_TYPES).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reference">Business Reference</Label>
          <Input
            id="reference"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            placeholder="Your internal reference"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-6">
        <p className="text-xs text-gray-500">* Required fields</p>
      </div>
    </div>
  );
} 