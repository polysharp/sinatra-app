import { getRangeAnalysis } from '@/api';
import { AppMain, AppTopbar } from '@/components/layout';
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { statusToVariant } from '@/lib';

export default async function Analyses({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const workspaceId = (await params).workspaceId;

  const analyses = await getRangeAnalysis(workspaceId, null, { limit: 20 });

  return (
    <>
      <AppTopbar
        paths={[
          { label: 'Workspace', href: `/workspaces/${workspaceId}` },
          { label: 'Analyses', href: `/workspaces/${workspaceId}/analyses` },
        ]}
      />
      <AppMain>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Site Id</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analyses.map((analysis) => (
              <TableRow key={analysis.id}>
                <TableCell className="font-medium">{analysis.id}</TableCell>
                <TableCell>{analysis.siteId}</TableCell>
                <TableCell>{analysis.updatedAt}</TableCell>
                <TableCell>
                  <Badge variant={statusToVariant(analysis.status)}>
                    {analysis.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AppMain>
    </>
  );
}
