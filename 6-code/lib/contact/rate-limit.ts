import { RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS } from "@/lib/contact/config";

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const hitsByIp = new Map<string, RateLimitEntry>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hitsByIp.get(ip);

  if (!entry || now - entry.windowStart >= RATE_LIMIT_WINDOW_MS) {
    hitsByIp.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}

export function resetRateLimitStore(): void {
  hitsByIp.clear();
}
