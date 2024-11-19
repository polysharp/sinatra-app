export enum DomainVerificationStatus {
  PENDING,
  VERIFIED,
  FAILED,
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
