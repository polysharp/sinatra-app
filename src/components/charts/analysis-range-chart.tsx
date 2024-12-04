'use client';

import { useCallback, useState } from 'react';
import { Area, AreaChart, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { Analysis } from '@/interfaces';

export default function AnalysisRangeChart({
  dataKey,
  label,
  color,
  values,
}: {
  dataKey: 'performance' | 'accessibility' | 'seo' | 'bestPractices';
  label: string;
  color: string;
  values: Analysis[];
}) {
  const [timeRange, setTimeRange] = useState<string>('7');

  const filteredData = values.filter((value) => {
    const date = new Date(value.updatedAt);
    const referenceDate = new Date();

    let daysToSubtract = 7;
    if (timeRange === '15') {
      daysToSubtract = 15;
    } else if (timeRange === '30') {
      daysToSubtract = 30;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  const averageDataScore = useCallback(() => {
    const totalScore = filteredData.reduce((acc, value) => {
      return acc + value[dataKey];
    }, 0);

    return totalScore / filteredData.length;
  }, [dataKey, filteredData]);

  return (
    <Card className="bg-sidebar">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>{label}</CardTitle>
          <CardDescription className="flex items-baseline gap-1 whitespace-nowrap text-xl font-bold tabular-nums leading-none">
            <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
              Average score :
            </span>
            <span className="text-white">{averageDataScore().toFixed(0)}</span>
            <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
              / 100
            </span>
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Today" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="15">Last 15 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={{
            score: {
              label: label,
              color: color,
            },
          }}
          className="aspect-auto h-64 w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id={`fill${dataKey}`} x1="0" y1="0" x2="0" y2="1">
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

            <XAxis
              dataKey="updatedAt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey={dataKey}
              type="natural"
              fill={`url(#fill${dataKey})`}
              stroke="var(--color-score)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
