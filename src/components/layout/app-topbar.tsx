import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';

export default function AppTopbar({ children }: { children: React.ReactNode }) {
  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b border-[#252525] bg-[#111111] px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 h-4 w-[1px] shrink-0 bg-border"
      />
      <div className="flex flex-grow items-center justify-between">
        {children}
      </div>
    </header>
  );
}
