import Sidebar from "@/components/sidebar";

export default function Agenda() {
  return (
    <div className="flex min-h-screen">
      <Sidebar activeScreen="agenda" />

      <main className="flex-1 overflow-auto p-8"></main>
    </div>
  );
}
