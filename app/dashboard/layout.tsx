import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import HamburgerProvider from "@/context/ContextHamburger";
import QueryProvider from "@/lib/QueryClientProvider";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth"; // Make sure you import the Session type
import { ReactNode } from "react";

const DashboardLayout = ({
  children,
  session,
}: {
  children: ReactNode;
  session: Session;
}) => {
  return (
    <SessionProvider session={session}>
      <QueryProvider>
        <HamburgerProvider>
          <Header />
          <main className="flex max-w-screen-2xl mx-auto">
            <Sidebar />
            <div className="flex-auto mx-4 md:ml-52 mt-20 overflow-x-hidden h-full">
              {children}
            </div>
          </main>
        </HamburgerProvider>
      </QueryProvider>
    </SessionProvider>
  );
};

export default DashboardLayout;
