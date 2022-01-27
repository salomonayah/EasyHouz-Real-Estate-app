export interface ServerResponse {
  data: any;
  code: number;
  message: string;
  error: ServerError;
}

export interface TypedServerResponse<T> {
  data: T;
  code: number;
  message: string;
  error: ServerError;
}

export interface ServerError {
  code: number;
  error: any;
  message: string;
}

