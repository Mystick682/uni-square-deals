export const universities = [
  { id: "ui", name: "University of Ibadan", short: "UI", city: "Ibadan" },
  { id: "oau", name: "Obafemi Awolowo University", short: "OAU", city: "Ile-Ife" },
  { id: "unilag", name: "University of Lagos", short: "UNILAG", city: "Lagos" },
  { id: "uniben", name: "University of Benin", short: "UNIBEN", city: "Benin City" },
  { id: "unilorin", name: "University of Ilorin", short: "UNILORIN", city: "Ilorin" },
  { id: "abu", name: "Ahmadu Bello University", short: "ABU", city: "Zaria" },
  { id: "cu", name: "Covenant University", short: "CU", city: "Ota" },
  { id: "futa", name: "Federal University of Technology Akure", short: "FUTA", city: "Akure" },
  { id: "lasu", name: "Lagos State University", short: "LASU", city: "Lagos" },
];

export const categories = [
  { id: "phones", name: "Phones", emoji: "📱" },
  { id: "laptops", name: "Laptops", emoji: "💻" },
  { id: "electronics", name: "Electronics", emoji: "🎧" },
  { id: "books", name: "Books", emoji: "📚" },
  { id: "academic", name: "Academic Materials", emoji: "✏️" },
  { id: "fashion", name: "Fashion", emoji: "👕" },
  { id: "hostels", name: "Hostels", emoji: "🏠" },
  { id: "furniture", name: "Furniture", emoji: "🛋️" },
  { id: "gadgets", name: "Gadgets", emoji: "⌚" },
  { id: "services", name: "Services", emoji: "🛠️" },
  { id: "tutoring", name: "Tutoring", emoji: "🎓" },
  { id: "freelance", name: "Freelance", emoji: "💼" },
];

export type Listing = {
  id: string;
  title: string;
  price: number;
  condition: "New" | "Like New" | "Used" | "Refurbished";
  category: string;
  university: string;
  location: string;
  image: string;
  seller: { name: string; verified: boolean; trusted: boolean; rating: number };
  featured?: boolean;
  postedDaysAgo: number;
};

const img = (q: string, seed: number) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=800&q=70&sig=${seed}`;

export const listings: Listing[] = [
  {
    id: "1",
    title: "MacBook Pro 13\" M1 (2021) — 8GB / 256GB",
    price: 720000,
    condition: "Like New",
    category: "laptops",
    university: "unilag",
    location: "Akoka Hall",
    image: img("1517336714731-489689fd1ca8", 1),
    seller: { name: "Tunde A.", verified: true, trusted: true, rating: 4.9 },
    featured: true,
    postedDaysAgo: 2,
  },
  {
    id: "2",
    title: "iPhone 13 — 128GB, Battery 92%",
    price: 425000,
    condition: "Used",
    category: "phones",
    university: "ui",
    location: "Mellanby Hall",
    image: img("1592750475338-74b7b21085ab", 2),
    seller: { name: "Adaeze O.", verified: true, trusted: false, rating: 4.7 },
    featured: true,
    postedDaysAgo: 1,
  },
  {
    id: "3",
    title: "Sony WH-1000XM4 Headphones",
    price: 145000,
    condition: "Like New",
    category: "electronics",
    university: "oau",
    location: "Awo Hall",
    image: img("1583394838336-acd977736f90", 3),
    seller: { name: "Kemi B.", verified: true, trusted: true, rating: 5.0 },
    featured: true,
    postedDaysAgo: 3,
  },
  {
    id: "4",
    title: "Organic Chemistry Textbook (Clayden, 2nd Ed.)",
    price: 12000,
    condition: "Used",
    category: "books",
    university: "abu",
    location: "Suleiman Hall",
    image: img("1544947950-fa07a98d237f", 4),
    seller: { name: "Ibrahim S.", verified: false, trusted: false, rating: 4.3 },
    postedDaysAgo: 5,
  },
  {
    id: "5",
    title: "Off-campus single room — 1 yr lease",
    price: 350000,
    condition: "New",
    category: "hostels",
    university: "futa",
    location: "Obakekere",
    image: img("1505691938895-1758d7feb511", 5),
    seller: { name: "Hostel Hub", verified: true, trusted: true, rating: 4.8 },
    postedDaysAgo: 1,
  },
  {
    id: "6",
    title: "Reading Desk + Ergonomic Chair Combo",
    price: 48000,
    condition: "Used",
    category: "furniture",
    university: "unilorin",
    location: "Tanke",
    image: img("1555041469-a586c61ea9bc", 6),
    seller: { name: "Grace M.", verified: true, trusted: false, rating: 4.5 },
    postedDaysAgo: 4,
  },
  {
    id: "7",
    title: "Calculus Tutoring (MTH 101 / 102) — per session",
    price: 3500,
    condition: "New",
    category: "tutoring",
    university: "cu",
    location: "On-campus / Zoom",
    image: img("1503676260728-1c00da094a0b", 7),
    seller: { name: "Daniel E.", verified: true, trusted: true, rating: 4.9 },
    postedDaysAgo: 6,
  },
  {
    id: "8",
    title: "Apple Watch SE (40mm) — boxed",
    price: 165000,
    condition: "Like New",
    category: "gadgets",
    university: "lasu",
    location: "Ojo",
    image: img("1546868871-7041f2a55e12", 8),
    seller: { name: "Femi K.", verified: true, trusted: false, rating: 4.6 },
    postedDaysAgo: 2,
  },
];

export const formatNaira = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);
