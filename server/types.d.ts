declare module NodeJS {
  interface Global {
    currentAccessToken: string;
    orgId: string;
  }
}
