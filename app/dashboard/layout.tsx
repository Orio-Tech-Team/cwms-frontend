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
      <div className="relative w-[100%]">
        <Navbar />
        <div className="h-[70px]" />
        <div className="overflow-y-scroll overflow-x-hidden max-w-[calc(100vw_-_300px)] h-[calc(100vh_-_70px)] p-2 bg-[#f4f5fd]">
          {children}
        </div>
      </div>
    </section>
  );
}
