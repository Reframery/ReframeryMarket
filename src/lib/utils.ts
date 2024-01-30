import type { SerializedError } from "@reduxjs/toolkit"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { isAxiosError } from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const handleErrorPayload = (error: unknown) =>
  isAxiosError(error) && error.response && error.response.data.message
    ? error.response.data.message
    : (error as Error).message

export const addTax = (sum: number) => Math.round(sum * 0.1)

export const handleRTKError = (
  error: SerializedError | FetchBaseQueryError
) => {
  return "status" in error
    ? typeof error.status === "number"
      ? (error.data as { error: string }).error
      : error.status === "TIMEOUT_ERROR"
        ? "The server took too long to respond"
        : error.status === "FETCH_ERROR"
          ? "The server is currently unavailable, please try again later"
          : error.error
    : `${error.code}: ${error.message}`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
