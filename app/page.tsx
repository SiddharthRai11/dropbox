import { Button } from "@heroui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import {
  CloudUpload,
  Shield,
  Folder,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Use the unified Navbar component */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-16 md:py-28 px-4 md:px-8 bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
                    Store your <span className="text-blue-600">images</span> with ease
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-500 font-medium">
                    Simple. Secure. Fast.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-6 justify-center lg:justify-start">
                  <SignedOut>
                    <Link href="/sign-up">
                      <Button size="lg" variant="solid" color="primary" className="rounded-full shadow-md hover:shadow-lg transition-all duration-200">
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/sign-in">
                      <Button size="lg" variant="flat" color="primary" className="rounded-full shadow-md hover:shadow-lg transition-all duration-200">
                        Sign In
                      </Button>
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        variant="solid"
                        color="primary"
                        className="rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                        endContent={<ArrowRight className="h-4 w-4" />}
                      >
                        Go to Dashboard
                      </Button>
                    </Link>
                  </SignedIn>
                </div>
              </div>

              <div className="flex justify-center order-first lg:order-last">
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-white rounded-full blur-2xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="h-32 md:h-40 w-32 md:w-40 text-blue-400/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 md:py-20 px-4 md:px-8 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">
                What You Get
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <Card className="border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
                <CardBody className="p-8 text-center">
                  <CloudUpload className="h-12 md:h-14 w-12 md:w-14 mx-auto mb-5 text-blue-500" />
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">
                    Quick Uploads
                  </h3>
                  <p className="text-gray-500">Drag, drop, done.</p>
                </CardBody>
              </Card>

              <Card className="border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
                <CardBody className="p-8 text-center">
                  <Folder className="h-12 md:h-14 w-12 md:w-14 mx-auto mb-5 text-blue-500" />
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">
                    Smart Organization
                  </h3>
                  <p className="text-gray-500">
                    Keep it tidy, find it fast.
                  </p>
                </CardBody>
              </Card>

              <Card className="border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow rounded-2xl sm:col-span-2 md:col-span-1 mx-auto sm:mx-0 max-w-md sm:max-w-full">
                <CardBody className="p-8 text-center">
                  <Shield className="h-12 md:h-14 w-12 md:w-14 mx-auto mb-5 text-blue-500" />
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">
                    Locked Down
                  </h3>
                  <p className="text-gray-500">
                    Your images, your eyes only.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">
              Ready?
            </h2>
            <SignedOut>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    variant="solid"
                    color="primary"
                    className="rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                    endContent={<ArrowRight className="h-4 w-4" />}
                  >
                    Let&apos;s Go
                  </Button>
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="solid"
                  color="primary"
                  className="rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                  endContent={<ArrowRight className="h-4 w-4" />}
                >
                  Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </section>
      </main>

      {/* Simple footer */}
      <footer className="bg-white border-t border-gray-100 py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <CloudUpload className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Droply</h2>
            </div>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Droply
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
