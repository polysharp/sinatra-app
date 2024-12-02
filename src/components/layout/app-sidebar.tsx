import {
  AppWindowMac,
  ChartPie,
  Globe,
  Key,
  LayoutDashboard,
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
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui';
import { Workspace } from '@/interfaces';

import { UserMenu, WorkspaceMenu } from './components';
import UpdagradeCard from './components/upgrade-card';

const navigation = {
  main: [
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
  ],
  sub: [
    {
      tooltip: 'Domains',
      icon: Globe,
      label: 'Domains',
      link: (workspaceId: number) => `/workspaces/${workspaceId}/domains`,
    },
    {
      tooltip: 'Keys',
      icon: Key,
      label: 'Keys',
      link: (workspaceId: number) => `/workspaces/${workspaceId}/keys`,
    },
    {
      tooltip: 'Members',
      icon: UsersRound,
      label: 'Members',
      link: (workspaceId: number) => `/workspaces/${workspaceId}/members`,
    },
    {
      tooltip: 'Settings',
      icon: Settings,
      label: 'Settings',
      link: (workspaceId: number) => `/workspaces/${workspaceId}/settings`,
    },
  ],
};

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
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.main.map((item) => (
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

        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.sub.map((item) => (
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
