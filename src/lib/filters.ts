import { Domain, DomainVerificationStatus, Site } from '@/interfaces';

export function domainIsNotVerified(domain: Domain): boolean {
  return domain.verificationStatus !== DomainVerificationStatus.VERIFIED;
}

export function domainAlreadyUsed(domain: Domain, sites: Site[]): boolean {
  return sites.some((site) => site.domainId === domain.id);
}
