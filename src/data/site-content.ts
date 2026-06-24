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
  bestFor: string;
  designConsiderations: string[];
};

export type Service = {
  title: string;
  text: string;
  image: string;
  details: string[];
  bestFor: string;
  included: string[];
  siteConsiderations: string;
  outcome: string;
};

export function serviceSlug(service: Pick<Service, "title">) {
  return service.title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function servicePath(service: Pick<Service, "title">) {
  return `/services/${serviceSlug(service)}`;
}

export type InclusionGroup = {
  title: string;
  items: string[];
};

export type Capability = {
  title: string;
  text: string;
  proof: string;
};

export type TrustProof = {
  title: string;
  text: string;
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
    bestFor: "Families who want single-level living with generous bedroom count and simple everyday circulation.",
    designConsiderations: ["Works as a compact family starting point", "Bedrooms can be reviewed around privacy needs", "Facade and selections can be tailored to the site"],
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
    bestFor: "Households wanting a larger single-storey feel with room for family routines, guests or work-from-home needs.",
    designConsiderations: ["Suits wider frontage blocks", "Living zones can be tuned for entertaining", "Storage and retreat spaces can be reviewed early"],
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
    bestFor: "Families wanting a polished four-bedroom design with clear separation between shared and private spaces.",
    designConsiderations: ["Good balance of bedrooms and bathrooms", "Facade can stay contemporary without overcomplication", "Useful option when daily flow is the priority"],
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
    bestFor: "Growing families who prefer all bedrooms and living areas on one level.",
    designConsiderations: ["Frontage should be checked against the block early", "Can support multi-generational room planning", "Shared spaces can be opened up or softened"],
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
    bestFor: "Families who value bathroom access, privacy and a refined single-storey street presence.",
    designConsiderations: ["Bathroom count supports busy mornings", "Facade detailing can be elevated through selections", "Private bedroom positioning should be reviewed with lifestyle needs"],
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
    bestFor: "Clients seeking a compact single-storey home that still keeps the essentials generous.",
    designConsiderations: ["Useful when land size or budget needs discipline", "Room proportions should be checked against furniture needs", "Selections can help the compact plan feel more premium"],
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
    bestFor: "Narrow-frontage blocks where a family still wants a full two-storey home with strong amenity.",
    designConsiderations: ["Frontage and garage access should be confirmed early", "Vertical zoning can separate entertaining from bedrooms", "Facade proportions can be tuned to council and streetscape needs"],
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
    bestFor: "Smaller families or couples wanting double-storey separation without oversizing the home.",
    designConsiderations: ["Single garage planning keeps the footprint efficient", "Good candidate for compact urban blocks", "Upper and lower zones can be adapted around work and retreat needs"],
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
    bestFor: "Families needing four bedrooms on a tighter block while keeping the home practical and resolved.",
    designConsiderations: ["Narrow frontage should guide facade and garage choices", "Storage planning matters on compact sites", "Living zones can be adjusted around family routines"],
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
    bestFor: "Clients wanting a clean contemporary two-storey home suited to narrower frontage conditions.",
    designConsiderations: ["Facade language can be kept light and simple", "Useful for families who want upstairs/downstairs separation", "Selections can strengthen the coastal-inspired feel"],
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
    bestFor: "Families who want larger living zones, retreat space and a confident two-storey presence.",
    designConsiderations: ["Larger footprint needs early site and budget alignment", "Entertaining zones can be prioritised in planning", "Facade scale should be balanced with streetscape conditions"],
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
    bestFor: "Larger families who want five bedrooms, generous amenity and a premium two-storey design direction.",
    designConsiderations: ["Good option when accommodation count is the driver", "Bathroom and storage planning should be reviewed in detail", "Facade and finishes can carry a more premium expression"],
  },
  {
    slug: "sydney-tce",
    name: "Sydney TCE",
    category: "Display Home",
    beds: 5,
    baths: 4,
    cars: 2,
    frontage: "11.500m",
    image: `${KSH_UPLOADS}/2025/04/image9.jpg`,
    summary: "The King Style display-home experience, showcasing premium finishes, practical planning and detailed craftsmanship.",
    description:
      "Sydney TCE gives clients a chance to walk through a finished King Style home and experience the scale, detail and finish quality in person.",
    highlights: ["Display-home finish quality", "Four-bedroom family plan", "A tactile way to explore selections"],
    bestFor: "Clients who want to understand finish quality, proportions and selections in a completed home before committing.",
    designConsiderations: ["Use the visit to compare room scale against your lifestyle", "Bring selection questions for fixtures, finishes and storage", "Ask how the display approach can translate to your own site"],
  },
];

export const services: Service[] = [
  {
    title: "Custom Home Builds",
    text: "Design and build your dream home with an expert team guiding the process from early ideas through approvals, construction and handover.",
    image: "/kingstyle-home-hero.jpeg",
    details: ["Bespoke layouts", "Design guidance", "Construction management"],
    bestFor: "Clients who want a home shaped around their block, lifestyle and finish expectations.",
    included: ["Briefing and design direction", "Facade and layout guidance", "Approvals pathway coordination", "Selections and construction support"],
    siteConsiderations: "The team reviews the site, frontage, access, orientation and planning constraints before the design direction is locked in.",
    outcome: "A buildable custom home direction with clearer decisions from early concept through handover.",
  },
  {
    title: "Knockdown & Rebuild Duplex Projects",
    text: "Specialist guidance for duplex and multi-dwelling projects, from site review through planning, approvals and construction.",
    image: "/amali-villa-evening-entrance.jpeg",
    details: ["Knockdown rebuild planning", "Multi-dwelling guidance", "Development-focused delivery"],
    bestFor: "Owners who want to unlock more value from a block through a carefully planned multi-dwelling outcome.",
    included: ["Site potential review", "Dwelling mix and layout guidance", "Approval and compliance coordination", "Build delivery planning"],
    siteConsiderations: "Frontage, access, services, privacy, parking and council controls are considered early so the proposal stays realistic.",
    outcome: "A clearer pathway for creating multiple homes on one site without losing practical liveability.",
  },
  {
    title: "Project Management & Overseas Procurement",
    text: "End-to-end project management support, including planning, procurement, supplier coordination, logistics, installation and turnkey delivery.",
    image: "/display-centers/16-3OCT2024-6-43-r.jpg",
    details: ["Project planning", "Procurement coordination", "Turnkey delivery"],
    bestFor: "Clients who want procurement, finishes and project delivery coordinated through one accountable pathway.",
    included: ["Planning and procurement support", "Supplier coordination", "Logistics and installation guidance", "Handover preparation"],
    siteConsiderations: "Budget, timing, sourcing, installation and delivery expectations should be clarified early so procurement supports the build rather than slowing it down.",
    outcome: "A coordinated project delivery pathway that keeps procurement, installation and construction decisions aligned.",
  },
  {
    title: "House and Land Packages",
    text: "Simplify the path to a new home with curated design and land opportunities that suit modern family living.",
    image: "/display-centers/28-3OCT2024-6-78-r.jpg",
    details: ["Design and land pairing", "Budget clarity", "Streamlined selections"],
    bestFor: "Buyers who want the land and home direction considered together from the start.",
    included: ["Design and land pairing", "Package guidance", "Budget and inclusion review", "Selections pathway support"],
    siteConsiderations: "The home design is reviewed against block dimensions, orientation, estate requirements and the buyer's priorities.",
    outcome: "A more streamlined buying path with fewer early unknowns around design fit and inclusions.",
  },
  {
    title: "Renovations & Extensions",
    text: "Transform an existing home through considered upgrades, added space and refined detailing.",
    image: "/display-centers/18-3OCT2024-6-60-r.jpg",
    details: ["Extensions", "Whole-home renovations", "Improved flow and amenity"],
    bestFor: "Owners who like their location but need more space, better flow or a more refined finish.",
    included: ["Existing-home review", "Extension and renovation planning", "Material and finish guidance", "Construction coordination"],
    siteConsiderations: "Existing structure, access, services, staging and how the new work connects to the old home are reviewed carefully.",
    outcome: "A refreshed home that better supports the way the household lives now.",
  },
  {
    title: "Granny Flats",
    text: "Create a functional, stylish extra dwelling for family, guests or rental income with a smooth design-to-build process.",
    image: "/amali-villa-evening-front.jpeg",
    details: ["Secondary dwelling design", "Council coordination", "Compact living expertise"],
    bestFor: "Families adding flexible space for relatives, guests, independent living or future rental income.",
    included: ["Secondary dwelling planning", "Compact layout guidance", "Approval coordination", "Selections and construction delivery"],
    siteConsiderations: "The existing home, access, services, privacy and outdoor space need to work together before the flat is finalised.",
    outcome: "A smaller dwelling that feels considered, functional and connected to the wider property.",
  },
];

export const capabilities: Capability[] = [
  {
    title: "Custom design guidance",
    text: "Every project starts with the client's lifestyle, site and budget so the home direction feels personal and buildable.",
    proof: "Brief, layout, facade and selections are reviewed before the build pathway is locked in.",
  },
  {
    title: "Knockdown rebuild thinking",
    text: "For clients who love their location, a fresh home can be planned around the existing block and future lifestyle needs.",
    proof: "Site conditions, access, services and approvals are treated as early design inputs.",
  },
  {
    title: "Duplex and multi-dwelling planning",
    text: "Development-focused projects need practical dwelling layouts, privacy, parking and approval clarity from the beginning.",
    proof: "The service data covers site potential, multi-dwelling planning and construction delivery.",
  },
  {
    title: "Granny flat flexibility",
    text: "Secondary dwellings can support family independence, guest accommodation or rental goals without feeling like an afterthought.",
    proof: "Compact planning, council coordination and functional selections are part of the offer.",
  },
  {
    title: "Narrow and challenging blocks",
    text: "Several live home designs are already shaped around compact or narrow-frontage conditions.",
    proof: "The collection includes designs with 8.6m and 8.650m frontages.",
  },
  {
    title: "Selections clarity",
    text: "Inclusions and finishes are presented as a guided decision pathway, not a last-minute scramble.",
    proof: "Standard and signature inclusions pages outline approvals, structure, finishes, bathrooms, electrical and warranty items.",
  },
];

export const trustProofItems: TrustProof[] = [
  {
    title: "Western Sydney focus",
    text: "The team is based in Nirimba Fields and builds around the needs of local families, blocks and approval pathways.",
  },
  {
    title: "Practical budget conversations",
    text: "Design, inclusions and site considerations are discussed together so early decisions stay realistic.",
  },
  {
    title: "Approvals coordination",
    text: "Plans, engineering, certifier steps, surveys and related reports are treated as part of the delivery pathway.",
  },
  {
    title: "Display-home confidence",
    text: "Sydney TCE lets clients inspect scale, finishes and selections in person before shaping their own brief.",
  },
  {
    title: "Craft-led finishes",
    text: "The inclusions focus on ceilings, stairs, stone, glazing, bathrooms, storage and detailed finish quality.",
  },
  {
    title: "Handover support",
    text: "Construction, selections and final handover are coordinated so clients know what happens next.",
  },
];

export const inclusionFeatureItems = [
  "2740mm high ceilings on both floors",
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
    title: "Site review",
    text: "Frontage, access, orientation, existing conditions and planning constraints are reviewed so the design direction responds to the block.",
  },
  {
    title: "Concept and design",
    text: "The team shapes the layout, facade and key spaces with you so the home feels personal, practical and buildable.",
  },
  {
    title: "Estimate and proposal",
    text: "The design direction, inclusions and budget expectations are brought together in a clear proposal before the project moves forward.",
  },
  {
    title: "Approvals pathway",
    text: "Plans, engineering, surveys, certifier requirements and relevant authority steps are coordinated as part of the build preparation.",
  },
  {
    title: "Selections",
    text: "Fixtures, finishes, colours and practical details are reviewed so the final home reflects the intended level of quality.",
  },
  {
    title: "Construction updates",
    text: "Site progress, trades and supplier activity are managed through the build with communication around key milestones.",
  },
  {
    title: "Handover",
    text: "The completed home is prepared for handover with final checks, documentation and the practical details needed for move-in.",
  },
];

export const whyBuildItems = [
  "Collaborative design process",
  "Site-aware planning",
  "Budget-conscious guidance",
  "Approvals coordination",
  "Detailed selections support",
  "Craft-led finish quality",
];

export const testimonials = [
  {
    quote: "King Style Homes made our dream home a reality. Their attention to detail and personalised designs exceeded our expectations.",
    name: "Georg Brown",
    projectType: "Custom home",
  },
  {
    quote: "From start to finish, the team was professional, innovative and dedicated. We could not be happier with our new home.",
    name: "Ricky Dey",
    projectType: "New build",
  },
  {
    quote: "The craftsmanship is outstanding. Our home feels truly unique, and every detail reflects the care and expertise of King Style Homes.",
    name: "Json M",
    projectType: "Custom finishes",
  },
  {
    quote: "Seamless construction and top-notch quality. King Style Homes turned our vision into a place where we create lasting memories.",
    name: "Jessy",
    projectType: "Family home",
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
  contactHero: "/amali-villa-evening-entrance.jpeg",
};

// ============================================================================
// PROGRAMMATIC SEO: SUBURBS
// ============================================================================

export type Suburb = {
  slug: string;
  name: string;
  postcode: string;
  lga: "The Hills" | "Blacktown";
  highlight: string;
  blurb: string;
  popularDesignSlugs: string[];
  image: string;
};

export const suburbs: Suburb[] = [
  {
    slug: "kellyville",
    name: "Kellyville",
    postcode: "2155",
    lga: "The Hills",
    highlight: "Established Hills District streets and new-release North Kellyville blocks.",
    blurb:
      "Kellyville mixes mature family streets with the rapidly growing North Kellyville release, where 9–14m frontages dominate. We handle the wider blocks with refined single-storey plans like Havenridge 18 and Kivo 18, and step up to premium five-bedroom doubles for clients building their forever home.",
    popularDesignSlugs: ["havenridge-18", "kivo-18", "lume-31", "ember-37"],
    image: `${KSH_UPLOADS}/2025/02/SINGLE-STORY_05.jpg`,
  },
  {
    slug: "castle-hill",
    name: "Castle Hill",
    postcode: "2154",
    lga: "The Hills",
    highlight: "Knockdown rebuilds and premium custom builds in the heart of the Hills.",
    blurb:
      "Castle Hill is overwhelmingly a knockdown-rebuild market — established blocks with strong land value where families want to stay in the catchment but rebuild for modern living. Wider frontages support generous single-storey and confident two-storey designs with premium street presence.",
    popularDesignSlugs: ["lume-31", "ember-37", "havenridge-18", "noir-19"],
    image: `${KSH_UPLOADS}/2025/02/DOUBLE-STORY_01.jpg`,
  },
  {
    slug: "norwest",
    name: "Norwest",
    postcode: "2153",
    lga: "The Hills",
    highlight: "Contemporary builds for executive families near the Norwest Business Park.",
    blurb:
      "Norwest professionals expect contemporary, refined finishes and clean architectural lines. Lume 31 and Ember 37 suit the larger family demand; narrow-frontage doubles work for compact infill sites within walking distance of Norwest Metro.",
    popularDesignSlugs: ["lume-31", "ember-37", "double-story-05"],
    image: `${KSH_UPLOADS}/2025/02/DOUBLE-STORY_02.jpg`,
  },
  {
    slug: "bella-vista",
    name: "Bella Vista",
    postcode: "2153",
    lga: "The Hills",
    highlight: "Polished family homes with strong street appeal.",
    blurb:
      "Bella Vista blocks support both knockdown rebuilds on established streets and new builds in the surrounding pockets. Clients here lean toward elegant facades, generous accommodation and refined inclusion packages that match the suburb's tone.",
    popularDesignSlugs: ["lume-31", "noir-19", "havenridge-18"],
    image: `${KSH_UPLOADS}/2025/02/SINGLE-STORY_02.jpg`,
  },
  {
    slug: "rouse-hill",
    name: "Rouse Hill",
    postcode: "2155",
    lga: "The Hills",
    highlight: "Family-focused homes across new estates and growing pockets.",
    blurb:
      "Rouse Hill suits families building around the school catchments and Rouse Hill Town Centre. We see a healthy mix of single-storey four and five-bed plans, plus double-storey designs for families wanting separation between living and retreat zones.",
    popularDesignSlugs: ["havenridge-18", "kivo-18", "ember-37", "vista-15"],
    image: `${KSH_UPLOADS}/2025/02/SINGLE-STORY_03.jpg`,
  },
  {
    slug: "box-hill",
    name: "Box Hill",
    postcode: "2765",
    lga: "The Hills",
    highlight: "New estate land releases with narrow-frontage builds.",
    blurb:
      "Box Hill is one of Sydney's fastest-growing release areas, with narrow 8.5–10m frontages typical of the new estates. Belford 23, Coastal 23 and Double Story 05 are our bread-and-butter here — designs built specifically for compact-frontage blocks without sacrificing room count.",
    popularDesignSlugs: ["belford-23", "coastal-23", "double-story-05", "harmony-19"],
    image: `${KSH_UPLOADS}/2025/02/DOUBLE-STORY_03.jpg`,
  },
  {
    slug: "the-ponds",
    name: "The Ponds",
    postcode: "2769",
    lga: "Blacktown",
    highlight: "Established family streets with strong catchments.",
    blurb:
      "The Ponds is a mature growth-corridor suburb with sought-after public school catchments. Knockdown rebuilds are increasingly common; new-build clients lean toward four to five-bedroom designs with double garages and refined facades.",
    popularDesignSlugs: ["havenridge-18", "kivo-18", "lume-31", "ember-37"],
    image: `${KSH_UPLOADS}/2025/02/SINGLE-STORY_04.jpg`,
  },
  {
    slug: "stanhope-gardens",
    name: "Stanhope Gardens",
    postcode: "2768",
    lga: "Blacktown",
    highlight: "Family homes in a mature, walkable suburb.",
    blurb:
      "Stanhope Gardens combines established streets with proximity to Norwest, Bella Vista and Stanhope Village. Most projects are knockdown rebuilds — families staying in the area and building for the next 20 years. Single-storey four-bed plans and refined doubles both feature.",
    popularDesignSlugs: ["single-story-04", "havenridge-18", "noir-19"],
    image: `${KSH_UPLOADS}/2025/02/SINGLE-STORY_01.jpg`,
  },
  {
    slug: "quakers-hill",
    name: "Quakers Hill",
    postcode: "2763",
    lga: "Blacktown",
    highlight: "Affordable family builds and granny flat additions.",
    blurb:
      "Quakers Hill is one of the strongest knockdown-rebuild and secondary-dwelling markets in Western Sydney. Family-budget single-storey designs and granny flat builds drive most enquiries here.",
    popularDesignSlugs: ["vista-15", "single-story-04", "harmony-19"],
    image: `${KSH_UPLOADS}/2025/02/SINGLE-STORY_01.jpg`,
  },
  {
    slug: "schofields",
    name: "Schofields",
    postcode: "2762",
    lga: "Blacktown",
    highlight: "Narrow-frontage new-build estates with rail access.",
    blurb:
      "Schofields is dominated by new estate releases with narrow frontages (8.5–10m typical). Our narrow-frontage doubles — Belford 23, Coastal 23, Double Story 05 — are designed specifically for these blocks. Schofields rail station makes it a strong commuter pick.",
    popularDesignSlugs: ["belford-23", "coastal-23", "double-story-05", "harmony-19"],
    image: `${KSH_UPLOADS}/2025/02/DOUBLE-STORY_04.jpg`,
  },
  {
    slug: "marsden-park",
    name: "Marsden Park",
    postcode: "2765",
    lga: "Blacktown",
    highlight: "Major release area with narrow-block family demand.",
    blurb:
      "Marsden Park is one of Western Sydney's largest active land-release areas. Most blocks are 8.5–12.5m frontage. We build everything from narrow-frontage doubles to wider single-storey family homes across the multiple estates here.",
    popularDesignSlugs: ["double-story-05", "belford-23", "coastal-23", "vista-15"],
    image: `${KSH_UPLOADS}/2025/02/DOUBLE-STORY_03-next.jpg`,
  },
  {
    slug: "riverstone",
    name: "Riverstone",
    postcode: "2765",
    lga: "Blacktown",
    highlight: "Newer estate pockets alongside established streets.",
    blurb:
      "Riverstone mixes established streets, knockdown-rebuild opportunities and newer estate land. We see a healthy spread of single-storey four-bed family plans plus narrow-frontage doubles for the new release pockets.",
    popularDesignSlugs: ["single-story-04", "belford-23", "vista-15"],
    image: `${KSH_UPLOADS}/2025/02/SINGLE-STORY_04.jpg`,
  },
];

// ============================================================================
// PROGRAMMATIC SEO: DESIGN ARCHETYPES
// ============================================================================

export type DesignArchetype = {
  slug: "single-storey" | "double-storey" | "narrow-lot" | "four-bedroom" | "five-bedroom";
  name: string;
  intro: string;
  filter: (d: HomeDesign) => boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
};

function frontageMetres(value: string): number {
  const match = value.match(/[\d.]+/);
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
}

export const designArchetypes: DesignArchetype[] = [
  {
    slug: "single-storey",
    name: "Single Storey Home Designs",
    intro:
      "Single-level homes built around easy circulation, generous bedroom counts and refined facades. Suited to families who want everything on one floor without sacrificing scale or finish.",
    filter: (d) => d.category === "Single Storey",
    seoTitle: "Single Storey Home Designs in Western Sydney | King Style Homes",
    seoDescription:
      "Explore King Style Homes' single storey design collection — four and five-bedroom plans built for Western Sydney families. Refined facades, generous accommodation, premium inclusions.",
    seoKeywords: [
      "single storey home designs",
      "single storey homes sydney",
      "single storey home builder western sydney",
      "one storey home designs",
    ],
  },
  {
    slug: "double-storey",
    name: "Double Storey Home Designs",
    intro:
      "Two-level homes with strong street presence and clear separation between living and retreat zones. From narrow-frontage doubles built for compact infill sites to expansive five-bedroom family homes.",
    filter: (d) => d.category === "Double Storey",
    seoTitle: "Double Storey Home Designs in Western Sydney | King Style Homes",
    seoDescription:
      "Browse King Style Homes' double storey designs — narrow-frontage compatible to premium five-bedroom plans, built for Western Sydney families.",
    seoKeywords: [
      "double storey home designs",
      "two storey home designs sydney",
      "double storey home builder western sydney",
    ],
  },
  {
    slug: "narrow-lot",
    name: "Narrow Lot Home Designs",
    intro:
      "Designs purpose-built for tighter frontages — typical of Schofields, Box Hill and Marsden Park estate blocks. Generous family amenity on 8.5–9m frontage without compromising flow or storage.",
    filter: (d) => frontageMetres(d.frontage) < 9,
    seoTitle: "Narrow Lot Home Designs for Western Sydney | King Style Homes",
    seoDescription:
      "Narrow-frontage home designs (8.5m–9m) for Western Sydney's new-release estates. Compact-block solutions with full family amenity from King Style Homes.",
    seoKeywords: [
      "narrow lot home designs",
      "narrow frontage homes sydney",
      "narrow block home builder",
      "8m frontage home designs",
    ],
  },
  {
    slug: "four-bedroom",
    name: "4 Bedroom Home Designs",
    intro:
      "Four-bedroom plans suited to growing families — from compact single-storey footprints to expansive double-storey designs with dedicated retreat zones.",
    filter: (d) => d.beds === 4,
    seoTitle: "4 Bedroom Home Designs in Western Sydney | King Style Homes",
    seoDescription:
      "Four-bedroom home designs from King Style Homes — single and double storey options for Western Sydney families. Practical layouts, refined facades, premium inclusions.",
    seoKeywords: [
      "4 bedroom home designs",
      "four bedroom homes sydney",
      "4 bedroom home builder western sydney",
    ],
  },
  {
    slug: "five-bedroom",
    name: "5 Bedroom Home Designs",
    intro:
      "Five-bedroom designs for larger families, multi-generational households or families who want a guest suite plus dedicated work-from-home space. Both single and double-storey options.",
    filter: (d) => d.beds === 5,
    seoTitle: "5 Bedroom Home Designs in Western Sydney | King Style Homes",
    seoDescription:
      "Five-bedroom home designs from King Style Homes — single and double storey plans for larger Western Sydney families.",
    seoKeywords: [
      "5 bedroom home designs",
      "five bedroom homes sydney",
      "large family home designs western sydney",
    ],
  },
];

// ============================================================================
// HELPERS FOR PROGRAMMATIC ROUTES
// ============================================================================

export const getSuburb = (slug: string) => suburbs.find((s) => s.slug === slug);

export const getDesignArchetype = (slug: string) =>
  designArchetypes.find((a) => a.slug === slug);

export const isDesignArchetypeSlug = (slug: string): boolean =>
  designArchetypes.some((a) => a.slug === slug);

export const getDesignsForSuburb = (suburb: Suburb): HomeDesign[] =>
  suburb.popularDesignSlugs
    .map((slug) => homeDesigns.find((d) => d.slug === slug))
    .filter((d): d is HomeDesign => Boolean(d));

export const getArchetypeDesigns = (archetype: DesignArchetype): HomeDesign[] =>
  homeDesigns.filter((d) => d.category !== "Display Home" && archetype.filter(d));

