import { BaseQueryApi } from "@reduxjs/toolkit/query";

export interface TErrorResponse {
  status: number;
  data: {
    success: boolean;
    message: string;
    stack: null | string;
  };
}
export interface TSuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?:TMeta
}
export interface TMeta {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalData: number;
};

export interface TResponse<T> {
  data?: T;
  error?: TErrorResponse;
  meta?:TMeta
  success: boolean;
  message: string;
}
export type TReduxResponse<T> = TResponse<T> & BaseQueryApi;

export type QueryParam = { name: string; value: string };