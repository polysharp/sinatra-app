'use client';

import { Area, AreaChart, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui';

export default function MetricAreaChar({
  label,
  color,
  data,
}: {
  label: string;
  color: string;
  data: { date: string; score: number }[];
}) {
  return (
    <Card className="bg-sidebar" x-chunk="charts-01-chunk-7">
      <CardHeader className="space-y-0 pb-0">
        <CardDescription>One-Week Score Average</CardDescription>
        <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
          90
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            / 100
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <ChartContainer
          className="max-h-96 w-full"
          config={{
            score: {
              label: label,
              color: color,
            },
          }}
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" hide />
            <YAxis domain={['dataMin - 5', 'dataMax + 2']} hide />
            <defs>
              <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-score)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-score)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="score"
              type="natural"
              fill="url(#fillTime)"
              fillOpacity={0.4}
              stroke="var(--color-score)"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              formatter={(value) => (
                <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                  Score
                  <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                    {value}
                    <span className="font-normal text-muted-foreground">
                      /100
                    </span>
                  </div>
                </div>
              )}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
