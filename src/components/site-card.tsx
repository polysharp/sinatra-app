import Link from 'next/link';

import { AnalysisPieChart } from '@/components/charts';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartConfig,
} from '@/components/ui';
import {
  accessibilityConfig,
  bestPracticesConfig,
  performanceConfig,
  seoConfig,
} from '@/constants';
import { Site } from '@/interfaces';
import { getLastAnalysis } from '@/api';

const chartConfig = {
  [performanceConfig.ref]: {
    label: performanceConfig.label,
    color: performanceConfig.color,
  },
  [accessibilityConfig.ref]: {
    label: accessibilityConfig.label,
    color: accessibilityConfig.color,
  },
  [seoConfig.ref]: {
    label: seoConfig.label,
    color: seoConfig.color,
  },
  [bestPracticesConfig.ref]: {
    label: bestPracticesConfig.label,
    color: bestPracticesConfig.color,
  },
} satisfies ChartConfig;

export default async function SiteCard({
  workspaceId,
  site,
}: {
  workspaceId: string;
  site: Site;
}) {
  const lastAnalysis = await getLastAnalysis(workspaceId, site.id);

  return (
    <Card className="bg-sidebar">
      <CardHeader className="flex items-center justify-between gap-2 space-y-0 border-b py-5 sm:flex-row">
        <CardTitle className="whitespace-nowrap text-sm">{site.name}</CardTitle>
        <CardDescription>
          <Button asChild>
            <Link href={`/workspaces/${workspaceId}/sites/${site.id}`}>
              Open
            </Link>
          </Button>
        </CardDescription>
      </CardHeader>

      {lastAnalysis && (
        <CardContent className="grid grid-cols-2 gap-4 p-6">
          <div className="grid grid-cols-2 items-center justify-center gap-2">
            {[
              performanceConfig.ref,
              accessibilityConfig.ref,
              seoConfig.ref,
              bestPracticesConfig.ref,
            ].map((key) => (
              <div key={key} className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm capitalize text-muted-foreground">
                  {key}
                </div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  <span className="text-white">{lastAnalysis[key]}</span>
                  <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                    / 100
                  </span>
                </div>
              </div>
            ))}
          </div>
          <AnalysisPieChart config={chartConfig} data={lastAnalysis} />
        </CardContent>
      )}
    </Card>
  );
}
