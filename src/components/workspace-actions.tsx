'use client';

import { AppWindowMac, Globe, Key, Users } from 'lucide-react';
import { useState } from 'react';

import { Domain } from '@/interfaces';
import { cn } from '@/lib';

import CreateDomainDialog from './create-domain-dialog';
import CreateSiteDialog from './create-site-dialog';

export default function WorkspaceActions({
  workspaceId,
  workspaceDomains,
}: {
  workspaceId: string;
  workspaceDomains: Domain[];
}) {
  const [domainDialogOpen, setDomainDialogOpen] = useState<boolean>(false);
  const [siteDialogOpen, setSiteDialogOpen] = useState<boolean>(false);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            key: '0',
            label: 'Create domain',
            subLabel: 'for your workspace',
            icon: Globe,
            iconColor: 'bg-blue-100',
            handler: setDomainDialogOpen,
          },
          {
            key: '1',
            label: 'Create API Key',
            subLabel: 'secure for integrations',
            icon: Key,
            iconColor: 'bg-yellow-100',
            handler: () => {},
          },
          {
            key: '2',
            label: 'Create site',
            subLabel: 'from a template or from scratch',
            icon: AppWindowMac,
            iconColor: 'bg-green-100',
            handler: setSiteDialogOpen,
          },
          {
            key: '3',
            label: 'Manage user',
            subLabel: 'update user roles and permissions',
            icon: Users,
            iconColor: 'bg-red-100',
            handler: () => {},
          },
        ].map((action) => (
          <button
            key={action.key}
            onClick={() => action.handler(true)}
            className="flex h-[72px] items-center gap-4 rounded-lg bg-sidebar p-4 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <div
              className={cn(
                'flex-shrink-0 rounded-lg bg-blue-100 p-2',
                action.iconColor,
              )}
            >
              <action.icon size={16} color="black" />
            </div>
            <div className="flex flex-col text-left">
              <span>{action.label}</span>
              <span className="text-xs text-neutral-400">
                {action.subLabel}
              </span>
            </div>
          </button>
        ))}
      </div>

      <CreateDomainDialog
        workspaceId={workspaceId}
        open={domainDialogOpen}
        setOpen={setDomainDialogOpen}
      />
      <CreateSiteDialog
        workspaceDomains={workspaceDomains}
        open={siteDialogOpen}
        setOpen={setSiteDialogOpen}
      />
    </>
  );
}
