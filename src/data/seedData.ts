import { Advert, Package, Addon, BookItem, Testimonial, Article } from '../types';

export const INITIAL_PACKAGES: Package[] = [
  {
    id: 'basic',
    name: 'Basic Job Advert',
    nameRw: 'Itangazo ry\'Ibanze',
    type: 'job',
    priceRwf: 10000,
    durationDays: 30,
    description: 'Perfect for single job or internship postings needing standard visibility.',
    features: [
      'Published for 30 calendar days',
      'Searchable across all districts & categories',
      'Receive applications directly or external link',
      'Basic listing badge'
    ]
  },
  {
    id: 'standard',
    name: 'Standard Package',
    nameRw: 'Paki Isanzwe',
    type: 'job',
    priceRwf: 20000,
    durationDays: 30,
    description: 'Job advert with prominent company logo, website link, and highlighted profile.',
    features: [
      'Published for 30 calendar days',
      'Company logo displayed on search cards',
      'Direct link to company website or careers portal',
      'Applicant dashboard management & CSV export',
      'Social share optimization'
    ]
  },
  {
    id: 'featured',
    name: 'Featured Job Advert',
    nameRw: 'Itangazo Ryihariye',
    type: 'job',
    priceRwf: 35000,
    durationDays: 30,
    isRecommended: true,
    description: 'Top placement in search results, highlighted card styling, and homepage feature.',
    features: [
      'Pinned to top of search results for 30 days',
      'Special "Featured" gold highlight badge',
      'Inclusion in weekly Job Alerts email & WhatsApp digest',
      'Full employer applicant tracking system',
      'Priority moderation review (under 6 hours)'
    ]
  },
  {
    id: 'book_listing',
    name: 'Author Book Listing',
    nameRw: 'Gushyiraho Igitabo',
    type: 'book',
    priceRwf: 8000,
    durationDays: 60,
    description: 'Showcase your book with cover, synopsis, author bio, and direct purchase contact.',
    features: [
      'Active for 60 calendar days',
      'Book cover, synopsis, excerpt & author profile',
      'Direct reader WhatsApp or bookstore order link',
      'Categorized in Books catalog'
    ]
  },
  {
    id: 'book_featured',
    name: 'Featured Book of the Week',
    nameRw: 'Igitabo cy\'Icyumweru',
    type: 'book',
    priceRwf: 15000,
    durationDays: 14,
    description: 'Homepage spotlight slot as Book of the Week with maximum reader exposure.',
    features: [
      '14 days prominent placement on Akazi homepage',
      'Special badge & featured author interview excerpt',
      'Direct WhatsApp and purchase links',
      'Promotion in weekly reader bulletin'
    ]
  },
  {
    id: 'business_advert',
    name: 'Business & Service Advert',
    nameRw: 'Itangazo ry\'Ubucuruzi',
    type: 'business',
    priceRwf: 15000,
    durationDays: 30,
    description: 'Promote your company services, consulting practice, or institutional notice.',
    features: [
      'Published for 30 calendar days',
      'Banner and company contact showcase',
      'Call-to-action button to your WhatsApp or site',
      'High visibility in business listings'
    ]
  },
  {
    id: 'bundle_5',
    name: 'Employer Bundle (5 Ads)',
    nameRw: 'Paki y\'Abakoresha (Amatangazo 5)',
    type: 'job',
    priceRwf: 80000,
    durationDays: 90,
    description: 'Cost-effective bundle for growing businesses hiring multiple roles in 3 months.',
    features: [
      '5 Standard/Featured job slots (Save 20%)',
      'Valid for 90 days from purchase',
      'Dedicated employer dashboard & candidate shortlisting',
      'Priority verification & invoicing'
    ]
  },
  {
    id: 'bundle_15',
    name: 'Employer Bundle (15 Ads)',
    nameRw: 'Paki Nini y\'Abakoresha (Amatangazo 15)',
    type: 'job',
    priceRwf: 20000,
    durationDays: 365,
    description: 'Comprehensive hiring package for large institutions, NGOs, and corporations.',
    features: [
      '15 Job listings across 12 months (Save 35%)',
      'Dedicated account manager assistance',
      'Company profile page with all active openings',
      'Official RDB tax invoice & automated bank receipt'
    ]
  }
];

export const INITIAL_ADDONS: Addon[] = [
  {
    id: 'urgent_badge',
    name: 'Urgent Hiring Badge',
    nameRw: 'Ikimenyetso cy\'Ubwihutirwe',
    priceRwf: 5000,
    durationDays: 7,
    description: 'Bright red "Urgent" marker attracting 3x more qualified immediate applications.'
  },
  {
    id: 'social_push',
    name: 'Social Media Promotion',
    nameRw: 'Kwamamaza ku Mbuga Nkoranyambaga',
    priceRwf: 5000,
    durationDays: 1,
    description: 'Dedicated broadcast across Akazi’s LinkedIn, X (Twitter), Facebook, and Instagram.'
  },
  {
    id: 'homepage_banner',
    name: 'Homepage Banner Showcase',
    nameRw: 'Kugaragara ku Rukuta rw\'Ibanze',
    priceRwf: 50000,
    durationDays: 14,
    description: 'Prime top visual placement on the Akazi.com homepage for maximum brand visibility.'
  }
];

export const INITIAL_ADVERTS: Advert[] = [
  {
    id: 'adv-001',
    slug: 'senior-fullstack-engineer-irembo-kigali',
    type: 'job',
    title: 'Senior Full Stack Software Engineer (FinTech & GovTech)',
    titleRw: 'Inzobere mu Gutunganya Porogaramu (Full Stack)',
    companyName: 'Irembo GovTech',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80',
    rdbTin: '100492817',
    isVerified: true,
    category: 'technology',
    district: 'Nyarugenge',
    sector: 'Kiyovu',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    educationLevel: 'Bachelor\'s in Computer Science or Software Engineering',
    openings: 2,
    description: 'Irembo is building the digital backbone of citizen public services in Rwanda. We are looking for an experienced Senior Full Stack Engineer to lead architecture, build robust microservices, and deliver scalable digital platforms used by millions of citizens and residents across Rwanda.',
    responsibilities: [
      'Architect and develop resilient public-facing citizen services in TypeScript, Node.js, and React',
      'Optimize database queries on PostgreSQL and ensure 99.9% uptime for national public APIs',
      'Mentor junior Rwandan developers and participate in rigorous peer code reviews',
      'Collaborate with product designers and government stakeholders on intuitive user experiences'
    ],
    requirements: [
      '5+ years of full stack software engineering experience',
      'Strong proficiency in TypeScript, React, Node.js, and relational databases (PostgreSQL)',
      'Experience with REST APIs, OAuth, and payment gateway integrations (MTN MoMo, card systems)',
      'Fluency in English and Kinyarwanda; French is an added advantage'
    ],
    salaryMin: 1800000,
    salaryMax: 2600000,
    isSalaryHidden: false,
    deadline: '2026-10-31',
    applicationMethod: 'on_site',
    applicationEmail: 'careers@irembo.rw',
    packageId: 'featured',
    addons: ['urgent_badge', 'social_push'],
    status: 'live',
    featured: true,
    urgent: true,
    homepageBanner: true,
    startsAt: '2026-09-25',
    expiresAt: '2026-10-31',
    views: 842,
    applicationsCount: 19,
    createdAt: '2026-09-25T08:00:00Z',
    posterEmail: 'recruitment@irembo.rw',
    posterPhone: '+250 788 123 456'
  },
  {
    id: 'adv-002',
    slug: 'commercial-banking-credit-analyst-bk-kigali',
    type: 'job',
    title: 'Senior Credit Risk Analyst - Corporate & SME',
    titleRw: 'Umusesenguzi w\'Inguzanyo z\'Ubucuruzi n\'Ibigo',
    companyName: 'Bank of Kigali Plc',
    companyLogo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=150&auto=format&fit=crop&q=80',
    rdbTin: '100012398',
    isVerified: true,
    category: 'finance_banking',
    district: 'Gasabo',
    sector: 'Kacyiru',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    educationLevel: 'Bachelor\'s in Finance, Economics, or Accounting (CPA/ACCA is a plus)',
    openings: 3,
    description: 'Bank of Kigali is the largest commercial bank in Rwanda. We seek an analytical Senior Credit Risk Analyst to appraise corporate and SME loan facilities, conduct financial sensitivity models, and recommend credit sanctions that foster Rwandan economic development.',
    responsibilities: [
      'Analyze balance sheets, cash flow statements, and business plans for corporate borrowing clients',
      'Structure loan covenants and assess creditworthiness in alignment with National Bank of Rwanda (BNR) regulations',
      'Prepare detailed credit sanction memos for the Bank Credit Committee',
      'Monitor portfolio performance and early warning indicators on ongoing facilities'
    ],
    requirements: [
      'Minimum 3 years of commercial banking credit risk assessment experience',
      'Advanced financial modeling skills in Microsoft Excel and ERP financial software',
      'Deep understanding of Rwandan commercial law, collateral appraisal, and RDB registrations',
      'High analytical rigor, precision, and ethical standards'
    ],
    salaryMin: 1200000,
    salaryMax: 1700000,
    isSalaryHidden: false,
    deadline: '2026-10-25',
    applicationMethod: 'on_site',
    applicationEmail: 'hr@bk.rw',
    packageId: 'standard',
    addons: [],
    status: 'live',
    featured: false,
    urgent: false,
    startsAt: '2026-09-28',
    expiresAt: '2026-10-28',
    views: 615,
    applicationsCount: 28,
    createdAt: '2026-09-28T09:30:00Z',
    posterEmail: 'talent@bk.rw',
    posterPhone: '+250 788 380 000'
  },
  {
    id: 'adv-003',
    slug: 'software-qa-testing-internship-ampersand-kigali',
    type: 'internship',
    title: 'IoT & Telematics Software QA Internship (6 Months Paid)',
    titleRw: 'Kwimenyereza Umwuga: Isuzuma rya Porogaramu (QA)',
    companyName: 'Ampersand E-Mobility Rwanda',
    companyLogo: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=150&auto=format&fit=crop&q=80',
    rdbTin: '106829144',
    isVerified: true,
    category: 'technology',
    district: 'Kicukiro',
    sector: 'Gikondo',
    employmentType: 'internship',
    experienceLevel: 'entry',
    educationLevel: 'Final-year student or recent graduate in Computer Science or Electrical Engineering',
    openings: 4,
    description: 'Ampersand is Africa’s leading electric motorcycle company, headquartered in Kigali. We are offering a paid 6-month hands-on Software & IoT Quality Assurance internship. Interns will work directly with our engineering team testing battery swap station telematics, driver mobile apps, and smart meter sensors.',
    responsibilities: [
      'Write manual test cases and automated regression scripts for mobile battery management apps',
      'Verify Bluetooth telemetry data transmission between smart batteries and cloud servers',
      'Log reproducible bug tickets on Jira with detailed diagnostic logs',
      'Participate in field tests at battery swap hubs across Kigali'
    ],
    requirements: [
      'Recent graduate or final year student from a recognized Rwandan university or TVET college',
      'Basic understanding of QA testing principles, Python, or JavaScript',
      'Passion for clean energy, electric mobility, and environmental sustainability in Rwanda',
      'Curious, proactive mindset and good communication skills'
    ],
    salaryMin: 350000,
    salaryMax: 450000,
    isSalaryHidden: false,
    deadline: '2026-10-20',
    applicationMethod: 'on_site',
    applicationEmail: 'careers@ampersand.solar',
    packageId: 'featured',
    addons: ['urgent_badge'],
    status: 'live',
    featured: true,
    urgent: true,
    startsAt: '2026-09-30',
    expiresAt: '2026-10-30',
    views: 1240,
    applicationsCount: 46,
    createdAt: '2026-09-30T10:15:00Z',
    posterEmail: 'jobs@ampersand.solar',
    posterPhone: '+250 788 555 123'
  },
  {
    id: 'adv-004',
    slug: 'field-agronomist-supervisor-one-acre-fund-musanze',
    type: 'job',
    title: 'Senior Field Agronomist & Cooperative Supervisor',
    titleRw: 'Umugenzuzi w\'Ubuhinzi n\'Amakoperative',
    companyName: 'One Acre Fund (Tubura)',
    companyLogo: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=150&auto=format&fit=crop&q=80',
    rdbTin: '101485920',
    isVerified: true,
    category: 'agriculture',
    district: 'Musanze',
    sector: 'Muhoza',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    educationLevel: 'Diploma or Degree in Agronomy, Crop Production, or Rural Development',
    openings: 5,
    description: 'Tubura (One Acre Fund) supplies smallholder farmers in Rwanda with financing, high-quality seeds, fertilizer, and agricultural training. We are seeking energetic Field Agronomists based in Northern Province (Musanze, Burera, Nyabihu) to support farmer groups, deliver climate-smart farming training, and ensure successful harvests.',
    responsibilities: [
      'Lead practical agronomic training sessions for over 40 farmer cooperatives across Musanze district',
      'Supervise seed and organic fertilizer distribution logistics to village drop points',
      'Conduct soil fertility testing and provide pest management advisory to local farmers',
      'Submit weekly digitized field monitoring reports via smartphone app'
    ],
    requirements: [
      'Degree or Advanced Diploma (A1/A0) in Agronomy or Agriculture',
      'Valid Rwandan motorcycle driving license (Category A) is required',
      'Fluency in Kinyarwanda; working knowledge of English',
      'Demonstrated passion for rural community development and farmer prosperity'
    ],
    salaryMin: 650000,
    salaryMax: 900000,
    isSalaryHidden: false,
    deadline: '2026-11-05',
    applicationMethod: 'on_site',
    applicationEmail: 'rwanda.jobs@oneacrefund.org',
    packageId: 'standard',
    addons: [],
    status: 'live',
    featured: false,
    urgent: false,
    startsAt: '2026-10-01',
    expiresAt: '2026-11-05',
    views: 480,
    applicationsCount: 14,
    createdAt: '2026-10-01T07:45:00Z',
    posterEmail: 'recruitment.musanze@oneacrefund.org',
    posterPhone: '+250 788 789 001'
  },
  {
    id: 'adv-005',
    slug: 'business-development-manager-inkomoko-huye',
    type: 'job',
    title: 'SME Business Advisory & Growth Manager',
    titleRw: 'Umuyobozi w\'Inama z\'Ubucuruzi n\'Iterambere ry\'Amashyirahamwe',
    companyName: 'Inkomoko Entrepreneur Development',
    companyLogo: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=150&auto=format&fit=crop&q=80',
    rdbTin: '102394018',
    isVerified: true,
    category: 'ngo_development',
    district: 'Huye',
    sector: 'Ngoma',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    educationLevel: 'Master\'s or Bachelor\'s in Business Administration, Finance, or Management',
    openings: 1,
    description: 'Inkomoko supports entrepreneurs, refugees, and youth business owners across Rwanda to build resilient enterprises. We are recruiting an SME Business Advisory Manager for our Southern Province office in Huye to oversee tailored business consulting, loan underwriting support, and financial literacy workshops.',
    responsibilities: [
      'Manage a portfolio of 60+ micro and small enterprises undergoing business acceleration in Southern Rwanda',
      'Provide 1-on-1 strategic guidance on cashflow management, tax compliance, and market expansion',
      'Evaluate loan readiness and recommend financing through the Inkomoko Loan Fund',
      'Coordinate with district authorities and partner agencies in Huye, Gisagara, and Nyanza'
    ],
    requirements: [
      '5+ years experience in business consulting, SME banking, or entrepreneurship acceleration',
      'Proven track record of improving small business profitability and record keeping',
      'Strong empathy, leadership skills, and commitment to economic inclusion',
      'Professional fluency in Kinyarwanda and English'
    ],
    salaryMin: 1400000,
    salaryMax: 1950000,
    isSalaryHidden: false,
    deadline: '2026-10-28',
    applicationMethod: 'on_site',
    applicationEmail: 'careers@inkomoko.com',
    packageId: 'featured',
    addons: [],
    status: 'live',
    featured: true,
    urgent: false,
    startsAt: '2026-09-29',
    expiresAt: '2026-10-29',
    views: 730,
    applicationsCount: 22,
    createdAt: '2026-09-29T11:00:00Z',
    posterEmail: 'huye.office@inkomoko.com',
    posterPhone: '+250 788 412 879'
  },
  {
    id: 'adv-006',
    slug: 'clinical-research-epidemiologist-rbc-kigali',
    type: 'job',
    title: 'Public Health Epidemiologist & Data Specialist',
    titleRw: 'Inzobere mu Bucukumbuzi n\'Imibare y\'Ubuzima Rusange',
    companyName: 'Rwanda Biomedical Centre (RBC)',
    companyLogo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=150&auto=format&fit=crop&q=80',
    rdbTin: '100098452',
    isVerified: true,
    category: 'healthcare',
    district: 'Gasabo',
    sector: 'Remera',
    employmentType: 'contract',
    experienceLevel: 'senior',
    educationLevel: 'Master\'s in Epidemiology, Public Health, or Biostatistics',
    openings: 2,
    description: 'Rwanda Biomedical Centre is the nation\'s premier public health institution. This role focuses on analyzing national surveillance data, leading epidemiological field investigations, and collaborating with international health partners on health policy recommendations.',
    responsibilities: [
      'Analyze communicable and non-communicable disease trends using R, STATA, and Python',
      'Draft national health surveillance briefs and peer-reviewed scientific publications',
      'Coordinate with district hospitals and health centers on electronic data collection systems',
      'Provide rapid analytical support during public health emergencies'
    ],
    requirements: [
      'Advanced degree in Epidemiology, Public Health, or Biostatistics',
      'Minimum 4 years of proven research and epidemiological analysis experience',
      'Published author or co-author in recognized medical/scientific journals is preferred',
      'Knowledge of Rwandan national health priorities and decentralized health structures'
    ],
    salaryMin: 1600000,
    salaryMax: 2200000,
    isSalaryHidden: false,
    deadline: '2026-11-10',
    applicationMethod: 'link',
    applicationUrl: 'https://rbc.gov.rw/careers',
    packageId: 'standard',
    addons: [],
    status: 'live',
    featured: false,
    urgent: false,
    startsAt: '2026-10-01',
    expiresAt: '2026-11-10',
    views: 520,
    applicationsCount: 11,
    createdAt: '2026-10-01T08:30:00Z',
    posterEmail: 'recruitment@rbc.gov.rw',
    posterPhone: '+250 788 114 400'
  },
  {
    id: 'adv-007',
    slug: 'hotel-front-office-supervisor-rubavu-resort',
    type: 'job',
    title: 'Hospitality Guest Experience & Front Office Lead',
    titleRw: 'Umugenzuzi w\'Ukwakira Abashyitsi muri Hoteli',
    companyName: 'Lake Kivu Serena Hotel & Resort',
    companyLogo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=150&auto=format&fit=crop&q=80',
    rdbTin: '100341829',
    isVerified: true,
    category: 'hospitality_tourism',
    district: 'Rubavu',
    sector: 'Gisenyi',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    educationLevel: 'Degree or Diploma in Hospitality Management, Tourism, or Public Relations',
    openings: 2,
    description: 'Located on the scenic shores of Lake Kivu in Rubavu, we are looking for a gracious, professional Front Office Supervisor to oversee reception staff, VIP arrivals, and world-class guest hospitality experiences.',
    responsibilities: [
      'Supervise daily front desk operations, guest check-in/out, and concierge bookings',
      'Ensure high standards of Rwandan hospitality and resolve guest inquiries promptly',
      'Manage reservations system (Opera PMS) and liaise with housekeeping and restaurant teams',
      'Train front-desk staff in multilingual customer service'
    ],
    requirements: [
      '3+ years front office experience in 4-star or 5-star international hotel environment',
      'Proficiency in Opera PMS or equivalent hospitality software',
      'Fluency in English, French, and Kinyarwanda',
      'Warm interpersonal presence and ability to lead by example under pressure'
    ],
    salaryMin: 700000,
    salaryMax: 1050000,
    isSalaryHidden: false,
    deadline: '2026-10-24',
    applicationMethod: 'on_site',
    applicationEmail: 'kivu.resort@serenahotels.com',
    packageId: 'basic',
    addons: ['urgent_badge'],
    status: 'live',
    featured: false,
    urgent: true,
    startsAt: '2026-09-27',
    expiresAt: '2026-10-27',
    views: 910,
    applicationsCount: 31,
    createdAt: '2026-09-27T14:20:00Z',
    posterEmail: 'hr.kivu@serena.co.rw',
    posterPhone: '+250 788 308 000'
  },
  {
    id: 'adv-008',
    slug: 'stem-mathematics-teacher-green-hills-kigali',
    type: 'job',
    title: 'IGCSE & IB Diploma Mathematics Educator',
    titleRw: 'Mwarimu w\'Imibare (Mathematics Educator)',
    companyName: 'Green Hills Academy',
    companyLogo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=150&auto=format&fit=crop&q=80',
    rdbTin: '100228193',
    isVerified: true,
    category: 'education_teaching',
    district: 'Nyarugenge',
    sector: 'Nyarugenge',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    educationLevel: 'Bachelor\'s in Mathematics Education or PGCE',
    openings: 1,
    description: 'Green Hills Academy is an accredited IB World School in Kigali. We are recruiting an inspiring, dedicated Mathematics teacher for middle and high school students who can ignite enthusiasm for problem solving and critical reasoning.',
    responsibilities: [
      'Deliver engaging Mathematics curriculum for Cambridge IGCSE and IB Diploma students',
      'Differentiate instruction to support diverse learning styles and accelerate gifted pupils',
      'Regularly assess student progress and communicate constructive feedback to parents',
      'Supervise extracurricular STEM clubs and mathematics Olympiad competitions'
    ],
    requirements: [
      'Bachelor’s in Mathematics or Education with Teaching Certification',
      'Minimum 3 years experience teaching Cambridge IGCSE or IB Mathematics curricula',
      'Exceptional classroom management and English language proficiency',
      'Passion for pedagogical excellence and student wellbeing'
    ],
    salaryMin: 1100000,
    salaryMax: 1550000,
    isSalaryHidden: false,
    deadline: '2026-11-15',
    applicationMethod: 'on_site',
    applicationEmail: 'hr@greenhillsacademy.rw',
    packageId: 'standard',
    addons: [],
    status: 'live',
    featured: false,
    urgent: false,
    startsAt: '2026-10-01',
    expiresAt: '2026-11-15',
    views: 390,
    applicationsCount: 8,
    createdAt: '2026-10-01T09:10:00Z',
    posterEmail: 'recruitment@greenhillsacademy.rw',
    posterPhone: '+250 788 300 234'
  }
];

export const INITIAL_BOOKS: BookItem[] = [
  {
    id: 'book-001',
    slug: 'building-rwanda-innovation-enterprise-growth',
    title: 'Building in the Land of a Thousand Hills: Rwanda\'s Innovation Story',
    author: 'Jean-Paul Habimana & Dr. Alice Uwera',
    genre: 'Business & Economy',
    language: 'English & Kinyarwanda Excerpts',
    priceRwf: 12000,
    coverUrl: '/src/assets/images/book_rwanda_innovation_1790885239551.jpg',
    synopsis: 'An inspiring, evidence-backed chronicle detailing Rwanda’s economic resurgence from 1994 to Vision 2050. Featuring interviews with 35 Rwandan startup founders, cooperative leaders, and policymakers who turned adversity into continent-leading digital infrastructure.',
    authorBio: 'Jean-Paul Habimana is a Kigali-based economist and columnist. Dr. Alice Uwera is a senior researcher in technology entrepreneurship at the University of Rwanda.',
    buyLink: 'https://wa.me/250788785514?text=Hello%20Akazi,%20I%20would%20like%20to%20order%20the%20book%20Building%20Rwanda',
    phoneContact: '+250 788 785 514',
    isFeaturedWeek: true,
    status: 'live',
    createdAt: '2026-09-15T12:00:00Z'
  },
  {
    id: 'book-002',
    slug: 'umusingi-witerambere-ubuyobozi-bufite-intego',
    title: 'Umusingi w’Iterambere: Ubuyobozi Bufite Intego',
    author: 'Mitali Emmanuel',
    genre: 'Leadership & Culture',
    language: 'Kinyarwanda',
    priceRwf: 8000,
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
    synopsis: 'Igitabo cyigisha amahame y\'ubuyobozi bushingiye ku muco nyarwanda: Ubupfura, Ubwitange, no Guharanira kwigira. Gitanga inama zifatika ku rubyiruko rwifuza kuba abayobozi beza mu nzego za Leta n\'abikorera.',
    authorBio: 'Mitali Emmanuel ni umwanditsi n\'umwarimu w\'amateka n\'umuco wamaze imyaka 20 atoza urubyiruko mu gihugu hose.',
    buyLink: 'https://wa.me/250788785514?text=Muraho%20nshaka%20kugura%20igitabo%20Umusingi%20w%27Iterambere',
    phoneContact: '+250 788 785 514',
    isFeaturedWeek: false,
    status: 'live',
    createdAt: '2026-09-18T10:00:00Z'
  },
  {
    id: 'book-003',
    slug: 'the-kigali-code-software-engineering-handbook',
    title: 'The Kigali Code: Pragmatic Software Engineering for Emerging Markets',
    author: 'David Ishimwe & Cedric Mugisha',
    genre: 'Technology',
    language: 'English',
    priceRwf: 15000,
    coverUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?w=400&auto=format&fit=crop&q=80',
    synopsis: 'A comprehensive handbook for African software engineers tackling bandwidth constraints, mobile money webhook resilience, USSD interfaces, and distributed offline-first cloud computing across East Africa.',
    authorBio: 'David Ishimwe and Cedric Mugisha are senior systems architects who have built payment engines handling over 500,000 transactions daily.',
    buyLink: 'https://wa.me/250788785514?text=Hello%20Akazi,%20I%20would%20like%20to%20order%20The%20Kigali%20Code',
    phoneContact: '+250 788 785 514',
    isFeaturedWeek: false,
    status: 'live',
    createdAt: '2026-09-22T14:30:00Z'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-001',
    name: 'Claudine Mukamana',
    role: 'Full Stack Engineer',
    organization: 'Now at Irembo GovTech',
    category: 'seeker',
    quote: 'Akazi helped me find my current software engineering role without paying a single franc or dealing with spam recruiters. The verified employer badge gave me confidence that the vacancy was real.',
    quoteRw: 'Akazi kambashishije kubona akazi k\'ubwubatsi bwa porogaramu muri Irembo nta faranga na rimwe nishyuye. Ikimenyetso cy\'umukoresha wizewe cyampaye icyizere cyuzuye.',
    rating: 5,
    approved: true,
    createdAt: '2026-09-10'
  },
  {
    id: 'test-002',
    name: 'Jean-Claude Nsengiyumva',
    role: 'Head of Talent Acquisition',
    organization: 'Ampersand E-Mobility Rwanda',
    category: 'employer',
    quote: 'We published our IoT QA internship on Akazi and received 46 qualified Rwandan candidates within 72 hours. Filtering by district and reviewing verified CVs saved our recruitment team weeks of manual work.',
    quoteRw: 'Twashyizeho itangazo ryo kwimenyereza umwuga kuri Akazi tubona abakandida 46 bashoboye mu masaha 72 gusa. Byadukijije igihe kinini cyo gutoranya.',
    rating: 5,
    approved: true,
    createdAt: '2026-09-14'
  },
  {
    id: 'test-003',
    name: 'Aline Umutoni',
    role: 'Agricultural Sciences Graduate',
    organization: 'University of Rwanda (Huye Campus)',
    category: 'student',
    quote: 'As a fresh graduate, finding entry-level roles outside Kigali was tough. Through Akazi, I discovered and secured my field agronomist placement in Musanze right before graduation.',
    quoteRw: 'Nkimara gusoza kaminuza i Huye, gushaka akazi mu ntara byari bitoroshye. Kuri Akazi nahise mboneraho akazi k\'ubuhinzi muri Musanze ntaranahembwa impamyabumenyi.',
    rating: 5,
    approved: true,
    createdAt: '2026-09-20'
  },
  {
    id: 'test-004',
    name: 'Jean-Paul Habimana',
    role: 'Author & Economist',
    organization: 'Author of "Building in the Land of a Thousand Hills"',
    category: 'author',
    quote: 'The Author Spotlight slot on Akazi.com connected me with over 300 passionate readers and corporate buyers in Rwanda. It is the premier platform to give Rwandan writers visibility.',
    quoteRw: 'Umwanya w\'igitabo cy\'icyumweru kuri Akazi wamfashije kugera ku basomyi barenga 300 n\'ibigo byaguze ibitabo byanjye. Ni umuyoboro ukomeye ku banditsi nyarwanda.',
    rating: 5,
    approved: true,
    createdAt: '2026-09-26'
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-001',
    slug: 'how-to-write-a-competitive-rwanda-cv-2026',
    title: 'The Modern Rwandan CV: Formatting Standards for Kigali & Global Employers',
    titleRw: 'Uko Wandika CV Igezweho: Amabwiriza ku Bakoresha mu Rwanda no Hanze',
    summary: 'Master the 2-page format, RDB qualification references, language proficiency metrics, and common mistakes that get candidates filtered out.',
    summaryRw: 'Menya amabwiriza yo kwandika CV y\'amapaji abiri, gushyiraho impamyabumenyi zemewe na RDB, no kwirinda amakosa atuma utahamagarwa.',
    content: `A modern Rwandan CV must be concise, verifiable, and tailored. Rwandan HR directors and hiring managers review an average of 120 applicants per advert. 

Key standards to follow:
1. Length: Exactly 2 pages for professionals with up to 7 years of experience.
2. Structure: Contact details (Phone with +250 country code, active professional email, LinkedIn profile), Professional Summary (3 lines), Core Competencies, Experience (action-oriented bullet points), Education & Certifications, Languages (English, Kinyarwanda, French), and 3 verified Professional Referees.
3. Quantify results: Instead of "Handled inventory", write "Managed stock inventory of 14,000 units across 3 Kigali distribution hubs with 99.4% accuracy".
4. File Format: Always export as clean PDF labeled "FirstName_LastName_CV.pdf".`,
    category: 'CV & Resume',
    readTime: '4 min read',
    imageUrl: '/src/assets/images/career_advice_guide_1790885262063.jpg',
    publishedAt: '2026-09-18'
  },
  {
    id: 'art-002',
    slug: 'acing-the-panel-interview-in-rwanda',
    title: 'Acing Your Panel Interview: What Rwandan Institutions & NGOs Look For',
    titleRw: 'Gutsinda Ikizamini cy\'Ibibazo (Interview) mu Kigo cyangwa Umuryango',
    summary: 'Practical preparation tactics for technical written tests and behavioral panel interviews common in Rwandan banks, public agencies, and NGOs.',
    summaryRw: 'Uburyo bwo kwitegura neza ibizamini by\'akazi mu mabanki, imiryango itegamiye kuri leta n\'ibigo bya leta mu Rwanda.',
    content: `Rwandan recruitment processes frequently involve a two-stage evaluation: a technical written test followed by a 4-person interview panel (HR, Department Head, Technical Lead, and Independent Observer).

Preparation Checklist:
1. Understand the mandate: Research the organization's current strategic priorities in Rwanda (e.g. alignment with NST1 or Vision 2050).
2. The STAR method: Answer behavioral questions with Situation, Task, Action, and Result.
3. Bring physical copies: Even in digital times, bring 3 printed copies of your CV and certificates in a neat folder.
4. Prepare thoughtful questions: Ask about department milestones for the next 12 months rather than salary on the first round.`,
    category: 'Interview Preparation',
    readTime: '5 min read',
    publishedAt: '2026-09-24'
  },
  {
    id: 'art-003',
    slug: 'transitioning-from-tvet-to-full-employment',
    title: 'From TVET & Polytechnic to High-Demand Industrial Employment',
    titleRw: 'Kuva mu Mashuri y\'Imyuga (TVET) Ugana ku Mirimo Ihemba Neza',
    summary: 'How vocational graduates in Rwanda can leverage practical certifications, internships, and apprenticeships to secure high-paying roles.',
    summaryRw: 'Uko abanyeshuri bize imyuga mu Rwanda bakoresha impamyabumenyi zabo n\'ibikorwa byo kwimenyereza mu kubona akazi keza.',
    content: `Rwanda’s rapid growth in manufacturing, renewable energy, telecommunications, and digital infrastructure creates high demand for hands-on technical skills.

Proven steps for TVET graduates:
1. Certify your tools: Ensure your RTB (Rwanda TVET Board) certifications and practical logbooks are up to date.
2. Complete verified internships: Employers like Ampersand, Bboxx, and construction firms hire over 60% of their full-time technicians directly from internship cohorts.
3. Highlight problem-solving: Document machinery you serviced, code you wrote, or electrical installations you completed with photos and supervisor notes.`,
    category: 'Youth & TVET',
    readTime: '3 min read',
    publishedAt: '2026-09-29'
  }
];
