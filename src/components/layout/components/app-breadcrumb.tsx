import { Slash } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui';
import { BreadcrumbProps } from '@/interfaces';

export default function AppBreadcrumb({ paths }: { paths: BreadcrumbProps[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;

          return !isLast ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={path.href}>{path.label}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
            </>
          ) : (
            <BreadcrumbItem>
              <BreadcrumbPage>{path.label}</BreadcrumbPage>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
