import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/DashboardContent";
import { CloudUpload } from "lucide-react";
import Navbar from "@/components/Navbar";

export default async function Dashboard() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  // Serialize the user data to avoid passing the Clerk User object directly
  const serializedUser = user
    ? {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        username: user.username,
        emailAddress: user.emailAddresses?.[0]?.emailAddress,
      }
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar user={serializedUser} />

      <main className="flex-1 container mx-auto py-10 px-4 md:px-10 rounded-2xl shadow-lg bg-white mt-6 mb-8">
        <DashboardContent
          userId={userId}
          userName={
            user?.firstName ||
            user?.fullName ||
            user?.emailAddresses?.[0]?.emailAddress ||
            ""
          }
        />
      </main>

      <footer className="bg-white border-t border-gray-100 py-4 mt-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <CloudUpload className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">Droply</h2>
          </div>
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Droply</p>
        </div>
      </footer>
    </div>
  );
}