'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DOMAINS = ['polysharp.fr', 'yopta.life'];

export function CreateSiteForm() {
  const [domain, setDomain] = useState<string>(DOMAINS[0]);

  const onDomainChange = (value: string) => {
    const targetDomain = DOMAINS.find((d) => d === value);
    if (targetDomain) {
      setDomain(targetDomain);
    }
  };

  return (
    <div className="mt-4 flex gap-4 p-2">
      <Input type="text" name="customerId" placeholder="Customer id" required />
      <Select value={domain} onValueChange={onDomainChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {DOMAINS.map((domain) => (
            <SelectItem key={domain} value={domain}>
              {domain}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input type="text" name="apiKey" placeholder="Api key" />

      <Button variant="default">Add new site</Button>
    </div>
  );
}
