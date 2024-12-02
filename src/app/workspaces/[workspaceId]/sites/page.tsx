import { AppMain, AppTopbar } from '@/components/layout';

export default async function Sites() {
  return (
    <>
      <AppTopbar />
      <AppMain>
        <h2 className="text-sm">Sites</h2>
      </AppMain>
    </>
  );
}
