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
      icon: LayoutDashboard,
      label: 'Dashboard',
      link: (workspaceId: number) => `/workspaces/${workspaceId}`,
    },
    {
      icon: AppWindowMac,
      label: 'Sites',
      link: (workspaceId: number) => `/workspaces/${workspaceId}/sites`,
    },
    {
      icon: ChartPie,
      label: 'Analyses',
      link: (workspaceId: number) => `/workspaces/${workspaceId}/analysis`,
    },
  ],
  sub: [
    {
      icon: Globe,
      label: 'Domains',
      link: (workspaceId: number) => `/workspaces/${workspaceId}/domains`,
    },
    {
      icon: Key,
      label: 'Keys',
      link: (workspaceId: number) => `/workspaces/${workspaceId}/keys`,
    },
    {
      icon: UsersRound,
      label: 'Members',
      link: (workspaceId: number) => `/workspaces/${workspaceId}/members`,
    },
    {
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
                  <SidebarMenuButton asChild tooltip={item.label}>
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
                  <SidebarMenuButton asChild tooltip={item.label}>
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
