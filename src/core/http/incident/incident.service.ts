import ApiCall from '../api.service';

import { AdditionalRequestParamsType, IncidentsResponseType, RequestParamsType } from '../../interfaces/Api.type';
import { IncidentsPageType } from '../../interfaces/Incidents.type';
import { FetchMethodEnum } from '../../enums/FetchMethod.enum';

export const getIncidents = async (queryParams: AdditionalRequestParamsType = {}, signal): Promise<IncidentsPageType> => {
  const url = 'https://bikewise.org:443/api/v2/incidents';
  const endpoint = new URL(url);
  const params: RequestParamsType = {
    per_page: 10,
    incident_type: 'theft',
    proximity_square: 100,
    proximity: 'Berlin',
    ...queryParams
  };
  Object.keys(params).forEach(key => {
    // @ts-ignore
    endpoint.searchParams.append(key, params[key])
  });

  const data = await ApiCall<IncidentsResponseType>(endpoint.href, {
    method: FetchMethodEnum.GET,
    signal
  }, 'getIncidents');
  const incidentsCount = await _getIncidentsCount(url, params, signal);

  const pagesAmount = incidentsCount ? Math.ceil(incidentsCount / params.per_page) : 0;

  return {
    incidents: data.incidents,
    count: incidentsCount,
    page: params.page || 1,
    pages: pagesAmount
  };
};

/*
  function getIncidentsCount it's' helper, which will be removed when API starts returning the overall number of cases in request (see type Incidents structure)
 */
const _getIncidentsCount = async (url: string, params: RequestParamsType, signal): Promise<number> => {
  const endpoint = new URL(url);
  const _params = {...params}
  delete _params.page;
  // delete params.per_page;
  _params.per_page = 10000; // Hardcode, because default value (which hasn't been documented :crying_face: ) is 25

  Object.keys(_params).forEach(key => {
    // @ts-ignore
    endpoint.searchParams.append(key, _params[key])
  });

  const data = await ApiCall<IncidentsResponseType>(endpoint.href, {
    method: FetchMethodEnum.GET,
    signal
  }, 'getIncidentsCount');

  return data.incidents.length;
}

export const postIncident = async (data: any): Promise<void> => { // TODO: rewrite this in future

  // const response = await APIcall<IncidentsResponse>(url, {method: FetchMetod.POST, signal, body: JSON.stringify(data)} );
  alert(JSON.stringify(data))
};