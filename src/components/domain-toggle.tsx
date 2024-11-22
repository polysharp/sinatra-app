'use client';

import { Switch } from '@/components/ui';
import { Domain } from '@/interfaces';
import { useState } from 'react';

export default function DomainToggle({ domain }: { domain: Domain }) {
  const [enable, setEnable] = useState<boolean>(true);

  return <Switch checked={enable} onCheckedChange={setEnable} />;
}
