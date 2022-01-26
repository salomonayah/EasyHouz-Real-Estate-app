export interface ServerResponse {
  data: any;
  code: number;
  message: string;
  error: Error;
}

export interface TypedServerResponse<T> {
  data: T;
  code: number;
  message: string;
  error: Error;
}

interface Error {
  code: number;
  message: string;
}
