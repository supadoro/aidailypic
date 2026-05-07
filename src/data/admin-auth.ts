export const ADMIN_SESSION_COOKIE = "aidailypick_admin_session";

type AdminRuntimeEnv = {
  ADMIN_USER?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
};

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function getCloudflareEnv(): Promise<AdminRuntimeEnv> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = await getCloudflareContext({ async: true });
    return env as AdminRuntimeEnv;
  } catch {
    return {};
  }
}

export function getAdminConfig() {
  const password = (process.env.ADMIN_PASSWORD || "").trim();
  return {
    user: (process.env.ADMIN_USER || "admin").trim(),
    password,
    secret: (process.env.ADMIN_SESSION_SECRET || password).trim(),
  };
}

export async function getAdminConfigAsync() {
  const env = await getCloudflareEnv();
  const password = (env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "").trim();
  return {
    user: (env.ADMIN_USER || process.env.ADMIN_USER || "admin").trim(),
    password,
    secret: (env.ADMIN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || password).trim(),
  };
}

export async function getAdminSessionToken(config?: Awaited<ReturnType<typeof getAdminConfigAsync>>): Promise<string> {
  config = config ?? (await getAdminConfigAsync());
  if (!config.password || !config.secret) return "";
  return sha256(`${config.user}:${config.password}:${config.secret}`);
}

export async function isValidAdminSession(token?: string): Promise<boolean> {
  if (!token) return false;
  const expected = await getAdminSessionToken();
  return Boolean(expected) && token === expected;
}
