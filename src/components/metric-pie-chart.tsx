'use client';

import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';

import { Card, CardContent, ChartContainer } from '@/components/ui';

export default function MetricPieChart({
  label,
  color,
  value,
}: {
  label: string;
  color: string;
  value: number;
}) {
  return (
    <Card className="bg-sidebar" x-chunk="charts-01-chunk-5">
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex flex-col justify-between gap-0.5 md:flex-row">
          <div className="whitespace-nowrap text-sm text-muted-foreground">
            {label}
          </div>
          <div className="flex items-baseline gap-1 whitespace-nowrap text-xl font-bold tabular-nums leading-none">
            {value}
            <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
              / 100
            </span>
          </div>
        </div>

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
