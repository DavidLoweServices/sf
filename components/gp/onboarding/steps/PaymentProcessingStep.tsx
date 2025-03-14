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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PaymentProcessingStepProps {
  data: any;
  onComplete: (data: any) => void;
}

export default function PaymentProcessingStep({ 
  data, 
  onComplete 
}: PaymentProcessingStepProps) {
  const [processingStats, setProcessingStats] = useState({
    total_monthly_sales_amount: data.payment_processing_statistics?.total_monthly_sales_amount || '',
    average_ticket_sales_amount: data.payment_processing_statistics?.average_ticket_sales_amount || '',
    highest_ticket_sales_amount: data.payment_processing_statistics?.highest_ticket_sales_amount || '',
  });

  const [pricingProfile, setPricingProfile] = useState(data.pricing_profile || 'test');

  const [paymentData, setPaymentData] = useState({
    payment_processing_statistics: {
      total_monthly_sales_amount: data.payment_processing_statistics?.total_monthly_sales_amount || '',
      average_ticket_sales_amount: data.payment_processing_statistics?.average_ticket_sales_amount || '',
      highest_ticket_sales_amount: data.payment_processing_statistics?.highest_ticket_sales_amount || ''
    },
    pricing_profile: data.pricing_profile || 'test',
    payment_methods: data.payment_methods || [{
      functions: ['PRIMARY_PAYOUT'],
      name: 'PRIMARY PAYOUT',
      reference: '',
      bank_transfer: {
        account_holder_type: 'PERSONAL',
        account_type: 'CHECKING',
        account_number: '',
        bank: {
          code: '',
          address: {
            line_1: '',
            line_2: '',
            line_3: '',
            city: '',
            postal_code: '',
            country: 'GB'
          }
        }
      }
    }]
  });

  // Initialize form data from props only once
  useEffect(() => {
    // No need to update parent here
  }, []);

  const handleStatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newStats = {
      ...processingStats,
      [name]: value
    };
    
    setProcessingStats(newStats);
    
    // Update parent when data changes
    onComplete({
      payment_processing_statistics: newStats,
      pricing_profile: pricingProfile
    });
  };

  const handleBankChange = (field: string, value: string) => {
    const updatedMethods = [...paymentData.payment_methods];
    
    if (field.startsWith('bank.')) {
      const bankField = field.split('.')[1];
      if (bankField.startsWith('address.')) {
        const addressField = bankField.split('.')[1];
        updatedMethods[0] = {
          ...updatedMethods[0],
          bank_transfer: {
            ...updatedMethods[0].bank_transfer,
            bank: {
              ...updatedMethods[0].bank_transfer.bank,
              address: {
                ...updatedMethods[0].bank_transfer.bank.address,
                [addressField]: value
              }
            }
          }
        };
      } else {
        updatedMethods[0] = {
          ...updatedMethods[0],
          bank_transfer: {
            ...updatedMethods[0].bank_transfer,
            bank: {
              ...updatedMethods[0].bank_transfer.bank,
              [bankField]: value
            }
          }
        };
      }
    } else if (field.startsWith('bank_transfer.')) {
      const transferField = field.split('.')[1];
      updatedMethods[0] = {
        ...updatedMethods[0],
        bank_transfer: {
          ...updatedMethods[0].bank_transfer,
          [transferField]: value
        }
      };
    } else {
      updatedMethods[0] = {
        ...updatedMethods[0],
        [field]: value
      };
    }

    setPaymentData({
      ...paymentData,
      payment_methods: updatedMethods
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Payment Processing Information</h2>
      <p className="text-sm text-gray-500">
        Provide details about your payment processing expectations and bank information for payouts.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Processing Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total_monthly_sales_amount">Total Monthly Sales (£) *</Label>
              <Input
                id="total_monthly_sales_amount"
                name="total_monthly_sales_amount"
                value={processingStats.total_monthly_sales_amount}
                onChange={handleStatsChange}
                placeholder="e.g. 10000"
                type="number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="average_ticket_sales_amount">Average Transaction Amount (£) *</Label>
              <Input
                id="average_ticket_sales_amount"
                name="average_ticket_sales_amount"
                value={processingStats.average_ticket_sales_amount}
                onChange={handleStatsChange}
                placeholder="e.g. 500"
                type="number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="highest_ticket_sales_amount">Highest Transaction Amount (£) *</Label>
              <Input
                id="highest_ticket_sales_amount"
                name="highest_ticket_sales_amount"
                value={processingStats.highest_ticket_sales_amount}
                onChange={handleStatsChange}
                placeholder="e.g. 5000"
                type="number"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bank Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="account_reference">Account Reference *</Label>
              <Input
                id="account_reference"
                value={paymentData.payment_methods[0].reference}
                onChange={(e) => handleBankChange('reference', e.target.value)}
                placeholder="Your reference for this account"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account_holder_type">Account Holder Type *</Label>
              <Select
                value={paymentData.payment_methods[0].bank_transfer.account_holder_type}
                onValueChange={(value) => handleBankChange('bank_transfer.account_holder_type', value)}
              >
                <SelectTrigger id="account_holder_type">
                  <SelectValue placeholder="Select account holder type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PERSONAL">Personal</SelectItem>
                  <SelectItem value="BUSINESS">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account_type">Account Type *</Label>
              <Select
                value={paymentData.payment_methods[0].bank_transfer.account_type}
                onValueChange={(value) => handleBankChange('bank_transfer.account_type', value)}
              >
                <SelectTrigger id="account_type">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CHECKING">Checking</SelectItem>
                  <SelectItem value="SAVINGS">Savings</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account_number">Account Number *</Label>
              <Input
                id="account_number"
                value={paymentData.payment_methods[0].bank_transfer.account_number}
                onChange={(e) => handleBankChange('bank_transfer.account_number', e.target.value)}
                placeholder="Account Number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank_code">Sort Code / Bank Code *</Label>
              <Input
                id="bank_code"
                value={paymentData.payment_methods[0].bank_transfer.bank.code}
                onChange={(e) => handleBankChange('bank.code', e.target.value)}
                placeholder="e.g. 123456"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-3">Bank Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bank_address_line_1">Address Line 1 *</Label>
                <Input
                  id="bank_address_line_1"
                  value={paymentData.payment_methods[0].bank_transfer.bank.address.line_1}
                  onChange={(e) => handleBankChange('bank.address.line_1', e.target.value)}
                  placeholder="Street Address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank_address_city">City *</Label>
                <Input
                  id="bank_address_city"
                  value={paymentData.payment_methods[0].bank_transfer.bank.address.city}
                  onChange={(e) => handleBankChange('bank.address.city', e.target.value)}
                  placeholder="City"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank_address_postal_code">Postal Code *</Label>
                <Input
                  id="bank_address_postal_code"
                  value={paymentData.payment_methods[0].bank_transfer.bank.address.postal_code}
                  onChange={(e) => handleBankChange('bank.address.postal_code', e.target.value)}
                  placeholder="Postal Code"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank_address_country">Country *</Label>
                <Select
                  value={paymentData.payment_methods[0].bank_transfer.bank.address.country}
                  onValueChange={(value) => handleBankChange('bank.address.country', value)}
                >
                  <SelectTrigger id="bank_address_country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                    <SelectItem value="NZ">New Zealand</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="border-t border-gray-200 pt-4 mt-6">
        <p className="text-xs text-gray-500">* Required fields</p>
      </div>
    </div>
  );
} 