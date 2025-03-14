// Business Information Types
export interface BusinessInfo {
  name: string;
  type: string;
  legal_name: string;
  dba: string;
  merchant_category_code: string;
  website: string;
  description: string;
  registration_number: string;
  ip_address: string;
  notification_email: string;
  legal_entity: string;
  reference: string;
  language: string;
}

// Address Types
export interface PhoneInfo {
  country_code: string;
  subscriber_number: string;
}

export interface Address {
  functions: string[];
  building_name?: string;
  line_1: string;
  line_2?: string;
  line_3?: string;
  months_at_address?: string;
  city: string;
  state?: string;
  post_town?: string;
  postal_code: string;
  country: string;
  phone?: PhoneInfo;
}

// Payment Processing Types
export interface PaymentProcessingStatistics {
  total_monthly_sales_amount: string;
  average_ticket_sales_amount: string;
  highest_ticket_sales_amount: string;
}

export interface BankAddress {
  line_1: string;
  line_2?: string;
  line_3?: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface BankInfo {
  code: string;
  address: BankAddress;
}

export interface BankTransfer {
  account_holder_type: string;
  account_type: string;
  account_number: string;
  bank: BankInfo;
}

export interface PaymentMethod {
  functions: string[];
  name: string;
  reference: string;
  bank_transfer: BankTransfer;
}

// Person Types
export interface PersonAddress {
  functions: string[];
  building_name?: string;
  building_number?: string;
  line_1: string;
  line_2?: string;
  line_3?: string;
  reference?: string;
  months_at_address?: string;
  city: string;
  state?: string;
  post_town?: string;
  postal_code: string;
  country: string;
  contact_phone?: PhoneInfo;
  work_phone?: PhoneInfo;
}

export interface Person {
  functions: string[];
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  birth_country: string;
  citizenship_country: string;
  job_title?: string;
  equity_percentage?: string;
  addresses: PersonAddress[];
}

// Attestation Types
export interface Attestation {
  name: string;
  ip_address: string;
  time_of_attestation: string;
}

export interface Notifications {
  status_url: string;
}

// Main Onboarding Data Structure
export interface OnboardingData {
  businessInfo: BusinessInfo;
  addresses: Address[];
  payment_processing_statistics: PaymentProcessingStatistics;
  pricing_profile: string;
  payment_methods: PaymentMethod[];
  persons: Person[];
  attestations: Attestation[];
  notifications: Notifications;
}

// Step Props Interface
export interface StepProps {
  data: OnboardingData;
  onComplete: (data: Partial<OnboardingData>) => void;
}

// Defined constants for use in dropdowns
export const BUSINESS_TYPES = {
  MERCHANT: 'Merchant',
  INDIVIDUAL: 'Individual',
  PARTNER: 'Partner'
};

export const LEGAL_ENTITY_TYPES = {
  LIMITED_COMPANY: 'Limited Company',
  SOLE_PROPRIETORSHIP: 'Sole Proprietorship',
  PARTNERSHIP: 'Partnership',
  PUBLIC_COMPANY: 'Public Company',
  CHARITY: 'Charity / Non-profit'
};

export const ADDRESS_FUNCTIONS = {
  BUSINESS: 'Business',
  MAILING: 'Mailing',
  SHIPPING: 'Shipping',
  BILLING: 'Billing',
  OPERATIONS: 'Operations'
};

export const ACCOUNT_HOLDER_TYPES = {
  PERSONAL: 'Personal',
  BUSINESS: 'Business'
};

export const ACCOUNT_TYPES = {
  CHECKING: 'Checking',
  SAVINGS: 'Savings'
};

export const PERSON_FUNCTIONS = {
  BENEFICIAL_OWNER: 'Beneficial Owner',
  APPLICANT: 'Applicant',
  DIRECTOR: 'Director',
  AUTHORIZED_REPRESENTATIVE: 'Authorized Representative'
};

export const COUNTRIES = {
  GB: 'United Kingdom',
  US: 'United States',
  CA: 'Canada',
  AU: 'Australia',
  DE: 'Germany',
  FR: 'France'
}; 