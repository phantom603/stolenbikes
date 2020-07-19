import { handleError, logRequest } from '../services/logger.service';
import ApiError from '../classes/ApiError.class';

const Api = async <T>(href: string, initParams, logName?: string): Promise<T> => {
  try {
    const response = await fetch(href, {
      headers: {
        'Content-Type': 'application/json'
      },
      ...initParams
    });
    const data = await response.json();
    if (!response.ok) {
      throw new ApiError(response.url, response.status, data.error)
    }
    logRequest(response, logName);
    return data;

  } catch (e) {
    handleError(e);
    throw e;
  }
}

export default Api;