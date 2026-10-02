export type Language = 'en' | 'rw';

export type ThemeMode = 'light' | 'dark' | 'white';

export type UserRole = 'visitor' | 'job_seeker' | 'poster' | 'author' | 'moderator' | 'admin';

export type AdvertType = 'job' | 'internship' | 'book' | 'business' | 'consultancy';

export type AdvertStatus = 'draft' | 'awaiting_payment' | 'pending_review' | 'live' | 'expired' | 'rejected';

export type District =
  // Kigali
  | 'Gasabo' | 'Kicukiro' | 'Nyarugenge'
  // Northern Province
  | 'Musanze' | 'Gicumbi' | 'Rulindo' | 'Burera' | 'Gakenke'
  // Southern Province
  | 'Huye' | 'Muhanga' | 'Nyanza' | 'Ruhango' | 'Gisagara' | 'Nyamagabe' | 'Nyaruguru' | 'Kamonyi'
  // Western Province
  | 'Rubavu' | 'Karongi' | 'Rusizi' | 'Nyabihu' | 'Rutsiro' | 'Nyamasheke' | 'Ngororero'
  // Eastern Province
  | 'Rwamagana' | 'Bugesera' | 'Kayonza' | 'Nyagatare' | 'Gatsibo' | 'Kirehe' | 'Ngoma'
  // Remote
  | 'Remote / All Rwanda';

export type JobCategory =
  | 'technology'
  | 'finance_banking'
  | 'ngo_development'
  | 'education_teaching'
  | 'healthcare'
  | 'hospitality_tourism'
  | 'construction_engineering'
  | 'sales_marketing'
  | 'agriculture'
  | 'administration_hr'
  | 'transport_logistics'
  | 'legal_consulting';

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'temporary';

export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'executive';

export interface Advert {
  id: string;
  slug: string;
  type: AdvertType;
  title: string;
  titleRw?: string;
  companyName: string;
  companyLogo?: string;
  rdbTin?: string;
  isVerified: boolean;
  category: JobCategory;
  district: District;
  sector?: string;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  educationLevel: string;
  openings: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  salaryMin?: number;
  salaryMax?: number;
  isSalaryHidden?: boolean;
  deadline: string; // YYYY-MM-DD
  applicationMethod: 'on_site' | 'link' | 'email';
  applicationEmail?: string;
  applicationUrl?: string;
  packageId: string;
  addons: string[];
  status: AdvertStatus;
  featured: boolean;
  urgent: boolean;
  homepageBanner?: boolean;
  startsAt: string;
  expiresAt: string;
  views: number;
  applicationsCount: number;
  createdAt: string;
  posterEmail: string;
  posterPhone: string;
  rejectionReason?: string;
}

export interface Package {
  id: string;
  name: string;
  nameRw: string;
  type: AdvertType;
  priceRwf: number;
  durationDays: number;
  description: string;
  features: string[];
  isRecommended?: boolean;
}

export interface Addon {
  id: string;
  name: string;
  nameRw: string;
  priceRwf: number;
  durationDays: number;
  description: string;
}

export interface BookItem {
  id: string;
  slug: string;
  title: string;
  author: string;
  genre: string;
  language: string;
  priceRwf: number;
  coverUrl: string;
  synopsis: string;
  authorBio: string;
  buyLink?: string;
  phoneContact: string;
  isFeaturedWeek: boolean;
  status: AdvertStatus;
  createdAt: string;
}

export interface Application {
  id: string;
  advertId: string;
  jobTitle: string;
  companyName: string;
  applicantName: string;
  email: string;
  phone: string;
  cvFileName: string;
  coverNote?: string;
  status: 'submitted' | 'reviewed' | 'shortlisted' | 'rejected';
  submittedAt: string;
}

export interface JobAlert {
  id: string;
  keywords: string;
  category: string;
  district: string;
  channel: 'email' | 'sms' | 'whatsapp';
  destination: string;
  frequency: 'daily' | 'weekly';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  category: 'seeker' | 'employer' | 'student' | 'author';
  quote: string;
  quoteRw?: string;
  rating: number;
  approved: boolean;
  createdAt: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  titleRw: string;
  summary: string;
  summaryRw: string;
  content: string;
  category: string;
  readTime: string;
  imageUrl?: string;
  publishedAt: string;
}

export interface PaymentTransaction {
  id: string;
  advertId: string;
  advertTitle: string;
  amountRwf: number;
  method: 'mtn_momo' | 'airtel_money' | 'card' | 'bank_invoice';
  phoneNumber?: string;
  providerRef: string;
  status: 'completed' | 'pending' | 'failed';
  paidAt: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  organizationName?: string;
  rdbTin?: string;
  isVerified: boolean;
  approvalStatus: 'approved' | 'pending_approval' | 'rejected';
  rejectionReason?: string;
  createdAt: string;
}

export interface AccountApprovalRequest {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  requestedRole: 'poster' | 'author';
  organizationName: string;
  rdbTin?: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  passkey?: string;
  grantedAt?: string;
  submittedAt: string;
}
