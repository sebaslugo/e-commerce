import React from 'react';
import { Radar } from 'react-chartjs-2';

const data = {
    labels: ['Ropa', 'Accesorios', 'Deportes', 'Computación', 'Moda', 'Música', 'Libros'],
    datasets: [
      {
        label: 'Búsqueda de Mujeres',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: [65, 59, 90, 81, 56, 55, 40]
      },
      {
        label: 'Búsqueda de Varones',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: [28, 48, 40, 19, 96, 27, 100]
      }
    ]
  };

const GraphicsRadar = (props) => {
    return (
        <Radar data={data} />
    )
}

export default GraphicsRadar;
