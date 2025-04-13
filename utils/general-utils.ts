import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Endpoint = string;
type Params = Record<string, string | number | boolean | null>;

export function buildUrl(endpoint: Endpoint, params: Params = {}): string {
  let url = endpoint;

  Object.keys(params).forEach((key) => {
    url = url.replace(`{${key}}`, encodeURIComponent(String(params[key])));
  });

  if (/{\w+}/.test(url)) {
    throw new Error("Not all parameters were replaced in the URL");
  }

  return url;
}
