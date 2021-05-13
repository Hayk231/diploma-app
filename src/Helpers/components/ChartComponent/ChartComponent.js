import React from 'react';
import moment from "moment";
import './ChartComponent.scss';
import { ResponsiveLine } from '@nivo/line';
import { buildChartData } from "../../Utils";
import { MenuItem, Select } from "@material-ui/core";

const ChartComponent = ({data, customColor}) => {

    const colors = customColor ? [customColor] : {scheme: 'nivo'};
    const chartData = buildChartData(data);
    return (
        <div className='goal_expanded_chart_container'>
            <Select
                value={10}
                onChange={(e) => console.log(e)}
                autoWidth
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            {
                chartData[0].data[0] &&
                <ResponsiveLine
                    colors={colors}
                    colorBy={d => d.color}
                    data={chartData}
                    tooltip={(input) => {
                        return (
                            <div className='chart_tooltip'>
                                <div>Date: {input.point.data.xFormatted}</div>
                                <div>Amount: {input.point.data.y}</div>
                                <div>Count: {input.point.data.count}</div>
                            </div>
                        )}}
                    curve='monotoneX'
                    margin={{top: 30, right: 10, bottom: 30, left: 40}}
                    xScale={{
                        type: 'time',
                        format: '%Y-%m-%d',
                        precision: 'day',
                        // tickValues: 'every day',
                        min: moment().subtract(1, 'months').format('YYYY-MM-DD'),
                        max: moment().format('YYYY-MM-DD'),
                    }}
                    yScale={{type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false}}
                    xFormat="time:%Y-%m-%d"
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}l
                    axisBottom={{
                        format: "%b %d",
                        tickValues: "every 3 days",
                    }}
                    pointSize={7}
                    pointColor={{from: 'color', modifiers: []}}
                    pointBorderWidth={2}
                    pointBorderColor={{from: 'serieColor', modifiers: []}}
                    pointLabelYOffset={-12}
                    enableArea={true}
                    useMesh={true}
                    legends={[]}
                    motionConfig="default"
                />
            }
        </div>
    );
};

export default ChartComponent;