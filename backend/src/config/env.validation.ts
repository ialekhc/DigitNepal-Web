type EnvRecord = Record<string, unknown>;

function readString(config: EnvRecord, key: string): string | undefined {
  const value = config[key];
  if (typeof value === 'string') {
    return value.trim();
  }
  return undefined;
}

function requireString(config: EnvRecord, key: string): string {
  const value = readString(config, key);
  if (!value) {
    throw new Error(`Environment variable "${key}" is required.`);
  }
  return value;
}

function readNumber(config: EnvRecord, key: string, fallback: number): number {
  const raw = readString(config, key);
  if (!raw) {
    return fallback;
  }
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Environment variable "${key}" must be a positive number.`);
  }
  return parsed;
}

function isPostgresUrl(url: string): boolean {
  return url.startsWith('postgresql://') || url.startsWith('postgres://');
}

export function validateEnv(config: EnvRecord): EnvRecord {
  const nodeEnv = readString(config, 'NODE_ENV') || 'development';
  const databaseUrl = requireString(config, 'DATABASE_URL');
  if (!isPostgresUrl(databaseUrl)) {
    throw new Error('Environment variable "DATABASE_URL" must be a valid PostgreSQL connection string.');
  }

  const jwtSecret = requireString(config, 'JWT_SECRET');
  const jwtExpiresIn = readString(config, 'JWT_EXPIRES_IN') || '1d';
  const corsOrigin = readString(config, 'CORS_ORIGIN') || 'http://localhost:3000';
  const apiPort = readNumber(config, 'API_PORT', 5000);
  const port = readString(config, 'PORT');

  return {
    ...config,
    NODE_ENV: nodeEnv,
    DATABASE_URL: databaseUrl,
    JWT_SECRET: jwtSecret,
    JWT_EXPIRES_IN: jwtExpiresIn,
    CORS_ORIGIN: corsOrigin,
    API_PORT: String(apiPort),
    ...(port ? { PORT: port } : {}),
  };
}
