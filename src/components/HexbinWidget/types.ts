import { IHexbinChartMatrixParam, IHexbinChartProps } from "@/components/Chart/HexbinChart";

export interface IHexbinWidgetData<TData> extends Pick<IHexbinChartMatrixParam<TData>, 'value' | 'data'> {}

export interface IHexbinWidgetProps<TData> {
    data: IHexbinWidgetData<TData>[];
    onClick?: (data: TData) => void;
    renderTooltip?: IHexbinChartProps<TData>['renderTooltip']
    scaleMin?: number;
    scaleMax?: number;
}