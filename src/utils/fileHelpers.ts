/**
 * Creates a URL for a selected file
 */
export const createObjectURL = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * Revokes a previously created object URL to avoid memory leaks
 */
export const revokeObjectURL = (url: string) => {
  URL.revokeObjectURL(url);
};

/**
 * Validates that the file is an image with allowed extensions
 */
export const validateImageFile = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  return allowedTypes.includes(file.type);
};

/**
 * Formats a file size in a human-readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return bytes + ' bytes';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
};

/**
 * Converts a data URL to a Blob object
 */
export const dataURLtoBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(',');
  if (arr.length < 2) {
    throw new Error('Invalid data URL');
  }
  
  const mime = arr[0].match(/:(.*?);/)?.[1] || '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
};