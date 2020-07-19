/* eslint no-console: ["error", { allow: ["error", "log", "group", "groupEnd"] }] */
import ApiError from '../classes/ApiError.class';

export const handleError = (error: Error) => {
  console.group('Error log:');

  if (error instanceof ApiError) {
    console.error(`Url: ${error.url}`);
    console.error(`Status: ${error.statusCode}`);
    console.error(`Message: ${error.message}`);
  } else {
    console.error(error)
  }
  console.groupEnd();
}

export const logRequest = (response: any, logName: string = 'Request'): void => {
  console.group(logName + ' log:');
  console.log(`Url: ${response.url}`);
  console.log(`Status: ${response.status}`);
  console.log(`Redirected: ${response.redirected}`);
  console.log('Full data', response);
  console.groupEnd();
}