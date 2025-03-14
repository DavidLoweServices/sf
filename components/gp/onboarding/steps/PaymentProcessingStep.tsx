'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  StepProps, 
  PaymentProcessingStatistics
} from '../types';

export default function PaymentProcessingStep({ 
  data, 
  onComplete 
}: StepProps) {
  const [processingStats, setProcessingStats] = useState<PaymentProcessingStatistics>({
    total_monthly_sales_amount: data.payment_processing_statistics?.total_monthly_sales_amount || '',
    average_ticket_sales_amount: data.payment_processing_statistics?.average_ticket_sales_amount || '',
    highest_ticket_sales_amount: data.payment_processing_statistics?.highest_ticket_sales_amount || '',
  });

  const [pricingProfile, setPricingProfile] = useState(data.pricing_profile || 'test');

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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Payment Processing Information</h2>
      <p className="text-sm text-gray-500">
        Provide information about the payment processing volumes and transaction sizes.
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Transaction Volumes</h3>
          <p className="text-sm text-gray-500 mb-4">
            Please provide your expected monthly sales volumes and transaction sizes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total_monthly_sales_amount">
                Total Monthly Sales (GBP) *
              </Label>
              <Input
                id="total_monthly_sales_amount"
                name="total_monthly_sales_amount"
                value={processingStats.total_monthly_sales_amount}
                onChange={handleStatsChange}
                placeholder="e.g. 50000"
                type="number"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="average_ticket_sales_amount">
                Average Transaction Size (GBP) *
              </Label>
              <Input
                id="average_ticket_sales_amount"
                name="average_ticket_sales_amount"
                value={processingStats.average_ticket_sales_amount}
                onChange={handleStatsChange}
                placeholder="e.g. 100"
                type="number"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="highest_ticket_sales_amount">
                Highest Transaction Size (GBP) *
              </Label>
              <Input
                id="highest_ticket_sales_amount"
                name="highest_ticket_sales_amount"
                value={processingStats.highest_ticket_sales_amount}
                onChange={handleStatsChange}
                placeholder="e.g. 1000"
                type="number"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-xs text-gray-500">* Required fields</p>
        </div>
      </div>
    </div>
  );
} 