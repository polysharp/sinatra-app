import { AppMain, AppTopbar } from '@/components/layout';

export default async function SiteWithId({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  const { siteId } = await params;

  return (
    <>
      <AppTopbar />
      <AppMain>
        <h2 className="text-sm">Site {siteId}</h2>
      </AppMain>
    </>
  );
}
