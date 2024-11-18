import { CreateSiteForm } from '@/components/forms/create-site-form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Site {
  id: number;
  domain: string;
  apiKey: string;
  status: 'pending' | 'verified';
}

async function getSites(): Promise<Site[]> {
  return Promise.resolve<Site[]>([
    {
      id: 0,
      domain: 'polysharp.fr',
      apiKey: '0101-abcde-0101',
      status: 'pending',
    },
  ]);
}

export default async function Sites() {
  const sites = await getSites();

  return (
    <div>
      <div className="border border-black p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>ApiKey</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sites.map((site) => (
              <TableRow key={site.id}>
                <TableCell>{site.id}</TableCell>
                <TableCell>{site.domain}</TableCell>
                <TableCell>{site.apiKey}</TableCell>
                <TableCell>{site.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateSiteForm />
    </div>
  );
}
