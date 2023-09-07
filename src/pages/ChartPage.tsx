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
import { Chart } from 'react-chartjs-2';
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

const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export const data = {
	labels,
	datasets: [
		{
			type: 'line' as const,
			label: '판매 액수',
			borderColor: 'rgb(255, 99, 132)',
			borderWidth: 2,
			fill: false,
			data: [5, 1, 3, 7, 4, 4, 11, 35, 5, 2, 9, 11, 15, 40, 2],
		},
		{
			type: 'bar' as const,
			label: '판매 갯수',
			backgroundColor: 'rgb(75, 192, 192)',
			data: [1, 2, 8, 12, 41, 2, 1, 15, 15, 2, 93, 11, 10, 10, 1],
			borderColor: 'white',
			borderWidth: 2,
		},
	],
};

const ChartPage = () => {
	return (
		<Container>
			<Title>통계</Title>
			<Wrapper>
				<Chart type="bar" data={data} />;
			</Wrapper>
		</Container>
	);
};

export default ChartPage;

const Container = styled.div`
	margin: 0 auto;
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
