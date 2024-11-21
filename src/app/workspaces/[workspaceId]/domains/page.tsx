import { getDomains } from '@/api';

import {
  Badge,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { statusToVariant } from '@/lib';
import { DomainActions, DomainToggle } from './components';

export default async function Domains({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const workspaceId = (await params).workspaceId;
  const domains = await getDomains(workspaceId);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Domain</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Active</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {domains
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
          .map((domain) => (
            <TableRow key={domain.id}>
              <TableCell>
                <Badge variant={'outline'}>{domain.name}</Badge>
              </TableCell>

              <TableCell>
                <Badge variant={statusToVariant(domain.verificationStatus)}>
                  {domain.verificationStatus}
                </Badge>
              </TableCell>

              <TableCell>
                {new Date(domain.createdAt).toLocaleString('fr-FR')}
              </TableCell>

              <TableCell>
                <DomainToggle domain={domain} />
              </TableCell>

              <TableCell>
                <DomainActions domain={domain} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
