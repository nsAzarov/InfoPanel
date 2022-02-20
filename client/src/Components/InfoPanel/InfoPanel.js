import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export const InfoPanel = ({ flights, incoming }) => {
  if (!flights) return null;
  return (
    <TableContainer sx={{ maxHeight: 440 }} elevation={15} component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              {incoming ? 'Arrival' : 'Departure'} Time
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Flight
            </TableCell>
            {incoming && (
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Origin
              </TableCell>
            )}
            {!incoming && (
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Destination
              </TableCell>
            )}
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Status
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Terminal
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((row) => (
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
              {incoming && <TableCell align="center">{row.origin}</TableCell>}
              {!incoming && (
                <TableCell align="center">{row.destination}</TableCell>
              )}
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.terminal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
