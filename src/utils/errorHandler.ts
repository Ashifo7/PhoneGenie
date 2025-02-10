// Safely format error messages for logging
export const formatError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

// Safely log errors without Symbol cloning issues
export const logError = (context: string, error: unknown): void => {
  const errorMessage = formatError(error);
  console.error(`[${context}] ${errorMessage}`);
};