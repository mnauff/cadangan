// src/utils/response.ts
interface ApiResponse<T> {
  error: boolean;
  message: string;
  data?: T;
}

export const successResponse = <T>(
  message: string,
  data: T
): ApiResponse<T> => ({
  error: false,
  message,
  data,
});

export const errorResponse = (message: string): ApiResponse<null> => ({
  error: true,
  message,
});
