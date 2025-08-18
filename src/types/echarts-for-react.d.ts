declare module 'echarts-for-react' {
  import { Component } from 'react';
  import { EChartsOption } from 'echarts';

  export interface ReactEchartsProps {
    option: EChartsOption;
    style?: React.CSSProperties;
    className?: string;
    theme?: string | object;
    notMerge?: boolean;
    lazyUpdate?: boolean;
    onChartReady?: (echartsInstance: any) => void;
    onEvents?: Record<string, (params: any, echartsInstance: any) => void>;
    opts?: {
      devicePixelRatio?: number;
      renderer?: string;
      width?: number | string;
      height?: number | string;
    };
  }

  export default class ReactEcharts extends Component<ReactEchartsProps> {
    render(): React.ReactElement;
  }
}