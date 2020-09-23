import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const GraphicsDonaDyn = (props) => {

    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const [data, setData] = useState({
        labels: [
          'Red',
          'Green',
          'Yellow'
        ],
        datasets: [{
          data: [5, 7, 20],
          backgroundColor: [
          '#CCC',
          '#36A2EB',
          '#FFCE56'
          ],
          hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
          ]
        }]
      }
    );
    
    const getState = () => ({
        labels: [
          'Remeras',
          'Tazas',
          'Barbijos'
        ],
        datasets: [{
          data: [getRandomInt(50, 200), getRandomInt(100, 150), getRandomInt(150, 250)],
          backgroundColor: [
          '#CCC',
          '#36A2EB',
          '#FFCE56'
          ],
          hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
          ]
        }]
    });

    setInterval(() => {
        setData(getState());
    }, 5000);

    return (
        <Doughnut data={data} />
    )
}

export default GraphicsDonaDyn;