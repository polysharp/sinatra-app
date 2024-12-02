import {
  AppWindowMac,
  ChartPie,
  Globe,
  LayoutDashboard,
  ReceiptText,
  Settings,
  UsersRound,
} from 'lucide-react';
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
} from '@/components/ui';
import { Workspace } from '@/interfaces';

import { UserMenu, WorkspaceMenu } from './components';
import UpdagradeCard from './components/upgrade-card';

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
    tooltip: 'Analysis',
    icon: ChartPie,
    label: 'Analysis',
    link: (workspaceId: number) => `/workspaces/${workspaceId}/analysis`,
  },
  {
    tooltip: 'Domains',
    icon: Globe,
    label: 'Domains',
    link: (workspaceId: number) => `/workspaces/${workspaceId}/domains`,
  },
  {
    tooltip: 'Members',
    icon: UsersRound,
    label: 'Members',
    link: (workspaceId: number) => `/workspaces/${workspaceId}/members`,
  },
  {
    tooltip: 'Billings',
    icon: ReceiptText,
    label: 'Billings',
    link: (workspaceId: number) => `/workspaces/${workspaceId}/billings`,
  },
  {
    tooltip: 'Settings',
    icon: Settings,
    label: 'Workspace settings',
    link: (workspaceId: number) => `/workspaces/${workspaceId}/settings`,
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
        <WorkspaceMenu workspace={workspace} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild tooltip={item.tooltip}>
                    <Link href={item.link(workspace.id)}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <UpdagradeCard />
        <UserMenu
          user={{
            avatar: 'https://github.com/shadcn.png',
            email: 'john@doe.com',
            name: 'John Doe',
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
