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
  files: File | File[] | FileList | FileObject | FileObject[]
): FormData {
  const formData = new FormData();

  const isFileObject = (file: unknown): file is FileObject =>
    file !== null &&
    typeof file === "object" &&
    "uri" in file &&
    "name" in file &&
    "type" in file;

  if (typeof File !== "undefined" && files instanceof File) {
    formData.append(key, files);
  } else if (typeof FileList !== "undefined" && files instanceof FileList) {
    for (const file of Array.from(files)) {
      formData.append(key, file);
    }
  } else if (isFileObject(files)) {
    formData.append(key, files as unknown as Blob);
  } else if (Array.isArray(files)) {
    for (const file of files) {
      formData.append(key, file as unknown as Blob);
    }
  }

  return formData;
}
