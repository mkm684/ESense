import React, {Component} from 'react';
import axios from 'axios';

import { getColor } from 'utils/colors';

import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import {Line} from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

import Page from 'components/Page';

class ChartPage extends Component{

   render() { 
      return ChartPage_ret()
   }
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const getData = async () => {
    try {
      const res = await axios.get('http://d1b4a0f7.ngrok.io/result');
      return res.data
    } catch (err) {
      console.log('Oh hey. Something went wrong...');
    }
}

const genLineData = (moreData = {}, moreData2 = {}) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'Live',
        backgroundColor: getColor('primary'),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: [],
        ...moreData,
      },
      {
        label: 'Normal',
        backgroundColor: getColor('secondary'),
        borderColor: getColor('secondary'),
        borderWidth: 1,
        data: [],
        ...moreData2,
      },
    ],
  };
};

const options = {
  scales: {
    xAxes: [
      {
        type: "realtime",
        realtime: {
          onRefresh: async function(chart) {
            let v = await getData()
            chart.data.datasets[0].data.push({
                x: Date.now(),
                y: v
              });
            chart.data.datasets[1].data.push({
                x: Date.now(),
                y: 37
              });
          },
          delay: 2000
        }
      }
    ]
  }
};


const options2 = {
  scales: {
    xAxes: [
      {
        type: "realtime",
        realtime: {
          onRefresh: function(chart) {
            chart.data.datasets[0].data.push({
                x: Date.now(),
                y: getRandomArbitrary(100, 60)
              });
            chart.data.datasets[1].data.push({
                x: Date.now(),
                y: 88
              });
          },
          delay: 2000
        }
      }
    ]
  }
};
const ChartPage_ret = () => {
  return (
    <Page title="Charts" breadcrumbs={[{ name: 'Charts', active: true }]}>
      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Heartbeat BPM</CardHeader>
            <CardBody>
              <Line
                data={genLineData()}
                options={options2}
              />
            </CardBody>
          </Card>
        </Col>

        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Temprature</CardHeader>
            <CardBody>
              <Line 
                data={genLineData({ fill: false }, { fill: false })} 
                options={options}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default ChartPage;
