export interface CompanySchema {
  id: string;
  owner: UserSchema | null;
  name: string;
  description?: string;
  visibility: boolean;
  created_at: string;
  updated_at: string;
}

export interface CompanyCreate {
  name: string;
  description?: string;
  visibility?: boolean;
}

export interface CompanyUpdate {
  name?: string;
  description?: string;
  visibility?: boolean;
}

export interface CompaniesList {
  companies: CompanySchema[];
  total: number;
}
