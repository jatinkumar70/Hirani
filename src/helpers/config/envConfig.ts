export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_BACKEND_API as string;
};
