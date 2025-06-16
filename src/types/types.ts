import { StaticImageData } from "next/image";

export interface ShopProps {
  products: IProducts[];
  singleProduct?: IProducts[] | null | undefined;
}

export interface IProducts {
  product_id: number;
  product_code: string;
  product_name: string;
  brand_code: string;
  brand_name: string;
  category_code: string;
  category_name: string;
  description: string;
  product_availibility: string;
  image: string;
  unique_product: string;
  vehicle_make: any;
  vehicle_model: any;
  product_available_quantity: number;
  compatible_with_suv: string;
  compatible_with_sedan: string;
  compatible_with_hatchback: string;
  product_order_limit: number;
  package_price_excluding_gst: number;
  price: number;
  gst_percentage: number;
  gst_amount: number;
  vehicle_category: any;
  yt_walkthrough_video: string[];
  status: string;
  comment: any;
  create_dt: string;
  insert_dt: string;
}

export interface HotelListData {
  property_details_id: number;
  property_details_unique_id: number;
  id: number;
  account: Account;
  property_details_uuid: string;
  currency: string;
  user_uuid: string;
  user_name: any;
  property_details_name: string;
  property_details_profile_pic: any;
  property_type: string;
  property_subtype: any;
  phone: string;
  mobile: string;
  fax: string;
  email: string;
  web: string;
  contactFirstName: string;
  contactLastName: string;
  checkin_time: string;
  checkInEnd: string;
  checkout_time: string;
  offerType: string;
  controlPriority: number;
  sellPriority: number;
  bookingPageMultiplier: string;
  permit: string;
  roomChargeDisplay: string;
  templates: Templates;
  paymentCollection: PaymentCollection;
  paymentGateways: PaymentGateways;
  cardSettings: CardSettings;
  groupKeywords: any[];
  oneTimeVouchers: any[];
  discountVouchers: DiscountVoucher[];
  featureCodes: string[][];
  bookingQuestions: BookingQuestions;
  webhooks: Webhooks;
  food_and_dinning: any;
  property_policies: PropertyPolicies;
  rule_allowed: any;
  rule_not_allowed: any;
  property_address_line_1: string;
  property_address_line_2: any;
  property_city: string;
  property_state: string;
  property_pincode: string;
  property_country: string;
  longitude: number;
  latitude: number;
  property_highlights: any;
  max_occupancy: any;
  available_beds: any;
  area_in_bhk: any;
  property_images: any;
  property_place_id: any;
  about_property: any;
  amenities: any;
  status: string;
  created_by_uuid: any;
  created_by_name: any;
  modified_by_uuid: any;
  modified_by_name: any;
  create_ts: string;
  insert_ts: string;
  property_rating: any;
  price: number;
}

export interface Account {
  ownerId: number;
}

export interface Templates {
  template1: string;
  template2: string;
  template3: string;
  template4: string;
  template5: string;
  template6: string;
  template7: string;
  template8: string;
}

export interface PaymentCollection {
  depositPayment1: DepositPayment1;
  depositPayment2: DepositPayment2;
  depositNonPayment: string;
}

export interface DepositPayment1 {
  fixedAmount: number;
  variableAmount: VariableAmount;
}

export interface VariableAmount {
  type: string;
  percentageValue: number;
}

export interface DepositPayment2 {
  fixedAmount: number;
  variableAmount: VariableAmount2;
}

export interface VariableAmount2 {
  type: string;
  percentageValue: number;
}

export interface PaymentGateways {
  bitpay: Bitpay;
  borgun: Borgun;
  paypal: Paypal;
  stripe: Stripe;
  asiapay: Asiapay;
  paymill: Paymill;
  creditCard: CreditCard;
  authorizenet: Authorizenet;
  customGateway: CustomGateway;
  offlinePayment: OfflinePayment;
  globalPayments1: GlobalPayments1;
  globalPayments2: GlobalPayments2;
}

export interface Bitpay {
  type: string;
}

export interface Borgun {
  type: string;
}

export interface Paypal {
  type: string;
}

export interface Stripe {
  type: string;
  capture: boolean;
  priority: number;
  saveAllCards: boolean;
  checkoutVersion: string;
  paymentDescription: string;
}

export interface Asiapay {
  type: string;
}

export interface Paymill {
  type: string;
}

export interface CreditCard {
  type: string;
}

export interface Authorizenet {
  type: string;
}

export interface CustomGateway {
  type: string;
}

export interface OfflinePayment {
  type: string;
}

export interface GlobalPayments1 {
  type: string;
}

export interface GlobalPayments2 {
  type: string;
}

export interface CardSettings {
  cardAcceptJcb: boolean;
  cardAcceptAmex: boolean;
  cardAcceptVisa: boolean;
  cardRequireCVV: boolean;
  cardAcceptDiners: boolean;
  cardAcceptMaster: boolean;
  cardAcceptEnroute: boolean;
  cardAcceptMaestro: boolean;
  cardAcceptVoyager: boolean;
  cardAcceptDiscover: boolean;
  cardAcceptUnionpay: boolean;
}

export interface DiscountVoucher {
  type: string;
  number: number;
  phrase: string;
  discount: number;
}

export interface BookingQuestions {
  guestFax: GuestFax;
  guestCity: GuestCity;
  guestEmail: GuestEmail;
  guestPhone: GuestPhone;
  guestState: GuestState;
  guestTitle: GuestTitle;
  guestMobile: GuestMobile;
  guestAddress: GuestAddress;
  guestCompany: GuestCompany;
  guestComments: GuestComments;
  guestLastName: GuestLastName;
  guestPostcode: GuestPostcode;
  guestFirstName: GuestFirstName;
  customQuestion1: CustomQuestion1;
  customQuestion2: CustomQuestion2;
  customQuestion3: CustomQuestion3;
  customQuestion4: CustomQuestion4;
  customQuestion5: CustomQuestion5;
  customQuestion6: CustomQuestion6;
  customQuestion7: CustomQuestion7;
  customQuestion8: CustomQuestion8;
  customQuestion9: CustomQuestion9;
  customQuestion10: CustomQuestion10;
  guestArrivalTime: GuestArrivalTime;
  guestCountryText: GuestCountryText;
  guestCountrySelect: GuestCountrySelect;
}

export interface GuestFax {
  order: number;
  usage: string;
}

export interface GuestCity {
  order: number;
  usage: string;
}

export interface GuestEmail {
  order: number;
  usage: string;
}

export interface GuestPhone {
  order: number;
  usage: string;
}

export interface GuestState {
  order: any;
  usage: string;
}

export interface GuestTitle {
  order: number;
  usage: string;
}

export interface GuestMobile {
  order: number;
  usage: string;
}

export interface GuestAddress {
  order: number;
  usage: string;
}

export interface GuestCompany {
  order: any;
  usage: string;
}

export interface GuestComments {
  order: number;
  usage: string;
}

export interface GuestLastName {
  order: number;
  usage: string;
}

export interface GuestPostcode {
  order: number;
  usage: string;
}

export interface GuestFirstName {
  order: number;
  usage: string;
}

export interface CustomQuestion1 {
  type: string;
  order: number;
  usage: string;
}

export interface CustomQuestion2 {
  type: string;
  order: number;
  usage: string;
}

export interface CustomQuestion3 {
  type: string;
  order: number;
  usage: string;
}

export interface CustomQuestion4 {
  type: string;
  order: number;
  usage: string;
}

export interface CustomQuestion5 {
  type: string;
  order: number;
  usage: string;
}

export interface CustomQuestion6 {
  type: string;
  order: number;
  usage: string;
}

export interface CustomQuestion7 {
  type: string;
  order: number;
  usage: string;
}

export interface CustomQuestion8 {
  type: string;
  order: number;
  usage: string;
}

export interface CustomQuestion9 {
  type: string;
  order: number;
  usage: string;
}

export interface CustomQuestion10 {
  type: string;
  order: number;
  usage: string;
}

export interface GuestArrivalTime {
  order: number;
  usage: string;
}

export interface GuestCountryText {
  order: number;
  usage: string;
}

export interface GuestCountrySelect {
  order: number;
  usage: string;
}

export interface Webhooks {
  url: string;
  version: string;
  customHeader: string;
  additionalData: string;
}

export interface PropertyPolicies {
  bookingType: string;
  priceRounding: string;
  dailyPriceType: string;
  bookingNearType: string;
  bookingCutOffHour: number;
  vatRatePercentage: number;
  dailyPriceStrategy: string;
  bookingNearTypeDays: any;
  allowGuestCancellation: AllowGuestCancellation;
  bookingExceptionalType: string;
  bookingExceptionalTypeEnd: string;
  bookingExceptionalTypeStart: string;
}

export interface AllowGuestCancellation {
  type: string;
}

export interface GridImage {
  id: string;
  src: StaticImageData;
  alt: string;
  title: string;
  description: string;
  aspectRatio?: "landscape" | "square";
  hotelLocation: string;
  link: string;
}

export interface ImageGridProps {
  topImages: GridImage[];
  bottomImages: GridImage[];
  className?: string;
}

interface Amenity {
  code: string;
  icon: string;
  name: string;
  category: string;
  master_amenities_uuid: string;
}

interface AmenityCategory {
  category: string;
  amenities: Amenity[];
}

export interface HotelAmenitiesProps {
  amenities?: AmenityCategory[];
}

export interface Property {
  id: string;
  property_details_uuid: string;
  title: string;
  slug: string;
  currency: string;
  description: string | null;
  images: ImageCategory[];
  location: Location;
  details: PropertyDetails;
  non_refundable_price: number;
  booking_request: number;
  yt_walkthrough_video: string[];
  floor_plan: string[];
  from_date: string;
  to_date: string;
  amenities: AmenityCategory[];
}

export interface ImageCategory {
  paths: string[];
  album_name: string;
}

export interface Location {
  city: string;
  area: string;
  state: string;
  postal_code: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface PropertyDetails {
  available_beds: number;
  bathroom_full: number;
  bathroom_half: number;
  bedrooms: number;
  double_beds: number;
  guests: number;
  is_pet_friendly: 1;
  king_beds: number;
  max_stay: number;
  min_stay: number;
  queen_beds: number;
  rating: 5;
  single_beds: number;
  tag: string;
}

export interface User {
  assigned_phone_number: string | null;
  branch_name: string | null;
  branch_uuid: string | null;
  city: string | null;
  country: string | null;
  created_by_name: string | null;
  created_by_uuid: string;
  date_of_birth: string | null;
  department: string | null;
  documents: string | null;
  email: string;
  fax: string | null;
  first_name: string;
  hire_date: string | null;
  home_phone: string | null;
  job_title: string | null;
  languages_known: string | null;
  last_day_at_work: string | null;
  last_name: string;
  linkedin_profile: string | null;
  mobile: string | null;
  mother_maiden_name: string | null;
  name: string;
  personal_email: string;
  photo: string | "/placeholder.svg?height=300&width=300";
  postal_code: string | null;
  province_or_state: string | null;
  role_uuid: string;
  role_value: string;
  shared_email: string | null;
  signature: string | null;
  status: string;
  street_address: string | null;
  unit_or_suite: string | null;
  user_dim_id: number;
  user_dim_unique_id: number;
  user_fact_unique_id: number;
  user_profile_id: number;
  user_profile_unique_id: number;
  user_type: string | null;
  user_uuid: string;
  username: string;
}

export interface IInventoryPrice {
  inventory_uuid: number;
  property_details_uuid: string;
  property_details_name: string;
  room_types_uuid: string;
  room_types_name: string;
  available_room: number;
  refundable_price: number;
  non_refundable_price: number;
  calendar_uuid: string;
  calendar_date: string;
}

export interface ISourceType {
  cleaning_fee: number;
  damage_waiver: number;
  tourism_fee: number;
  service_fee: number;
  pet_charges: number;
  vat: number;
}

export interface IPriceBreakup {
  total_nights: number;
  per_night_price: number;
  total_for_price: number;
  breakup_per_night_price: number;
  accommodation_fee: number;
  cleaning_fee: number;
  damage_waiver: number;
  tourism_fee: number;
  service_fee: number;
  pet_charges: number;
  vat: number;
  total_breakup_tax: number;
  total: number;
  source: ISourceType;
}

export interface IDiscount {
  cleaning_fee: number;
  [key: string]: number;
}

export type IChargesBreakupResponse =
  | {
      is_valid_voucher: true;
      before_discount: IPriceBreakup;
      after_discount: IPriceBreakup;
      discount: IDiscount;
    }
  | {
      is_valid_voucher: false;
      before_discount: IPriceBreakup;
    };

export type Package = "normal" | "flexi" | "premium";
export type AddOn = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  includedWithPremium?: boolean;
  price: number;
};

export interface PropertyImage {
  album_name: string;
  paths: string[];
}
