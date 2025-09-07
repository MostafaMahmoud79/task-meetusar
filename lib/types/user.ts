export type UserInfo = {
  id: number;
  name: string;
  email: string;
  addresses: unknown[];
  organization_id: number;
  shop_id: number;
  roles: string[];
  status: string;
  referral: string;
  is_influencer: boolean;
};

export type User = {
  token: string;
  refresh: string;
  userInfo: {
    id: number;
    name: string;
    email: string;
    roles: string[];
    imageUrl: string | null;
    organizationId: number;
    isEmployee: boolean;
    shopId: number;
  };
};
