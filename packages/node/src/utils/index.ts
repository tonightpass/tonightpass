import { OrganizationMemberRolePower } from "../constants";
import { OrganizationMemberRole } from "../rest/types/organizations/members";

export const isBrowser = typeof window !== "undefined";

/**
 * File object with uri/name/type structure
 */
export type FileObject = {
  uri: string;
  name: string;
  type: string;
};

/**
 * Build a FormData object from a file or multiple files
 * @param key - The form field name for the file(s)
 * @param files - A single File, an array of Files, a FileList, or file object(s)
 * @returns FormData object with the file(s) appended
 */
export function buildFileFormData(
  key: string,
  files: File | File[] | FileList | FileObject | FileObject[],
): FormData {
  const formData = new FormData();

  // Check if it's a file object (has uri property)
  const isFileObject = (file: unknown): file is FileObject =>
    file !== null &&
    typeof file === "object" &&
    "uri" in file &&
    "name" in file &&
    "type" in file;

  if (typeof File !== "undefined" && files instanceof File) {
    // Single web File case
    formData.append(key, files);
  } else if (typeof FileList !== "undefined" && files instanceof FileList) {
    // FileList case
    Array.from(files).forEach((file) => formData.append(key, file));
  } else if (isFileObject(files)) {
    // Single file object case
    formData.append(key, files as unknown as Blob);
  } else if (Array.isArray(files)) {
    // Array of files case (web or object)
    files.forEach((file) => formData.append(key, file as unknown as Blob));
  }

  return formData;
}

/**
 * Check if a member role has at least the specified minimum role level
 * @param memberRole - The member's current role
 * @param minimumRole - The minimum required role
 * @returns true if memberRole has at least the power of minimumRole
 */
export function isMemberRoleAtLeast(
  memberRole: OrganizationMemberRole,
  minimumRole: OrganizationMemberRole,
): boolean {
  return (
    OrganizationMemberRolePower[memberRole] >=
    OrganizationMemberRolePower[minimumRole]
  );
}
