const KSH_UPLOADS = "https://kingstylehomes.com.au/wp-content/uploads";

export type HomeDesign = {
  slug: string;
  name: string;
  category: "Single Storey" | "Double Storey" | "Display Home";
  beds: number;
  baths: number;
  cars: number;
  frontage: string;
  image: string;
  summary: string;
  description: string;
  highlights: string[];
};

export type Service = {
  title: string;
  text: string;
  image: string;
  details: string[];
};

export type InclusionGroup = {
  title: string;
  items: string[];
};

export const homeDesigns: HomeDesign[] = [
  {
    slug: "reon-18",
    name: "Reon 18",
    category: "Single Storey",
    beds: 5,
    baths: 6,
    cars: 2,
    frontage: "3m",
    image: `${KSH_UPLOADS}/2025/02/SAINATIONALS_SINGLE-STORY_02_FACADE_HR_FINAL.jpg`,
    summary: "A compact yet highly flexible single-storey home created for families who need smart zoning and everyday comfort.",
    description:
      "Reon 18 brings generous accommodation into an efficient footprint, balancing private bedrooms with open living spaces that can adapt as family needs change.",
    highlights: ["Efficient single-level planning", "Multiple private bedroom zones", "Practical layout for growing families"],
  },
  {
    slug: "havenridge-18",
    name: "Havenridge 18",
    category: "Single Storey",
    beds: 5,
    baths: 3,
    cars: 2,
    frontage: "11.1m",
    image: `${KSH_UPLOADS}/2025/02/SINGLE-STORY_05.jpg`,
    summary: "A generous single-storey design with strong street presence, five bedrooms and relaxed family living.",
    description:
      "Havenridge 18 is designed for households that want the ease of single-level living without sacrificing bedroom count, storage or entertaining space.",
    highlights: ["Five-bedroom single-storey layout", "Wide frontage street appeal", "Family-focused living and retreat areas"],
  },
  {
    slug: "single-story-04",
    name: "Single Story 04",
    category: "Single Storey",
    beds: 4,
    baths: 3,
    cars: 2,
    frontage: "10.5m",
    image: `${KSH_UPLOADS}/2025/02/SINGLE-STORY_04.jpg`,
    summary: "A polished four-bedroom home with balanced living, private rooms and a frontage suited to contemporary blocks.",
    description:
      "Single Story 04 focuses on clarity and comfort, with a practical plan that keeps daily movement simple while maintaining a refined architectural feel.",
    highlights: ["Four bedrooms and three bathrooms", "Double garage convenience", "Balanced entertaining and private areas"],
  },
  {
    slug: "kivo-18",
    name: "Kivo 18",
    category: "Single Storey",
    beds: 5,
    baths: 3,
    cars: 2,
    frontage: "11.2m",
    image: `${KSH_UPLOADS}/2025/02/SINGLE-STORY_03.jpg`,
    summary: "A light-filled single-storey plan with five bedrooms, practical circulation and strong street appeal.",
    description:
      "Kivo 18 is shaped for families who want more rooms on one level, with a comfortable mix of shared gathering spaces and quieter personal zones.",
    highlights: ["Five-bedroom accommodation", "Functional 11.2m frontage", "Designed for easy family flow"],
  },
  {
    slug: "noir-19",
    name: "Noir 19",
    category: "Single Storey",
    beds: 4,
    baths: 4,
    cars: 2,
    frontage: "11.0m",
    image: `${KSH_UPLOADS}/2025/02/SINGLE-STORY_02.jpg`,
    summary: "A refined single-storey home with generous bathrooms, double garage and a confident facade.",
    description:
      "Noir 19 suits families who want privacy and polish on one level, pairing four bedrooms with bathroom access that supports a busy household.",
    highlights: ["Four bathrooms for family flexibility", "Double garage", "Elegant modern facade"],
  },
  {
    slug: "vista-15",
    name: "Vista 15",
    category: "Single Storey",
    beds: 4,
    baths: 3,
    cars: 2,
    frontage: "11.0m",
    image: `${KSH_UPLOADS}/2025/02/SINGLE-STORY_01.jpg`,
    summary: "A compact single-storey design that keeps four bedrooms and daily living practical, bright and connected.",
    description:
      "Vista 15 is a considered option for families seeking a smaller footprint with the essentials resolved beautifully.",
    highlights: ["Compact four-bedroom planning", "Three bathrooms", "Efficient family footprint"],
  },
  {
    slug: "double-story-05",
    name: "Double Story 05",
    category: "Double Storey",
    beds: 4,
    baths: 5,
    cars: 2,
    frontage: "8.6m",
    image: `${KSH_UPLOADS}/2025/02/DOUBLE-STORY_05.jpg`,
    summary: "A narrow-frontage double-storey home that delivers generous amenity, height and a premium street presence.",
    description:
      "Double Story 05 is designed to maximise vertical living on a narrower block, with four bedrooms, five bathrooms and strong separation between living and retreat spaces.",
    highlights: ["Narrow 8.6m frontage solution", "Five bathrooms", "Premium two-storey facade"],
  },
  {
    slug: "harmony-19",
    name: "Harmony 19",
    category: "Double Storey",
    beds: 3,
    baths: 3,
    cars: 1,
    frontage: "10.0m",
    image: `${KSH_UPLOADS}/2025/02/DOUBLE-STORY_04.jpg`,
    summary: "A graceful double-storey design with efficient accommodation, a single garage and balanced proportions.",
    description:
      "Harmony 19 gives smaller households a refined double-storey option with thoughtful space planning and a calm architectural character.",
    highlights: ["Efficient three-bedroom plan", "Single garage", "Balanced two-storey proportions"],
  },
  {
    slug: "belford-23",
    name: "Belford 23",
    category: "Double Storey",
    beds: 4,
    baths: 3,
    cars: 1,
    frontage: "8.650m",
    image: `${KSH_UPLOADS}/2025/02/DOUBLE-STORY_03-next.jpg`,
    summary: "A practical double-storey home for compact sites, with four bedrooms and thoughtful everyday zoning.",
    description:
      "Belford 23 is made for families who want the scale of a two-storey home on a tighter frontage, with a layout that keeps living, sleeping and storage well resolved.",
    highlights: ["Compact frontage design", "Four bedrooms", "Everyday family zoning"],
  },
  {
    slug: "coastal-23",
    name: "Coastal 23",
    category: "Double Storey",
    beds: 4,
    baths: 3,
    cars: 1,
    frontage: "8.650m",
    image: `${KSH_UPLOADS}/2025/02/DOUBLE-STORY_03.jpg`,
    summary: "A clean, coastal-inspired double-storey home with four bedrooms and an efficient narrow-block footprint.",
    description:
      "Coastal 23 brings a crisp facade and flexible family planning to a narrower site, creating a home that feels fresh, calm and liveable.",
    highlights: ["Narrow frontage compatibility", "Four-bedroom planning", "Crisp contemporary facade"],
  },
  {
    slug: "ember-37",
    name: "Ember 37",
    category: "Double Storey",
    beds: 4,
    baths: 3,
    cars: 2,
    frontage: "10.3m",
    image: `${KSH_UPLOADS}/2025/02/DOUBLE-STORY_02.jpg`,
    summary: "A confident double-storey home with expansive family zones, four bedrooms and refined frontage appeal.",
    description:
      "Ember 37 is a larger family design with space to gather, retreat and entertain, supported by a strong facade and practical double-garage planning.",
    highlights: ["Expansive family living", "Double garage", "Four bedrooms across two levels"],
  },
  {
    slug: "lume-31",
    name: "Lume 31",
    category: "Double Storey",
    beds: 5,
    baths: 4,
    cars: 2,
    frontage: "11.2m",
    image: `${KSH_UPLOADS}/2025/02/DOUBLE-STORY_01.jpg`,
    summary: "A premium five-bedroom double-storey home with generous family accommodation and a refined modern facade.",
    description:
      "Lume 31 is created for families who want more room to live beautifully, combining five bedrooms, four bathrooms and a strong two-storey presence.",
    highlights: ["Five-bedroom family accommodation", "Four bathrooms", "Refined modern facade"],
  },
  {
    slug: "sydney-tce",
    name: "Sydney TCE",
    category: "Display Home",
    beds: 4,
    baths: 3,
    cars: 1,
    frontage: "8.650m",
    image: `${KSH_UPLOADS}/2025/04/image9.jpg`,
    summary: "The King Style display-home experience, showcasing premium finishes, practical planning and detailed craftsmanship.",
    description:
      "Sydney TCE gives clients a chance to walk through a finished King Style home and experience the scale, detail and finish quality in person.",
    highlights: ["Display-home finish quality", "Four-bedroom family plan", "A tactile way to explore selections"],
  },
];

export const services: Service[] = [
  {
    title: "Custom Home Builds",
    text: "Design and build your dream home with an expert team guiding the process from early ideas through approvals, construction and handover.",
    image: `${KSH_UPLOADS}/2025/04/img11.jpg`,
    details: ["Bespoke layouts", "Design guidance", "Construction management"],
  },
  {
    title: "Duplex & Multi-Dwelling Projects",
    text: "Maximise the potential of your property with carefully planned duplex and multi-dwelling solutions.",
    image: `${KSH_UPLOADS}/2025/04/Duplex.jpg`,
    details: ["Site potential review", "Multi-dwelling planning", "Development-focused delivery"],
  },
  {
    title: "Granny Flat Services",
    text: "Create a functional, stylish extra dwelling for family, guests or rental income with a smooth design-to-build process.",
    image: `${KSH_UPLOADS}/2025/04/image9.jpg`,
    details: ["Secondary dwelling design", "Council coordination", "Compact living expertise"],
  },
  {
    title: "House and Land Packages",
    text: "Simplify the path to a new home with curated design and land opportunities that suit modern family living.",
    image: `${KSH_UPLOADS}/2025/04/image5.jpg`,
    details: ["Design and land pairing", "Budget clarity", "Streamlined selections"],
  },
  {
    title: "Renovations & Extensions",
    text: "Transform an existing home through considered upgrades, added space and refined detailing.",
    image: `${KSH_UPLOADS}/2025/04/image3.jpg`,
    details: ["Extensions", "Whole-home renovations", "Improved flow and amenity"],
  },
  {
    title: "Turn-Key Solutions",
    text: "Move into a fully finished home with approvals, construction, finishes, landscaping and handover coordinated for you.",
    image: `${KSH_UPLOADS}/2025/02/SINGLE-STORY_01.jpg`,
    details: ["Approvals to handover", "Finishes coordination", "Ready-to-live delivery"],
  },
];

export const inclusionFeatureItems = [
  "Up to 3300mm high ceilings on both floors",
  "Mono stringer floating stairs with LED lights",
  "Premium appliances",
  "Solid core internal doors",
  "90mm benchtops in kitchen and laundry, 100mm on the island",
  "Full frameless showers and LED mirrors in bathrooms",
  "Marble-look engineered stone throughout",
  "Shadowline doors, windows and skirting",
  "Double-glazed windows",
  "Epoxy garage flooring",
  "Outdoor kitchen and more",
];

export const inclusionGroups: InclusionGroup[] = [
  {
    title: "Plans and approvals",
    items: [
      "Homeowners warranty",
      "Architectural plans",
      "Engineering plans",
      "Long Service Levy fee",
      "Waste management report",
      "CDC or CC fees",
      "Certifier inspection fee",
      "Site soil report by geotechnical engineer",
      "Site contour survey by registered surveyor",
      "Sydney Water Tap-In",
    ],
  },
  {
    title: "Structure and site",
    items: [
      "Standard levelling and site cut",
      "Structural engineer-designed slab",
      "Termite protection",
      "Colorbond roof with anti-condensation insulation",
      "Rainwater tanks and instantaneous hot water",
    ],
  },
  {
    title: "Interior finishes",
    items: [
      "High-quality tiles",
      "Prefinished engineered timber flooring",
      "Stone benchtops",
      "Premium appliance allowance",
      "Custom-built wardrobes and linen storage",
    ],
  },
  {
    title: "Bathrooms and electrical",
    items: [
      "Free-standing bath",
      "Soft-close toilets",
      "Frameless showers",
      "Smoke detectors",
      "Smart electrical features",
      "Subfloor heating options",
    ],
  },
  {
    title: "Warranty",
    items: [
      "6-year structural warranty",
      "6-month defects warranty",
      "Appliance and fixture warranties as per manufacturers",
    ],
  },
];

export const faqs = [
  {
    question: "What is the process for a new build with KingStyle Homes?",
    answer:
      "From consultation to construction, King Style Homes guides each step: understanding your vision, designing the home, handling permits and approvals, then managing the build with a skilled team.",
  },
  {
    question: "What is a knockdown and rebuild?",
    answer:
      "A knockdown and rebuild lets you stay in a location you love while replacing an existing home with a new design tailored to your lifestyle and site.",
  },
  {
    question: "How do renovations with KingStyle Homes work?",
    answer:
      "The team works with you to understand what needs to change, designs the right solution, then completes the renovation with careful craftsmanship and efficient coordination.",
  },
  {
    question: "Can you build a granny flat on my property?",
    answer:
      "Yes. King Style Homes designs and builds functional granny flats for family, guests or rental income, including design, permits and construction.",
  },
  {
    question: "How long will it take to build my home?",
    answer:
      "Timing depends on scale, approvals and complexity. A new build commonly takes around 6-12 months after approvals, with a detailed schedule provided for each project.",
  },
  {
    question: "What is included in a Turn-Key package?",
    answer:
      "Turn-key solutions include design, approvals, construction, finishes, landscaping and handover, creating a home ready to move into.",
  },
  {
    question: "Will my new home be energy-efficient?",
    answer:
      "Energy-efficient design features can include insulation, solar options and efficient appliances to help create a more comfortable and cost-effective home.",
  },
];

export const processSteps = [
  {
    title: "Initial consultation",
    text: "The process starts with a conversation about your family, lifestyle, site, budget and goals so the brief is grounded in how you actually live.",
  },
  {
    title: "Design and planning",
    text: "The team shapes the design with you, guiding layout, facade, finishes and practical decisions so the home feels personal and buildable.",
  },
  {
    title: "Proposal and contract",
    text: "Once the direction is clear, King Style provides a transparent proposal outlining what will be delivered and how the project will move forward.",
  },
  {
    title: "Construction and handover",
    text: "Trades, suppliers and site progress are coordinated through the build, leading to a finished home ready for handover.",
  },
];

export const whyBuildItems = [
  "Collaborative design process",
  "Expert guidance from layout to finishes",
  "High-quality craftsmanship",
  "Timely delivery focus",
  "Stress-free project management",
  "Customisation and innovation",
];

export const testimonials = [
  {
    quote: "King Style Homes made our dream home a reality. Their attention to detail and personalised designs exceeded our expectations.",
    name: "Georg Brown",
  },
  {
    quote: "From start to finish, the team was professional, innovative and dedicated. We could not be happier with our new home.",
    name: "Ricky Dey",
  },
  {
    quote: "The craftsmanship is outstanding. Our home feels truly unique, and every detail reflects the care and expertise of King Style Homes.",
    name: "Json M",
  },
  {
    quote: "Seamless construction and top-notch quality. King Style Homes turned our vision into a place where we create lasting memories.",
    name: "Jessy",
  },
];

export const contactDetails = {
  email: "info@kingstylehomes.com.au",
  phone: "0421000100",
  hours: "Open 7 days a week // from 10am to 5pm",
};

export const pageImages = {
  aboutHero: `${KSH_UPLOADS}/2025/04/6.2.jpg`,
  aboutFeatureOne: `${KSH_UPLOADS}/2025/04/6.3.jpg`,
  aboutFeatureTwo: `${KSH_UPLOADS}/2025/04/6.4.jpg`,
  aboutFeatureThree: `${KSH_UPLOADS}/2025/04/6.5.jpg`,
  displayHero: `${KSH_UPLOADS}/2025/04/image9.jpg`,
  displayFeature: "https://kingstylehomes.com.au/wp-content/themes/kingstylehomes/assets/images/blog-image2.jpg",
  servicesHero: `${KSH_UPLOADS}/2025/04/img11.jpg`,
  inclusionsHero: `${KSH_UPLOADS}/2025/04/6.4.jpg`,
};
