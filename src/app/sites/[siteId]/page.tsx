export default async function Site({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  const { siteId } = await params;

  return (
    <div>
      <h2 className="text-sm">Site {siteId}</h2>
    </div>
  );
}
