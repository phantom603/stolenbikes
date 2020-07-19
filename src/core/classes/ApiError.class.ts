export default class ApiError extends Error {
  public readonly url:string;
  public readonly statusCode:number;
  constructor(url: string, statusCode: number, message: string) {
    super(message);
    this.url = url;
    this.statusCode = statusCode;
  }
}