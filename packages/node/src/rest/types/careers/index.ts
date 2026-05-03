import type { Endpoint } from "../../endpoints";
import type { ArrayOptions, ArrayResult } from "..";

export type CareersOffice = {
  id: number | null;
  isDefault: boolean | null;
  name: string | null;
  city: string | null;
  countryIso: string | null;
};

export enum CareersJobStatus {
  All = "ALL",
  Online = "ONLINE",
  Archived = "ARCHIVED",
}

export enum CareersWorkplaceType {
  Onsite = "ONSITE",
  Remote = "REMOTE",
  Hybrid = "HYBRID",
}

export enum CareersRemoteType {
  Anywhere = "ANYWHERE",
  Country = "COUNTRY",
}

export type CareersJob = {
  id: number;
  createdAt: string;
  lastUpdatedAt: string;
  externalId: null | string;
  title: string;
  status: CareersJobStatus;
  remote: boolean;
  office: CareersOffice;
  workplaceType: CareersWorkplaceType;
  remoteType?: CareersRemoteType;
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

export type CareersJobsOptions = ArrayOptions<CareersJob> & {
  createdAtGte?: string;
  createdAtLt?: string;
  updatedAtGte?: string;
  updatedAtLt?: string;
  status?: CareersJobStatus;
  content?: boolean;
  titleLike?: string;
  countryCode?: string;
  externalId?: string;
};

export type CareersOfficesOptions = ArrayOptions<CareersOffice> & {
  countryCode?: string;
  cityNameLike?: string;
};

export type CareersCategoriesOptions = ArrayOptions<CareersCategory> & {
  language?: string;
};

export type CareersEmploymentTypesOptions =
  ArrayOptions<CareersEmploymentType> & {
    language?: string;
  };

export type CareerEndpoints =
  | Endpoint<
      "GET",
      "/careers/categories",
      ArrayResult<CareersCategory>,
      CareersCategoriesOptions
    >
  | Endpoint<
      "GET",
      "/careers/employmentTypes",
      ArrayResult<CareersEmploymentType>,
      CareersEmploymentTypesOptions
    >
  | Endpoint<
      "GET",
      "/careers/jobs",
      ArrayResult<CareersJob>,
      CareersJobsOptions
    >
  | Endpoint<"GET", "/careers/jobs/:jobId", CareersJob, { jobId: number }>
  | Endpoint<
      "GET",
      "/careers/offices",
      ArrayResult<CareersOffice>,
      CareersOfficesOptions
    >;
