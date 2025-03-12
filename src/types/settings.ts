export interface SystemSettings {
  companyName: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string | null;
  apiConfig: {
    apiName: string;
    apiKey: string;
    apiStatus: 'not_tested' | 'connected' | 'error';
  };
}

export interface UserManagement {
  users: Array<{
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    createdAt: Date;
  }>;
}
