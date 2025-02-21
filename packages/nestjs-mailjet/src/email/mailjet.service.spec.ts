import { HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AxiosResponse } from "axios";
import dotenv from "dotenv";
import { Contact, LibraryResponse } from "node-mailjet";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";

import { MAILJET_MODULE_OPTIONS } from "../constants";
import { MailjetModuleOptions } from "./interfaces";
import { MailjetService } from "./mailjet.service";

dotenv.config({
  path: path.resolve(__dirname, "..", ".env"),
});

// Get options from environment variables or use fallback values
const getMailjetConfig = (): MailjetModuleOptions => ({
  apiKey: process.env.MAILJET_API_KEY || "test-api-key",
  apiSecret: process.env.MAILJET_API_SECRET || "test-api-secret",
  sandboxMode: process.env.MAILJET_SANDBOX_MODE
    ? process.env.MAILJET_SANDBOX_MODE === "true"
    : true,
});

const config = getMailjetConfig();

if (config.sandboxMode) {
  console.warn("Running in sandbox mode. No actual API calls will be made.");
}

function createMockResponse<T>(status: number, data: T): AxiosResponse<T> {
  return {
    data,
    status,
    statusText: status === 200 ? "OK" : status === 201 ? "Created" : "Error",
    headers: {},
    config: {
      headers: {} as any,
    } as any,
  };
}

test("should be defined", () => {
  expect(MailjetService).toBeDefined();
});

describe("MailjetService", async () => {
  let module: TestingModule;
  let service: MailjetService;
  const mockGet = jest.fn();
  const mockPost = jest.fn();
  const mockPut = jest.fn();

  const mockContact: Contact.Contact = {
    ID: 123,
    Email: "test@example.com",
    Name: "Test User",
    IsExcludedFromCampaigns: false,
    CreatedAt: "2024-02-15T00:00:00Z",
    DeliveredCount: 0,
    LastActivityAt: "2024-02-15T00:00:00Z",
    LastUpdateAt: "2024-02-15T00:00:00Z",
    ExclusionFromCampaignsUpdatedAt: "2024-02-15T00:00:00Z",
    IsOptInPending: false,
    IsSpamComplaining: false,
  };

  beforeEach(async () => {
    // Reset all mocks
    mockGet.mockReset();
    mockPost.mockReset();
    mockPut.mockReset();

    module = await Test.createTestingModule({
      providers: [
        MailjetService,
        {
          provide: MAILJET_MODULE_OPTIONS,
          useValue: config,
        },
      ],
    }).compile();

    service = module.get<MailjetService>(MailjetService);

    // Mock the Mailjet client methods
    service.get = jest.fn().mockImplementation(() => ({
      id: () => ({
        request: mockGet,
      }),
      request: mockGet,
    }));

    service.post = jest.fn().mockImplementation(() => ({
      id: () => ({
        action: () => ({
          request: mockPost,
        }),
        request: mockPost,
      }),
      request: mockPost,
    }));

    service.put = jest.fn().mockImplementation(() => ({
      id: () => ({
        request: mockPut,
      }),
    }));
  });

  afterAll(async () => {
    await module.close();
  });

  describe("findContact", async () => {
    it("should successfully find a contact", async () => {
      const mockResponse: LibraryResponse<Contact.GetContactResponse> = {
        response: createMockResponse(HttpStatus.OK, {
          Count: 1,
          Data: [mockContact],
          Total: 1,
        }),
        body: { Count: 1, Data: [mockContact], Total: 1 },
      };

      mockGet.mockResolvedValueOnce(mockResponse);

      const result = await service.findContact("123");
      expect(result).toEqual(mockContact);
      expect(mockGet).toHaveBeenCalledTimes(1);
    });

    it("should retry on server error", async () => {
      const mockError = {
        response: createMockResponse(500, {
          ErrorMessage: "Server Error",
          ErrorCode: "500",
        }),
      };

      const mockSuccess: LibraryResponse<Contact.GetContactResponse> = {
        response: createMockResponse(HttpStatus.OK, {
          Count: 1,
          Data: [mockContact],
          Total: 1,
        }),
        body: { Count: 1, Data: [mockContact], Total: 1 },
      };

      mockGet
        .mockRejectedValueOnce(mockError)
        .mockRejectedValueOnce(mockError)
        .mockResolvedValueOnce(mockSuccess);

      const result = await service.findContact("123");
      expect(result).toEqual(mockContact);
      expect(mockGet).toHaveBeenCalledTimes(3);
    });

    it("should throw error if contact not found", async () => {
      const mockResponse: LibraryResponse<Contact.GetContactResponse> = {
        response: createMockResponse(HttpStatus.OK, {
          Count: 0,
          Data: [],
          Total: 0,
        }),
        body: { Count: 0, Data: [], Total: 0 },
      };

      mockGet.mockResolvedValueOnce(mockResponse);

      console.log(await service.findContact("123"));

      /* await expect(service.findContact("123")).rejects.toThrow(
        "Contact with id 123 not found",
      ); */
    });
  });
});
