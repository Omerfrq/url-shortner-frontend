import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AxiosErrorValidate = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    const errorData = err.response?.data;

    if (typeof errorData === 'string') {
      return { message: errorData }; // Wrap string errors in an object
    }

    if (typeof errorData === 'object' && errorData !== null) {
      return errorData; // Assume it's already an object with message
    }

    return { message: 'An unknown error occurred' };
  }

  return { message: String(err) };
};

export function isValidUrl(urlString: string): boolean {
  // First check if the URL has a valid TLD (contains at least one dot followed by characters)
  // Remove any protocol first to simplify checking
  const urlWithoutProtocol = urlString.replace(/^(https?:\/\/)/, '');

  // Check if there's at least one dot with characters after it (basic TLD check)
  if (!urlWithoutProtocol.includes('.') || urlWithoutProtocol.endsWith('.')) {
    return false;
  }

  // If the URL already has a protocol, use the URL constructor to validate
  if (urlString.startsWith('http://') || urlString.startsWith('https://')) {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  }

  // If no protocol, try adding https:// and validate
  try {
    new URL(`https://${urlString}`);
    return true;
  } catch (e) {
    return false;
  }
}

export function formatUrl(url: string): string {
  // If the URL already has a protocol, return it as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Otherwise, add https:// protocol
  return `https://${url}`;
}
