export interface GoogleDriveConfig {
  clientId: string;
  clientSecret: string;
  apiKey: string;
  isConfigured: boolean;
}

export interface BackupEntry {
  id: string;
  createdAt: Date;
  size: number;
  fileName: string;
  status: 'success' | 'failed' | 'in_progress';
}

export interface BackupSettings {
  automaticBackupEnabled: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  maxBackups: number;
}
