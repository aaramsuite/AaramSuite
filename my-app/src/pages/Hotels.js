import img1 from "./logo512.png";
import img2 from "./logo512.png";
import img3 from "./logo512.png";

// Rooms for Hotel Shyam
const roomsShyam = [
  {
    title: "Deluxe Room",
    description: "A luxurious room with premium amenities and a beautiful view.",
    images: [img1, img2, img3],
  },
  {
    title: "Standard Room",
    description: "A comfortable room with all the essentials for a great stay.",
    images: [img2, img3, img1],
  },
  {
    title: "Suite",
    description: "An elegant suite with plenty of space and luxurious amenities.",
    images: [img3, img1, img2],
  },
];

// Rooms for Hotel Royal
const roomsRoyal = [
  {
    title: "Luxury Suite",
    description: "A spacious suite with a king-sized bed and a beautiful view.",
    images: [img1, img2, img3],
  },
  {
    title: "Family Room",
    description: "A large room perfect for families with children.",
    images: [img3, img1, img2],
  },
  {
    title: "Budget Room",
    description: "A simple, comfortable room for a budget-friendly stay.",
    images: [img2, img1, img3],
  },
];

// Rooms for Hotel Palace
const roomsPalace = [
  {
    title: "Presidential Suite",
    description: "A luxurious suite with private amenities and a panoramic view.",
    images: [img3, img1, img2],
  },
  {
    title: "Penthouse",
    description: "A grand penthouse with modern amenities and an expansive living area.",
    images: [img1, img2, img3],
  },
  {
    title: "Basic Room",
    description: "A cozy room with all the essentials for a short stay.",
    images: [img2, img1, img3],
  },
];

const hotels = [
  {
    hotelName: "Hotel Shyam",
    hotelCity: "Jaipur",
    rooms: roomsShyam,
    // about:"lorem5",
  },
  {
    hotelName: "Hotel Royal",
    hotelCity: "Udaipur",
    rooms: roomsRoyal,
  },
  {
    hotelName: "Hotel Palace",
    hotelCity: "Jodhpur",
    rooms: roomsPalace,
  },
  // Add more hotels as needed with their unique rooms
];

export { hotels };
