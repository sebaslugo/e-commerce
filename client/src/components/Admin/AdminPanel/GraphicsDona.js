import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
	labels: [
		'Mujeres',
		'Varones',
		'Niños'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

const GraphicsDona = (props) => {
    return (
        <Doughnut data={data} />
    )
}

export default GraphicsDona;