export interface BackgroundCategory {
  id: string;
  name: string;
  description?: string;
}

export interface Background {
  id: string;
  title: string;
  imageUrl: string;
  categoryId: string;
  uploadedAt: Date;
}
