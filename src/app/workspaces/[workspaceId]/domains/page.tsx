import { getDomains } from '@/api';
import { DomainActions, DomainToggle } from '@/components';
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { newestToOldest, statusToVariant, strToLocaleStr } from '@/lib';

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
        {domains.sort(newestToOldest('createdAt')).map((domain) => (
          <TableRow key={domain.id}>
            <TableCell>
              <Badge variant={'outline'}>{domain.name}</Badge>
            </TableCell>

            <TableCell>
              <Badge variant={statusToVariant(domain.verificationStatus)}>
                {domain.verificationStatus}
              </Badge>
            </TableCell>

            <TableCell>{strToLocaleStr(domain.createdAt)}</TableCell>

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
