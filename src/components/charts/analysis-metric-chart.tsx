'use client';

import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
} from '@/components/ui';

export default function AnalysisMetricChart({
  label,
  color,
  value,
}: {
  label: string;
  color: string;
  value: number;
}) {
  return (
    <Card className="bg-sidebar">
      <CardHeader className="flex items-center justify-between gap-2 space-y-0 border-b py-5 sm:flex-row">
        <CardTitle className="whitespace-nowrap text-sm">{label}</CardTitle>
        <CardDescription className="flex items-baseline gap-1 whitespace-nowrap text-xl font-bold tabular-nums leading-none">
          <span className="text-white">{value}</span>
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            / 100
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer
          config={{
            metric: {
              label,
              color,
            },
          }}
          className="mx-auto aspect-square w-full max-w-[80%]"
        >
          <RadialBarChart
            margin={{
              left: -10,
              right: -10,
              top: -10,
              bottom: -10,
            }}
            data={[
              {
                metric: label,
                value: value,
                fill: 'var(--color-metric)',
              },
            ]}
            innerRadius="60%"
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
      </CardContent>
    </Card>
  );
}
