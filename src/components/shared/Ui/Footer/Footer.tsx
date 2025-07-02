// import {
//   Facebook,
//   Instagram,
//   Mail,
//   MapPin,
//   Phone,
//   Twitter,
// } from "lucide-react";
// import Link from "next/link";
// import Container from "../Container";

// export default function Footer() {
//   return (
//     <footer className="bg-secondary text-gray-100 pt-16 pb-8">
//       <Container>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div>
//             <h3 className="font-bold text-lg mb-4">XiaomiParts</h3>
//             <p className="text-gray-200 mb-4">
//               Your trusted source for quality Xiaomi replacement parts and
//               accessories.
//             </p>
//             <div className="flex space-x-4">
//               <Link href="#" className="text-gray-200 hover:text-primary">
//                 <Facebook className="h-5 w-5" />
//               </Link>
//               <Link href="#" className="text-gray-200 hover:text-primary">
//                 <Instagram className="h-5 w-5" />
//               </Link>
//               <Link href="#" className="text-gray-200 hover:text-primary">
//                 <Twitter className="h-5 w-5" />
//               </Link>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="font-bold text-lg mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link href="/" className="text-gray-200 hover:text-primary">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/products"
//                   className="text-gray-200 hover:text-primary"
//                 >
//                   Products
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/about"
//                   className="text-gray-200 hover:text-primary"
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/contact"
//                   className="text-gray-200 hover:text-primary"
//                 >
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Categories */}
//           <div>
//             <h3 className="font-bold text-lg mb-4">Top Categories</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   href="/category/xiaomi_display"
//                   className="text-gray-200 hover:text-primary"
//                 >
//                   Displays & Screens
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/category/xiaomi_battery"
//                   className="text-gray-200 hover:text-primary"
//                 >
//                   Batteries
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/category/xiaomi_camera"
//                   className="text-gray-200 hover:text-primary"
//                 >
//                   Camera Modules
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/category/xiaomi_accessories"
//                   className="text-gray-200 hover:text-primary"
//                 >
//                   Accessories
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="font-bold text-lg mb-4">Contact Us</h3>
//             <ul className="space-y-3">
//               <li className="flex items-start">
//                 <MapPin className="h-5 w-5 text-gray-200 mr-2 mt-0.5" />
//                 <span className="text-gray-200">
//                   123 Repair Street, Electronics District, 12345
//                 </span>
//               </li>
//               <li className="flex items-center">
//                 <Phone className="h-5 w-5 text-gray-200 mr-2" />
//                 <span className="text-gray-200">+1 (234) 567-8900</span>
//               </li>
//               <li className="flex items-center">
//                 <Mail className="h-5 w-5 text-gray-200 mr-2" />
//                 <span className="text-gray-200">support@gmail.com</span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </Container>
//       <div className="border-t border-gray-600 mt-12 pt-6">
//         <p className="text-center text-gray-200 text-sm">
//           © {new Date().getFullYear()} XiaomiParts. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }
