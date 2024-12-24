import { ClassValue, clsx } from 'clsx';
import setCookieParser from 'set-cookie-parser';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseCookies(cookies: string) {
  return setCookieParser.parse(cookies, { map: true });
}
