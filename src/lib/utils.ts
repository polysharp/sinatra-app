import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { DomainVerificationStatus } from '@/interfaces';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function statusToVariant(
  domainVerificationStatus: DomainVerificationStatus,
) {
  switch (domainVerificationStatus) {
    case DomainVerificationStatus.VERIFIED:
      return 'sucess';
    case DomainVerificationStatus.PENDING:
      return 'pending';
    case DomainVerificationStatus.FAILED:
      return 'error';
    default:
      return 'default';
  }
}
