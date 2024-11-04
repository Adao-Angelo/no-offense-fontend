import Header from "@/components/Header";
import { EdgeStoreProvider } from "@/lib/edgestore";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div>
        <EdgeStoreProvider>
          <Header />
          {children}
        </EdgeStoreProvider>
      </div>
    </section>
  );
}
