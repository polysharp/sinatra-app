'use client';

import { ChartConfig, ChartContainer } from '@/components/ui';
import {
  accessibilityConfig,
  bestPracticesConfig,
  performanceConfig,
  seoConfig,
} from '@/constants';
import { Analysis } from '@/interfaces';
import { useCallback } from 'react';
import { RadialBarChart, PolarAngleAxis, RadialBar } from 'recharts';

export default function AnalysisPieChart({
  config,
  data,
}: {
  config: ChartConfig;
  data: Analysis;
}) {
  const chartData = useCallback(() => {
    return [
      {
        fill: bestPracticesConfig.fill,
        value: data[bestPracticesConfig.ref],
      },
      {
        fill: seoConfig.fill,
        value: data[seoConfig.ref],
      },
      {
        fill: accessibilityConfig.fill,
        value: data[accessibilityConfig.ref],
      },
      {
        fill: performanceConfig.fill,
        value: data[performanceConfig.ref],
      },
    ];
  }, [data]);

  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square max-h-52 w-full"
    >
      <RadialBarChart
        margin={{
          left: -10,
          right: -10,
          top: -10,
          bottom: -10,
        }}
        data={chartData()}
        innerRadius="20%"
        barSize={24}
        startAngle={90}
        endAngle={450}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          dataKey="value"
          tick={false}
        />
        <RadialBar dataKey="value" background cornerRadius={5} />
      </RadialBarChart>
    </ChartContainer>
  );
}
