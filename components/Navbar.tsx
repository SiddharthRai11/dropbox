"use client";

import { useClerk, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { CloudUpload, ChevronDown, User, Menu, X } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { useState, useEffect, useRef } from "react";

interface SerializedUser {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  username?: string | null;
  emailAddress?: string | null;
}

interface NavbarProps {
  user?: SerializedUser | null;
}

export default function Navbar({ user }: NavbarProps) {
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Check if we're on the dashboard page
  const isOnDashboard =
    pathname === "/dashboard" || pathname?.startsWith("/dashboard/");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle clicks outside the mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        // Check if the click is not on the menu button (which has its own handler)
        const target = event.target as HTMLElement;
        if (!target.closest('[data-menu-button="true"]')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = () => {
    signOut(() => {
      router.push("/");
    });
  };

  // Process user data with defaults if not provided
  const userDetails = {
    fullName: user
      ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
      : "",
    initials: user
      ? `${user.firstName || ""} ${user.lastName || ""}`
          .trim()
          .split(" ")
          .map((name) => name?.[0] || "")
          .join("")
          .toUpperCase() || "U"
      : "U",
    displayName: user
      ? user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.firstName || user.username || user.emailAddress || "User"
      : "User",
    email: user?.emailAddress || "",
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`bg-white sticky top-0 z-50 transition-shadow ${isScrolled ? "shadow-md" : "shadow-none"} rounded-b-xl`}
    >
      <div className="container mx-auto py-4 md:py-5 px-4 md:px-8 flex items-center justify-between">
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-10 group">
            <CloudUpload className="h-7 w-7 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-blue-700 transition-colors duration-200">Droply</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            {/* Show these buttons when user is signed out */}
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="flat" color="primary" className="rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="solid" color="primary" className="rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
                  Sign Up
                </Button>
              </Link>
            </SignedOut>

            {/* Show these when user is signed in */}
            <SignedIn>
              <div className="flex items-center gap-4">
                {!isOnDashboard && (
                  <Link href="/dashboard">
                    <Button variant="flat" color="primary" className="rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="flat"
                      className="p-0 bg-transparent min-w-0 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                      endContent={<ChevronDown className="h-4 w-4 ml-2" />}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar
                          name={userDetails.initials}
                          size="sm"
                          src={user?.imageUrl || undefined}
                          className="h-8 w-8 flex-shrink-0"
                          fallback={<User className="h-4 w-4" />}
                        />
                        <span className="text-default-600 hidden sm:inline">
                          {userDetails.displayName}
                        </span>
                      </div>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User actions">
                    <DropdownItem
                      key="profile"
                      description={userDetails.email || "View your profile"}
                      onClick={() => router.push("/dashboard?tab=profile")}
                    >
                      Profile
                    </DropdownItem>
                    <DropdownItem
                      key="files"
                      description="Manage your files"
                      onClick={() => router.push("/dashboard")}
                    >
                      My Files
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      description="Sign out of your account"
                      className="text-danger"
                      color="danger"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <SignedIn>
              <Avatar
                name={userDetails.initials}
                size="sm"
                src={user?.imageUrl || undefined}
                className="h-8 w-8 flex-shrink-0"
                fallback={<User className="h-4 w-4" />}
              />
            </SignedIn>
            <button
              className="z-50 p-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              data-menu-button="true"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-default-700" />
              ) : (
                <Menu className="h-6 w-6 text-default-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Mobile Menu */}
          <div
            ref={mobileMenuRef}
            className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white z-40 flex flex-col pt-20 px-8 shadow-2xl transition-transform duration-300 ease-in-out rounded-l-2xl border-l border-gray-200 ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:hidden`}
          >
            <SignedOut>
              <div className="flex flex-col gap-4 items-center">
                <Link
                  href="/sign-in"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="flat" color="primary" className="w-full rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
                    Sign In
                  </Button>
                </Link>
                <Link
                  href="/sign-up"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="solid" color="primary" className="w-full rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex flex-col gap-6">
                {/* User info */}
                <div className="flex items-center gap-3 py-4 border-b border-default-200">
                  <Avatar
                    name={userDetails.initials}
                    size="md"
                    src={user?.imageUrl || undefined}
                    className="h-10 w-10 flex-shrink-0"
                    fallback={<User className="h-5 w-5" />}
                  />
                  <div>
                    <p className="font-medium">{userDetails.displayName}</p>
                    <p className="text-sm text-default-500">
                      {userDetails.email}
                    </p>
                  </div>
                </div>

                {/* Navigation links */}
                <div className="flex flex-col gap-4">
                  {!isOnDashboard && (
                    <Link
                      href="/dashboard"
                      className="py-2 px-3 hover:bg-default-100 rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href="/dashboard?tab=profile"
                    className="py-2 px-3 hover:bg-default-100 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="py-2 px-3 text-left text-danger hover:bg-danger-50 rounded-md transition-colors mt-4"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSignOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}