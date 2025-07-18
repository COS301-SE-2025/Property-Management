export interface AuthTokens {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  userType: string;
  userId: string;
}

export interface BodyCoporateRegisterResponse {
  corporateUuid: string;
  corporateName: string;
  email: string;
  cognitoUserId: string;
  username: string;
  emailVerificationRequired: boolean;
}

export interface trusteeRegisterResponse {
  email: string;
  cognitoUserId: string;
  username: string;
}

export interface contractorRegisterResponse {
  email: string;
  username: string;
}