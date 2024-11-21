export enum DomainVerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  FAILED = 'FAILED',
}

export interface Domain {
  id: string;
  workspaceId: string;
  name: string;
  verificationKey: string;
  verificationStatus: DomainVerificationStatus;
  verifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
