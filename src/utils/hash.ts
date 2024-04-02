import * as crypto from "crypto";

export function hash(str: string): string {
  if (!str) return "invalid";
  const hash = crypto.createHash("md5");
  hash.update(str);

  return hash.digest("hex");
}
