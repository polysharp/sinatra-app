export default function AppTopbar({ children }: { children: React.ReactNode }) {
  return (
    <header className="flex shrink-0 items-center gap-2 pb-3">
      <div className="flex flex-grow items-center justify-between">
        {children}
      </div>
    </header>
  );
}
