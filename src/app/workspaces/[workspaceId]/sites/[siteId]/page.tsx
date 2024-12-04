import { AppMain, AppTopbar } from '@/components/layout';
import MetricAreaChart from '@/components/metric-area-chat';
import MetricPieChart from '@/components/metric-pie-chart';

const analyses = [
  {
    metric: 'Performance',
    value: 100,
    fill: 'hsl(var(--chart-1))',
  },
  {
    metric: 'Accessibility',
    value: 48,
    fill: 'hsl(var(--chart-2))',
  },
  {
    metric: 'Seo',
    value: 67,
    fill: 'hsl(var(--chart-3))',
  },
  {
    metric: 'Best Practices',
    value: 92,
    fill: 'hsl(var(--chart-5))',
  },
];

const average = [
  {
    date: '2024-01-01',
    score: 90,
  },
  {
    date: '2024-01-02',
    score: 89,
  },
  {
    date: '2024-01-03',
    score: 100,
  },
  {
    date: '2024-01-04',
    score: 72,
  },
  {
    date: '2024-01-05',
    score: 69,
  },
  {
    date: '2024-01-06',
    score: 98,
  },
  {
    date: '2024-01-07',
    score: 95,
  },
];

export default async function SiteWithId({
  params,
}: {
  params: Promise<{ workspaceId: string; siteId: string }>;
}) {
  const { workspaceId, siteId } = await params;

  return (
    <>
      <AppTopbar
        paths={[
          { label: 'Workspace', href: `/workspaces/${workspaceId}` },
          { label: 'Sites', href: `/workspaces/${workspaceId}/sites` },
          { label: 'Site', href: `/workspaces/${workspaceId}/sites/${siteId}` },
        ]}
      />
      <AppMain>
        <h2 className="text-sm">Site {siteId}</h2>

        <div className="grid grid-cols-4 gap-4">
          {analyses.map((analysis) => (
            <div key={analysis.metric} className="col-span-1">
              <MetricPieChart
                label={analysis.metric}
                color={analysis.fill}
                value={analysis.value}
              />
            </div>
          ))}

          <div className="col-span-4">
            <MetricAreaChart
              label="Score"
              color="hsl(var(--chart-4))"
              data={average}
            />
          </div>
        </div>
      </AppMain>
    </>
  );
}
