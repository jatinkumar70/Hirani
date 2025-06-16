export interface PaymentData {
  payments_uuid: string;
  record_uuid: string;
  record_type: string;
  amount: string;
  currency: string;
  return_url: string;
  payment_provider: string;
  payment_url: string;
  receipt_url: string | null;
  session_id: string;
  payment_intent: string | null;
  placeholder: string;
  payment_provider_dump: PaymentProviderDump;
  status: string;
  created_by_uuid: string | null;
  created_by_name: string | null;
  modified_by_uuid: string | null;
  modified_by_name: string | null;
  create_ts: string;
  insert_ts: string;
}

export interface PaymentProviderDump {
  id: string;
  url: string;
  mode: string;
  locale: string | null;
  object: string;
  status: string;
  consent: string | null;
  created: number;
  invoice: string | null;
  ui_mode: string;
  currency: string;
  customer: string | null;
  livemode: boolean;
  metadata: Metadata;
  discounts: any[];
  cancel_url: string;
  expires_at: number;
  custom_text: CustomText;
  submit_type: string | null;
  success_url: string;
  amount_total: number;
  payment_link: string | null;
  setup_intent: string | null;
  subscription: string | null;
  automatic_tax: AutomaticTax;
  client_secret: string | null;
  custom_fields: any[];
  shipping_cost: string | null;
  total_details: TotalDetails;
  customer_email: string | null;
  payment_intent: string | null;
  payment_status: string;
  recovered_from: string | null;
  amount_subtotal: number;
  adaptive_pricing: AdaptivePricing;
  after_expiration: string | null;
  customer_details: string | null;
  invoice_creation: InvoiceCreation;
  shipping_details: string | null;
  shipping_options: any[];
  customer_creation: string;
  consent_collection: string | null;
  client_reference_id: string | null;
  currency_conversion: string | null;
  payment_method_types: string[];
  allow_promotion_codes: string | null;
  collected_information: string | null;
  payment_method_options: PaymentMethodOptions;
  phone_number_collection: PhoneNumberCollection;
  payment_method_collection: string;
  billing_address_collection: string | null;
  shipping_address_collection: string | null;
  saved_payment_method_options: string | null;
  payment_method_configuration_details: string | null;
}

export interface Metadata {
  record_type: string;
  record_uuid: string;
  payments_uuid: string;
}

export interface CustomText {
  submit: string | null;
  after_submit: string | null;
  shipping_address: string | null;
  terms_of_service_acceptance: string | null;
}

export interface AutomaticTax {
  status: string | null;
  enabled: boolean;
  liability: string | null;
}

export interface TotalDetails {
  amount_tax: number;
  amount_discount: number;
  amount_shipping: number;
}

export interface AdaptivePricing {
  enabled: boolean;
}

export interface InvoiceCreation {
  enabled: boolean;
  invoice_data: InvoiceData;
}

export interface InvoiceData {
  footer: string | null;
  issuer: string | null;
  metadata: Record<string, any>;
  description: string | null;
  custom_fields: string | null;
  account_tax_ids: string | null;
  rendering_options: string | null;
}

export interface PaymentMethodOptions {
  card: {
    request_three_d_secure: string;
  };
}

export interface PhoneNumberCollection {
  enabled: boolean;
}
