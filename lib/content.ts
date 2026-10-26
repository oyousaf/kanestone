export const contact = {
  email: "info@kanestone.co.uk",
};

export const nav = [
  { href: "#collection", label: "Collection" },
  { href: "#film", label: "Film" },
  { href: "#sectors", label: "Partners" },
  { href: "#enquire", label: "Enquire" },
];

export const founderQuote = [
  "Kanestone Limited is a British luxury automotive company specialising in the provision of prestigious vehicles to businesses and industry professionals.",
  "Established with an ambitious vision for the future of premium vehicle supply, Kanestone brings together an appreciation for exceptional automobiles with a commercially focused approach to vehicle acquisition, deployment and long-term partnerships.",
  "Our business is centred on providing access to some of the world’s most desirable vehicles, with a particular emphasis on the distinguished British marques that have shaped the global luxury automotive landscape.",
];

export type Marque = "Rolls-Royce" | "Bentley" | "Aston Martin" | "Land Rover";

export type Vehicle = {
  slug: string;
  marque: Marque;
  model: string;
  body: string;
  image: string;
  width: number;
  height: number;
};

export const vehicles: Vehicle[] = [
  { slug: "cullinan", marque: "Rolls-Royce", model: "Cullinan", body: "Luxury SUV", image: "/media/fleet/cullinan.png", width: 1516, height: 1038 },
  { slug: "phantom", marque: "Rolls-Royce", model: "Phantom", body: "Flagship Saloon", image: "/media/fleet/phantom.png", width: 1516, height: 1038 },
  { slug: "ghost", marque: "Rolls-Royce", model: "Ghost", body: "Saloon", image: "/media/fleet/ghost.png", width: 1515, height: 1038 },
  { slug: "range-rover", marque: "Land Rover", model: "Range Rover", body: "Luxury SUV", image: "/media/fleet/range-rover.png", width: 1659, height: 948 },
  { slug: "bentayga", marque: "Bentley", model: "Bentayga", body: "Luxury SUV", image: "/media/fleet/bentayga.png", width: 1445, height: 1089 },
  { slug: "flying-spur", marque: "Bentley", model: "Flying Spur", body: "Grand Saloon", image: "/media/fleet/flying-spur.png", width: 1659, height: 948 },
  { slug: "db12", marque: "Aston Martin", model: "DB12", body: "Super Tourer", image: "/media/fleet/db12.png", width: 1660, height: 948 },
  { slug: "vantage", marque: "Aston Martin", model: "Vantage", body: "Sports Car", image: "/media/fleet/vantage.png", width: 1667, height: 943 },
];

export const marques: Marque[] = ["Rolls-Royce", "Bentley", "Aston Martin", "Land Rover"];

export const sectors = [
  { title: "Hotels & Luxury Hospitality", line: "Arrivals that match the address.", image: "/media/sectors/hospitality.jpg" },
  { title: "Film, Television & Media", line: "Hero vehicles for productions and premieres.", image: "/media/sectors/film.jpg" },
  { title: "Chauffeur", line: "Fleet supply for executive chauffeur operators.", image: "/media/sectors/chauffeur.jpg" },
  { title: "Accident Management & Insurance", line: "Like-for-like replacement for prestige claims.", image: "/media/sectors/insurance.jpg" },
  { title: "Corporate & Business Clients", line: "Long-term supply for the boardroom and beyond.", image: "/media/sectors/corporate.jpg" },
  { title: "Security & Close Protection", line: "Discreet vehicles for protective operations.", image: "/media/sectors/security.jpg" },
];

export const pillars = [
  {
    word: "Bold",
    title: "An Uncompromising Pursuit of Excellence.",
    image: "/media/film/still-phantom.jpg",
  },
  {
    word: "British",
    title: "Four Iconic Marques. One British Identity.",
    image: "/media/brand/marques.png",
  },
  {
    word: "Bespoke",
    title: "Tailored Solutions. Exceptional Standards.",
    image: "/media/film/still-mulliner.jpg",
  },
];
