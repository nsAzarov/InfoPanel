import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ApiService } from '../../Services';

export const InfoPanel = () => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const api = new ApiService();
    api.getData().then((data) => setData(data));

    const interval = setInterval(
      () => api.getData().then((data) => setData(data)),
      5000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!data) return null;
  return (
    <TableContainer elevation={15} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Time</TableCell>
            <TableCell align="center">Flight</TableCell>
            <TableCell align="center">Origin</TableCell>
            <TableCell align="center">Destination</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Terminal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.time}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                {new Date(row.time).toLocaleDateString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </TableCell>
              <TableCell align="center">{row.flight}</TableCell>
              <TableCell align="center">{row.origin}</TableCell>
              <TableCell align="center">{row.destination}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.terminal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
