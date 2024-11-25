import { AppWindowMac, Globe, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui';
import { Workspace } from '@/interfaces';

import { WorkspaceMenu } from './components';

const navigation = [
  {
    tooltip: 'Dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
    link: (workspaceId: number) => `/workspaces/${workspaceId}`,
  },
  {
    tooltip: 'Sites',
    icon: AppWindowMac,
    label: 'Sites',
    link: (workspaceId: number) => `/workspaces/${workspaceId}/sites`,
  },
  {
    tooltip: 'Domains',
    icon: Globe,
    label: 'Domains',
    link: (workspaceId: number) => `/workspaces/${workspaceId}/domains`,
  },
];

export default async function AppSidebar({
  workspace,
}: {
  workspace: Workspace;
}) {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <WorkspaceMenu workspace={workspace} />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            {navigation.map((item) => (
              <SidebarMenu key={item.label}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={item.tooltip}>
                    <Link href={item.link(workspace.id)}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
