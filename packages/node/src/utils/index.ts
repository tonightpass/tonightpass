import { OrganizationMemberRolePower } from "../constants";
import { OrganizationMemberRole } from "../rest/types/organizations/members";

export const isBrowser = typeof window !== "undefined";

/**
 * Build a FormData object from a file or multiple files
 * @param key - The form field name for the file(s)
 * @param files - A single File, an array of Files, or a FileList
 * @returns FormData object with the file(s) appended
 */
export function buildFileFormData(
  key: string,
  files: File | File[] | FileList,
): FormData {
  const formData = new FormData();

  if (files instanceof File) {
    // Single file case
    formData.append(key, files);
  } else if (files instanceof FileList) {
    // FileList case
    Array.from(files).forEach((file) => formData.append(key, file));
  } else {
    // Array of files case
    files.forEach((file) => formData.append(key, file));
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
