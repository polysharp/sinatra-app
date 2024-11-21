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
  verifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
