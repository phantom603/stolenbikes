import React, { useEffect, useState, useRef } from 'react';
import Filter from '../../components/Filter/Filter';
import { Box, LinearProgress, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import CaseCard from '../../components/CaseCard';
import { IncidentsPageType } from '../../core/interfaces/Incidents.type';

import { getIncidents } from '../../core/http/incident/incident.service';
import _isEqual from 'lodash/isEqual';
import { FilterValuesType } from '../../core/interfaces/Filter.type';
import { AdditionalRequestParamsType } from '../../core/interfaces/Api.type';


const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [requestParams, setRequestParams] = useState<AdditionalRequestParamsType>({});
  const prevRequestParams = useRef<AdditionalRequestParamsType>({});

  const [data, setData] = useState<IncidentsPageType | null>(null);
  const isFirstRun = useRef(true);

  useEffect(() => { // didMount
    const abortController = new AbortController();
    fetchIncidents({}, abortController.signal);

    return () => {
      abortController.abort();
    }
  }, []);

  useEffect(() => { // requestParams subscription
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (_isEqual(prevRequestParams.current, requestParams)) {
      return;
    }
    prevRequestParams.current = {...requestParams};

    const abortController = new AbortController();
    fetchIncidents(requestParams, abortController.signal);

    return () => {
      abortController.abort();
    }
  }, [requestParams]);

  const handleFilter = (values: FilterValuesType) => {
    const params: AdditionalRequestParamsType = {};

    if (values.datetimeTo) {
      params.occurred_before = values.datetimeTo.getTime() / 1000;
    }
    if (values.datetimeFrom) {
      params.occurred_after = values.datetimeFrom.getTime() / 1000;
    }
    if (values.search.length) {
      params.query = values.search;
    }
    setRequestParams(params)
  }

  const fetchIncidents = async (params: AdditionalRequestParamsType = {page: 1}, signal): Promise<void> => {
    setLoading(true)
    try {
      await getIncidents(params, signal).then(response => {
        setData(response);
      });
    } catch (e) {
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Stolen bikes - Dashboard</h1>
      <Filter onSubmitCb={handleFilter}/>

      {loading ? <LinearProgress/> : <>
        {!data?.count ?
          <Typography variant="body1" style={{fontWeight: 700}}>No results for your search</Typography> : null}
        {!data ?
          <Typography variant="body1" color="error" style={{fontWeight: 700}}>Ooops, something went wrong. Please, try
            again later or contact our support team</Typography> : null}

        {data?.incidents.length ? <>
          <Box display="flex" justifyContent="flex-end" style={{marginBottom: '20px'}}>
            <Typography variant="body1">total: {data.count}</Typography>
          </Box>

          <div>
            {data.incidents.map(incident => <CaseCard
              key={incident.id}
              title={incident.title}
              desc={incident.description}
              address={incident.address}
              url={incident.source.html_url}
              imageThumbUrl={incident.media.image_url_thumb}
              occurredAt={incident.occurred_at}
              updatedAt={incident.updated_at}
            />)}

            {data.pages > 1 ? <Box display="flex" justifyContent="center" style={{margin: '40px 0'}}>
              <Pagination
                count={data.pages}
                page={data.page}
                onChange={(e, value) => setRequestParams({...requestParams, page: value})}
                showFirstButton
                showLastButton
              />
            </Box> : null}
          </div>
        </> : null}
      </>}
    </div>
  )
}

export default Dashboard;