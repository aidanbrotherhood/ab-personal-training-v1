export function assertServerOnly(moduleName: string) {
  if (!import.meta.env.SSR) {
    throw new Error(`${moduleName} can only be used from server-side code.`);
  }
}

export function getServerEnv(name: string) {
  assertServerOnly("Server environment");

  const astroEnv = (import.meta.env as Record<string, string | undefined>)[name];
  return astroEnv ?? process.env[name];
}
