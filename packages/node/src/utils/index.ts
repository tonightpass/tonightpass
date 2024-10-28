export const isBrowser = typeof window !== "undefined";

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
