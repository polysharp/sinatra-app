export default function AppMain({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 p-6">
      {children}
    </div>
  );
}
