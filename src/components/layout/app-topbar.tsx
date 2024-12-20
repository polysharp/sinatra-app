import { Separator, SidebarTrigger } from '@/components/ui';
import { BreadcrumbProps } from '@/interfaces';

import { AppBreadcrumb } from './components';

export default function AppTopbar({ paths }: { paths?: BreadcrumbProps[] }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />
      {paths && <AppBreadcrumb paths={paths} />}
    </header>
  );
}
