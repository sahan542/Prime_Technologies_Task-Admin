"use client";

import { ChevronDown, ChevronRight, Heart, Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authKey } from "@/constants/authKey";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentUser } from "@/redux/reducers/authSlice";
import { removeUser } from "@/services/auth.services";
import SignInModal from "@/components/modals/SignInModal";
import axios from "axios";
import ActiveLink from "../ActiveLink";
import { MobileMenu } from "./MobileMenu";
import { Input } from "antd";

const categoriesDemo = [

];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isProductsHovered, setIsProductsHovered] = React.useState(false);
  const [hoveredCategory, setHoveredCategory] = React.useState<string | null>(
    null
  );
  const [isClosing, setIsClosing] = React.useState(false);
  const [isSubMenuClosing, setIsSubMenuClosing] = React.useState(false);
  const megaMenuRef = React.useRef<HTMLDivElement>(null);
  const productsButtonRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const subMenuTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [isSignInModalOpen, setIsSignInModalOpen] = React.useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = React.useState(false); // Track signup modal state

  const dispatch = useAppDispatch();
  const router = useRouter();

  const pathname = usePathname();
  //sahan removed
  const user = useAppSelector(useCurrentUser);

    const openSignInModal = () => {
      setIsSignInModalOpen(true);
      setIsDropdownOpen(false);
    };
    const closeSignInModal = () => setIsSignInModalOpen(false);
  
    const openSignUpModal = () => {
      setIsSignUpModalOpen(true);
      setIsDropdownOpen(false); 
    };
    const closeSignUpModal = () => setIsSignUpModalOpen(false); 
  
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle menu opening with delay
  const handleMenuEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsClosing(false);
    setIsProductsHovered(true);
  };

  const handleMenuLeave = () => {
    setIsClosing(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsProductsHovered(false);
      setHoveredCategory(null);
      setIsClosing(false);
    }, 300);
  };


  // Handle submenu closing with delay for smooth transition
  const handleCategoryLeave = () => {
    setIsSubMenuClosing(true);
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current);
    }
    subMenuTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
      setIsSubMenuClosing(false);
    }, 300);
  };

  const handleLogout = async () => {
    await axios.post("/api/auth/remove-cookies", {
      accessToken: authKey,
    });
    dispatch(logout());
    removeUser();

    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#7b1f4b] text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex gap-2">
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[350px] bg-secondary"
              >
                <SheetHeader>
                  <SheetTitle>
                    <div className="pt-4 flex items-center justify-center text-white ">
                      <Link href="/" className="font-bold text-xl">
                        MobileShop
                      </Link>
                    </div>
                  </SheetTitle>
                  <SheetDescription className="hidden"></SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <div className="flex flex-row items-center gap-5 ">
              <Link href="/" className="font-bold text-xl">
                <img src="/brizz2bella.png" alt="Logo" className="w-[127.5px] sm:w-[180px]" />
              </Link>
            </div>
          </div>

          <div className="flex gap-4">

            {/* Right side icons */}
            <div className="ml-auto flex items-center space-x-4">
              <div className="flex gap-0">

              </div>

              {/* login/logout button */}
              <div className="flex items-center gap-4">
                {user ? (
                  <Button
                    className="cursor-pointer bg-orange-600 text-white hover:bg-white hover:text-orange-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                    <Button className="cursor-pointer bg-white text-[#5550A0] hover:bg-white/90" onClick={openSignInModal}>
                      Login
                    </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
            {/* SignIn Modal */}
            <SignInModal isOpen={isSignInModalOpen} closeModal={closeSignInModal} openSignUpModal={openSignUpModal}/>
            {/* SignUp Modal */}
    </header>
  );
};

export default Navbar;
