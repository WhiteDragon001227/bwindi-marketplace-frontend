/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 21/01/2022 - 23:50:49
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 21/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react'
import { Grid, Paper, Box, Typography, IconButton, Stack } from '@mui/material';
import { ContentCopy } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid';
import CardCustomized from '../../ui-component/CardCustomized';
import Chart from '../../ui-component/Chart';
import bgSvg from '../../assets/img/card_back_1.svg';
import WalletAddress from '../../ui-component/WalletAddress';

const chartData = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const SaleHeader = (props) => {
  return (
    <Box
      mb={4}
    >
      <Typography
        component='h3'
        fontWeight={500}
      >
        {props.title}
      </Typography>
      {props.subtitle}
    </Box>
  )
}

const columns = [
  { field: 'item_name', headerName: 'ITEM NAME', flex: 1, sortable: false },
  { field: 'buyer', headerName: 'BUYER', flex: 1, sortable: false },
  { field: 'date', headerName: 'DATE', flex: 1, sortable: false },
  { field: 'tx_hash', headerName: 'TX HASH', flex: 1, sortable: false },
  { field: 'sold_for', headerName: 'SOLD FOR', flex: 1, sortable: false },
];

const rows = [
  // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  // { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const Datatable = () => {
  return (
    <Box
      sx={{ height: 400, width: '100%' }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sx={{
          border: 0,
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 400
          },
          '& MuiDataGrid-columnHeaders': {
            borderWidth: '0px'
          }
        }}
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%"
              alignItems="center"
              justifyContent="center"
              sx={{
                color: '#4D6194',
                fontWeight: 600,
                fontSize: '25px'
              }}
            >
              No sales during this time
            </Stack>
          ),
          NoResultsOverlay: () => (
            <Stack height="100%"
              alignItems="center"
              justifyContent="center"
              sx={{
                color: '#4D6194',
                fontWeight: 600,
                fontSize: '25px'
              }}
            >
              No results found
            </Stack>
          )
        }}
      />
    </Box>
  );
}

const Earning = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          component='h2'
          p={1}
          fontWeight='bold'
        >
          My Earnings
        </Typography>
        <WalletAddress />
      </Box>
      <CardCustomized>
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-3 md:col-span-2 lg:col-span-3">
            Weekly Average New Sales
            <div className="w-full h-96 pt-5">
              <Chart data={chartData} />
            </div>
          </div>
          <div className="col-span-3 md:col-span-1 h-auto text-center">
            <Paper
              sx={{
                bgcolor: '#D6E1FF',
                borderRadius: '25px',
                p: 3
              }}
            >
              <SaleHeader title='Montly Sales' subtitle='Average Total Sales' />
              <div
                // elevation={0}
                className='m-auto mb-4'
                style={{
                  width: '80%',
                  height: '200px',
                  // m: '0 auto 30px',
                  backgroundColor: '#EEF2FD',
                  borderRadius: '20px',
                  lineHeight: '50px',
                  textAlign: 'center'
                }}
              >
                <div className="font-medium text-3xl mt-3 pt-20">
                  $0
                </div>
                <div className="font-medium text-2xl mt-5">
                  E 0.000
                </div>
              </div>
              <SaleHeader title='Credit Card' subtitle='0%' />
              <SaleHeader title='Ethereum' subtitle='0%' />
            </Paper>
          </div>
        </div>
      </CardCustomized>

      <CardCustomized
        className="mt-8"
        bgimg={bgSvg}
      >
        <div className="font-bold m-2 text-xl">
          Sold Items
        </div>
        <Datatable />
      </CardCustomized>
    </>
  )
}

export default Earning;