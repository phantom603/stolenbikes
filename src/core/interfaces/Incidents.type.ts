export type IncidentType = {
  id: number;
  title: string;
  description: string;
  address: string;
  occurred_at: number;
  updated_at: number;
  url: string;
  source: {
    name?: string;
    html_url: string;
    api_url: string;
  };
  media: {
    image_url: string;
    image_url_thumb: string;
  };
  location_type: any;
  location_description: any;
  type: string;
  type_properties: any;
}

export type IncidentsPageType = {
  incidents: IncidentType[];
  count: number;
  page: number;
  pages: number;
}

export type NewIncidentType = {
  title: string | null;
  description: string | null;
  theftDate: Date | null;
  reportedDate: Date | null;
  location: string | null;
  files: Array<Object>
}
