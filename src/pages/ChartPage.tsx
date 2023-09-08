import React from 'react';
import {
	Chart as ChartJS,
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
	LineController,
	BarController,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
	LineController,
	BarController
);

const labels = [
	'9/8',
	'9/9',
	'9/10',
	'9/11',
	'9/12',
	'9/13',
	'9/14',
	'9/15',
	'9/16',
	'9/17',
	'9/18',
	'9/19',
	'9/20',
	'9/21',
	'9/22',
];

function numberWithCommas(x: number) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const data = {
	labels,
	datasets: [
		{
			type: 'line' as const,
			label: '판매 액수',
			borderColor: 'rgb(255, 99, 132)',
			borderWidth: 2,
			fill: false,
			data: [10, 15, 80, 100, 280, 180, 170, 170, 80, 90, 120, 104, 90, 90, 8],
		},
		{
			type: 'bar' as const,
			label: '판매 갯수',
			backgroundColor: 'rgb(75, 192, 192)',
			data: [1, 2, 8, 12, 41, 22, 23, 20, 8, 9, 14, 11, 10, 10, 1],
			borderColor: 'white',
			borderWidth: 2,
		},
	],
};

const ChartPage = () => {
	return (
		<Container>
			<Title>통계자료</Title>
			<Wrapper>
				<Line type="bar" data={data} />;
			</Wrapper>
			한달간 총 판매량 : {1 + 2 + 8 + 12 + 41 + 22 + 23 + 20 + 8 + 9 + 14 + 11 + 10 + 10 + 1}개{' '}
			<br />
			<br />
			한달간 총 판매액 :{' '}
			{numberWithCommas(
				(10 + 15 + 80 + 100 + 280 + 180 + 170 + 170 + 80 + 90 + 120 + 104 + 90 + 90 + 8) * 1000
			)}{' '}
			원
		</Container>
	);
};

export default ChartPage;

const Container = styled.div`
	margin: 0 auto;
	margin-top: 5rem;
`;

const Wrapper = styled.div`
	width: 60vw;
	height: 60vh;
	margin: 0 auto;
	text-align: center;
`;

const Title = styled.div`
	font-size: 3rem;
`;
