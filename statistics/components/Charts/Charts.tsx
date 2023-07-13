import React from 'react';

import MyChart from '../MyChart';
import TopProducts from '../TopProducts/TopProducts';
import MyMap from '../Map/MyMap';

import classes from './Charts.module.scss';

const Charts = () => (
  <div className={classes.Charts}>
    <div>
      <MyChart
        options={{
          title: {
            text: 'Main',
            margin: 20,

            style: {
              fontSize: '20px',
            },
          },
          chart: {
            id: 'mainStat',
            background: '#fff',
            toolbar: {
              show: false,
            },
          },
          legend: {
            style: {
              color: 'red',
            },
          },

          xaxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
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
        }}
        series={[
          {
            name: 'Average online',
            data: [50, 55, 70, 65, 70, 75, 80, 75, 70, 79, 85, 80],
          },
          {
            name: 'Profit',
            data: [10, 12, 15, 14, 20, 23, 17, 31, 29, 35, 40, 16],
          },
          {
            name: 'New users',
            data: [20, 23, 21, 22, 19, 23, 17, 28, 24, 15, 20, 16],
          },
        ]}
        type="line"
        width="550"
        height="350"
      />
    </div>

    <div>
      <MyChart
        options={{
          title: {
            text: 'Customer Satisfaction',
            margin: 20,
            style: {
              fontSize: '20px',
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
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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

          labels: ['Chess'],
        }}
        series={[
          {
            name: 'Last month',
            data: [1, 2, 3, 3, 2, 2, 1],
          },
          {
            name: 'This month',
            data: [2, 3, 4, 3, 3, 2, 4],
          },
        ]}
        type="area"
        width="550"
        height="350"
      />
    </div>
    <div>
      <MyChart
        options={{
          title: {
            text: 'Total Revenue',
            margin: 20,
            style: {
              fontSize: '20px',
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
            categories: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
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
            name: 'Online sales',
            data: [10, 12, 10, 15, 14, 11, 16],
          },
          {
            name: 'Offline sales',
            data: [8, 6, 9, 10, 13, 5, 7],
          },
        ]}
        type="bar"
        width="550"
        height="350"
      />
    </div>
    <div>
      <MyChart
        options={{
          colors: ['#4ab58e', '#ffcf00'],
          title: {
            text: 'Target vs Reality',
            margin: 20,
            style: {
              fontSize: '20px',
            },
          },
          chart: {
            id: 'area',
            background: '#fff',
            toolbar: {
              show: false,
            },
          },

          grid: {
            show: false,
          },

          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'],
          },

          yaxis: {
            labels: {
              show: false,
            },
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
              borderRadius: 5,
            },
          },
        }}
        series={[
          {
            name: 'Target sales',
            data: [10, 12, 10, 15, 14, 11, 16],
          },
          {
            name: 'Reality sales',
            data: [8, 6, 9, 10, 13, 5, 7],
          },
        ]}
        type="bar"
        width="550"
        height="350"
      />
    </div>
    <div>
      <MyChart
        options={{
          title: {
            text: 'Volume vs Service Level',
            margin: 20,
            style: {
              fontSize: '20px',
            },
          },

          legend: {
            show: true,
          },

          chart: {
            id: 'area',
            background: '#fff',
            toolbar: {
              show: false,
            },
            stacked: true,
          },

          xaxis: {
            labels: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              show: false,
            },
          },

          grid: {
            show: false,
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
              borderRadius: 5,
            },
          },
        }}
        series={[
          {
            name: 'Volume',
            data: [10, 12, 10, 15, 14, 11, 16],
          },
          {
            name: 'Services',
            data: [8, 6, 9, 10, 13, 5, 7],
          },
        ]}
        type="bar"
        width="550"
        height="350"
      />
    </div>

    <div className={classes.topProducts}>
      <TopProducts />
    </div>

    <div className={classes.Map}>
      <MyMap />
    </div>
  </div>
);

export default Charts;
