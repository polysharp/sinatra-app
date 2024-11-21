import { getDomains } from '@/api';
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import VerifyDomainButton from '@/components/VerifyDomainButton';
import { DomainVerificationStatus } from '@/interfaces';
import { statusToVariant } from '@/lib';

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
          <TableHead>Id</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {domains.map((domain) => (
          <TableRow key={domain.id}>
            <TableCell>{domain.name}</TableCell>
            <TableCell>{domain.verificationKey}</TableCell>
            <TableCell>
              <Badge
                variant={statusToVariant(domain.verificationStatus)}
                className="capitalize"
              >
                {domain.verificationStatus}
              </Badge>
            </TableCell>
            <TableCell>
              {domain.verificationStatus ===
              DomainVerificationStatus.VERIFIED ? (
                <div className="h-10 w-10" />
              ) : (
                <VerifyDomainButton domainId={domain.id} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
