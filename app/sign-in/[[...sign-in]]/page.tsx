import SignInForm from "@/components/SigninForm";
//import { CloudUpload } from "lucide-react";
//import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Use the unified Navbar component */}
      <Navbar />

      <main className="flex-1 flex justify-center items-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-600 mb-6">Sign In</h1>
          <SignInForm />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-4">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Droply</p>
        </div>
      </footer>
    </div>
  );
}