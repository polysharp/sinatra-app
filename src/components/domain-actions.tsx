'use client';

import { Clipboard, RefreshCcw, Trash2 } from 'lucide-react';
import { useCallback } from 'react';

import { verifyDomain } from '@/api';
import { Button } from '@/components/ui/button';
import { Domain, DomainVerificationStatus } from '@/interfaces';

export default function DomainActions({ domain }: { domain: Domain }) {
  const isVerified = useCallback(() => {
    return domain.verificationStatus === DomainVerificationStatus.VERIFIED;
  }, [domain]);

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(domain.verificationKey);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerify = async () => {
    try {
      await verifyDomain(domain.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async () => {
    try {
      console.log('Remove domain');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Button size={'icon'} variant={'ghost'} onClick={handleCopy}>
        <Clipboard />
      </Button>

      <Button
        size={'icon'}
        variant={'ghost'}
        onClick={handleVerify}
        disabled={isVerified()}
      >
        <RefreshCcw />
      </Button>

      <Button size={'icon'} variant={'ghost'} onClick={handleRemove}>
        <Trash2 />
      </Button>
    </div>
  );
}
