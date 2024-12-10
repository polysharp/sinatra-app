import { AnalysisStatus, DomainVerificationStatus } from '@/interfaces';

export function statusToVariant(
  status: DomainVerificationStatus | AnalysisStatus,
) {
  switch (status) {
    case DomainVerificationStatus.VERIFIED:
    case AnalysisStatus.SUCCESS:
      return 'sucess';
    case DomainVerificationStatus.PENDING:
    case AnalysisStatus.PENDING:
      return 'pending';
    case DomainVerificationStatus.FAILED:
    case AnalysisStatus.FAILED:
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
