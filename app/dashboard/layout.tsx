import Navbar from "../../components/Layout/Navbar";
import Sidebar from "../../components/Layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="relative w-[100%] bg-green-600">
        <Navbar />
        <div className="h-[70px]" />
        <div className="overflow-y-scroll overflow-x-hidden h-[calc(100vh_-_70px)] p-2">
          {children}
        </div>
      </div>
    </section>
  );
}
