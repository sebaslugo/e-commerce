import React from 'react';
import { Pie } from 'react-chartjs-2';

const data = {
	labels: [
		'Remera M',
		'Barbijo N',
		'Llavero'
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

const GraphicsPie = (props) => {
    return (
        <Pie data={data} />
    )
}

export default GraphicsPie;