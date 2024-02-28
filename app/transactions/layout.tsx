import TransactionHeader from "../ui/transactions/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <TransactionHeader/>
      {children}
    </div>
  );
}
