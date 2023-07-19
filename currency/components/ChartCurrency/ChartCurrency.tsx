import React from 'react';

import MyChart from '../../../statistics/components/MyChart';
import { IUser } from '../../types';

import { Chart } from './ChartCurrencyStyle';

export const ChartCurrency: React.FC<{ tenUsers: IUser[] }> = ({ tenUsers }) => {
  const usersNames = tenUsers.map((el) => el.name);
  const usersAmount = tenUsers.map((el) => el.amount);

  return (
    <Chart>
      <MyChart
        options={{
          title: {
            text: 'Users currency chart',
            margin: 25,
            style: {
              fontSize: '18px',
              color: 'black',
            },
          },
          chart: {
            id: 'area',
            background: '#fff',
            toolbar: {
              show: false,
            },
          },

          xaxis: {
            categories: usersNames,
          },

          dataLabels: {
            enabled: false,
          },

          responsive: [
            {
              breakpoint: 1500,
              options: {
                chart: {
                  width: 500,
                },
                legend: {
                  show: false,
                },
              },
            },
          ],
          plotOptions: {
            bar: {
              borderRadius: 2,
            },
          },
        }}
        series={[
          {
            name: 'Amount',
            data: usersAmount,
          },
        ]}
        type="bar"
        width="600"
        height="304"
      />
    </Chart>
  );
};
