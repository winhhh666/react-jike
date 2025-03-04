import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarChart = ({title}) => {
    const chartRef = useRef(null);
    useEffect(() => {
        //放在useEffect中获取dom是为了确保当前dom可用
        var chartDom = chartRef.current;
        var myChart = echarts.init(chartDom);
        var option;

        option = {
        title: {
            text:title
        },
        xAxis: {
            type: 'category',
            data: ['vue', 'angular', 'react']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: [50, 70, 100],
            type: 'bar'
            }
        ]
        };

        option && myChart.setOption(option);
    }, [title])
    return <div ref={chartRef} style={{width:"500px", height:"400px"}}></div>
   
}

export default BarChart