import { IncidentType } from './Incidents.type';
import { FetchMethodEnum } from '../enums/FetchMethod.enum'

export type IncidentsResponseType = {
  incidents: IncidentType[];
}

export type BaseRequestParamsType = {
  per_page: number;
  incident_type: string;
  proximity_square: number;
  proximity: string;
}

export type AdditionalRequestParamsType = {
  page?: number;
  query?: string;
  occurred_before?: number;
  occurred_after?: number;
}

export type FetchParamsType = {
  method: FetchMethodEnum,
  signal: any
}
export type RequestParamsType = BaseRequestParamsType & AdditionalRequestParamsType;