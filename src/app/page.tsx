import Link from 'next/link';

export default async function Root() {
  return (
    <div>
      <Link href={'/workspaces'}>Go to workspaces</Link>
    </div>
  );
}
