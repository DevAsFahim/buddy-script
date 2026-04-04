export interface ErrorSource {
  path: string | number;
  message: string;
}

export interface IBackendError {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorSources: ErrorSource[];
    // Use 'unknown' or a generic object for 'err' since it's unpredictable
    err?: any;
    stack?: string;
  };
}
