declare module 'react-chartjs-2' {
	import { ChartType, ChartOptions } from 'chart.js';

	interface ChartData<
		TType extends keyof ChartTypeRegistry = keyof ChartTypeRegistry,
		TData = unknown[],
		TLabel = string
	> {
		labels: TLabel[];
		datasets: (ChartDataset<TType, TData> & { type?: undefined })[];
	}

	interface LineProps<
		TType extends keyof ChartTypeRegistry = keyof ChartTypeRegistry,
		TData = unknown[],
		TLabel = string
	> extends Omit<ChartComponentProps<TType>, 'type' | 'data'> {
		data: ChartData<TType, TData, TLabel>;
		options?: ChartOptions;
	}

	export class Line<
		TType extends keyof ChartTypeRegistry = keyof ChartTypeRegistry,
		TData = unknown[],
		TLabel = string
	> extends React.Component<LineProps<TType, TData, TLabel>> {}
}
