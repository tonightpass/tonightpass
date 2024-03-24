export type CareersOffice = {
  id: number | null;
  isDefault: boolean | null;
  name: string | null;
  city: string | null;
  countryIso: string | null;
};

export type CareersJob = {
  id: number;
  createdAt: string;
  lastUpdatedAt: string;
  externalId: null | string;
  title: string;
  status: "ALL" | "ONLINE" | "ARCHIVED";
  remote: boolean;
  office: CareersOffice;
  workplaceType: string;
  remoteType?: string;
  description?: string;
  categoryId?: number;
  employmentTypeId?: number;
};

export type CareersCategory = {
  slug: string;
  name: string;
  subCategories?: (CareersCategory & {
    id: number;
  })[];
};

export type CareersEmploymentType = {
  id: number;
  name: string;
  slug: string;
};
