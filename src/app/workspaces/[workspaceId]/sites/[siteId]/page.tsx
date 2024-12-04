import dayjs from 'dayjs';

import { getLastAnalysis, getRangeAnalysis } from '@/api';
import { AnalysisMetricChart, AnalysisRangeChart } from '@/components/charts';
import { AppMain, AppTopbar } from '@/components/layout';
import {
  accessibilityConfig,
  bestPracticesConfig,
  performanceConfig,
  seoConfig,
} from '@/constants';

export default async function SiteWithId({
  params,
}: {
  params: Promise<{ workspaceId: string; siteId: string }>;
}) {
  const { workspaceId, siteId } = await params;

  const lastAnalysisPromise = getLastAnalysis(workspaceId, siteId);
  const lastDaysAnalysisPromise = getRangeAnalysis(workspaceId, siteId, {
    startDate: dayjs().subtract(30, 'days').toISOString(),
  });

  const [lastAnalysis, lastDaysAnalysis] = await Promise.all([
    lastAnalysisPromise,
    lastDaysAnalysisPromise,
  ]);

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
        {lastAnalysis && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <AnalysisMetricChart
              label={performanceConfig.label}
              color={performanceConfig.color}
              value={lastAnalysis.performance}
            />
            <AnalysisMetricChart
              label={accessibilityConfig.label}
              color={accessibilityConfig.color}
              value={lastAnalysis.accessibility}
            />
            <AnalysisMetricChart
              label={seoConfig.label}
              color={seoConfig.color}
              value={lastAnalysis.seo}
            />
            <AnalysisMetricChart
              label={bestPracticesConfig.label}
              color={bestPracticesConfig.color}
              value={lastAnalysis.bestPractices}
            />
          </div>
        )}

        {lastDaysAnalysis && (
          <>
            <AnalysisRangeChart
              dataKey="performance"
              label={performanceConfig.label}
              color={performanceConfig.color}
              values={lastDaysAnalysis}
            />
            <AnalysisRangeChart
              dataKey="accessibility"
              label={accessibilityConfig.label}
              color={accessibilityConfig.color}
              values={lastDaysAnalysis}
            />
            <AnalysisRangeChart
              dataKey="seo"
              label={seoConfig.label}
              color={seoConfig.color}
              values={lastDaysAnalysis}
            />
            <AnalysisRangeChart
              dataKey="bestPractices"
              label={bestPracticesConfig.label}
              color={bestPracticesConfig.color}
              values={lastDaysAnalysis}
            />
          </>
        )}
      </AppMain>
    </>
  );
}
