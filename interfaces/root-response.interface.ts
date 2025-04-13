export interface RootResponse<T> {
  status: "success" | "failure";
  systemTime: number;
  data: T;
  message: string;
}
