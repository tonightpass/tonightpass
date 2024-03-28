import { Endpoint } from "../../endpoints";

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

export type CareersEndpoints =
  | Endpoint<
      "GET",
      "/careers/categories",
      CareersCategory[],
      {
        language?: string;
      }
    >
  | Endpoint<
      "GET",
      "/careers/employmentTypes",
      CareersEmploymentType[],
      {
        language?: string;
      }
    >
  | Endpoint<
      "GET",
      "/careers/jobs",
      CareersJob[],
      {
        page?: number;
        pageSize?: number;
        createdAtGte: string;
        createdAtLt?: string;
        updatedAtGte?: string;
        updatedAtLt?: string;
        status?: "ALL" | "ONLINE" | "ARCHIVED";
        content?: boolean;
        titleLike?: string;
        countryCode?: string;
        externalId?: string;
      }
    >
  | Endpoint<"GET", "/careers/jobs/:id", CareersJob, { id: number }>
  | Endpoint<
      "GET",
      "/careers/offices",
      CareersOffice[],
      {
        page?: number;
        pageSize?: number;
        countryCode?: string;
        cityNameLike?: string;
      }
    >;
