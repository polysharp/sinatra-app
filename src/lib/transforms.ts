import { DomainVerificationStatus } from '@/interfaces';

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

export function strToLocaleStr(date: string) {
  try {
    return new Date(date).toLocaleString('fr-FR');
  } catch (err) {
    console.error(err);
    return '';
  }
}
