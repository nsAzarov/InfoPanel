import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ApiService } from '../../Services';
import { InfoPanel } from '../InfoPanel';

const filterFlights = (data) => {
  const incoming = [];
  const outcoming = [];
  if (data) {
    data.forEach((flight) => {
      if (flight.incoming) incoming.push(flight);
      else if (flight.outcoming) outcoming.push(flight);
    });
  }
  return {
    incoming,
    outcoming
  };
};

export const Main = () => {
  const [incomingFlights, setIncomingFlights] = useState(undefined);
  const [outcomingFlights, setOutcomingFlights] = useState(undefined);

  const api = useMemo(() => new ApiService(), []);

  const fetchData = useCallback(() => {
    console.log('fetch data');
    api.getData().then((data) => {
      const filteredFlights = filterFlights(data);
      if (filteredFlights.incoming.length > 0) {
        setIncomingFlights(filteredFlights.incoming);
      }
      if (filteredFlights.outcoming.length > 0) {
        setOutcomingFlights(filteredFlights.outcoming);
      }
    });
  }, [api]);

  const generateFlight = useCallback(() => {
    api.generateFlight();
    fetchData();
  }, [api, fetchData]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(), 2000);
    return () => {
      clearInterval(interval);
    };
  }, [fetchData]);

  return (
    <Box sx={{ maxWidth: '70%', margin: '100px auto' }}>
      {!incomingFlights && !outcomingFlights ? (
        <Box sx={{ marginTop: '100px' }}>
          <Typography variant="h4" align="center" paddingBottom={'20px'}>
            No Flights At This Time
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ marginTop: '100px' }}>
            {!!incomingFlights && (
              <Typography variant="h4" align="center" paddingBottom={'20px'}>
                Arrivals
              </Typography>
            )}
            <InfoPanel flights={incomingFlights} incoming />
          </Box>
          <Box sx={{ marginTop: '100px' }}>
            {!!outcomingFlights && (
              <Typography variant="h4" align="center" paddingBottom={'20px'}>
                Departures
              </Typography>
            )}
            <InfoPanel flights={outcomingFlights} />
          </Box>
        </>
      )}
      <Box mt="80px" display="flex" justifyContent="space-evenly">
        <Button
          mr="16px"
          variant="outlined"
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
        <Button variant="outlined" onClick={generateFlight}>
          Generate Flight
        </Button>
      </Box>
    </Box>
  );
};
