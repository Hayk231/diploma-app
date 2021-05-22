import React, {useEffect, useState} from 'react';
import moment from "moment";
import './ChartComponent.scss';
import { ResponsiveLine } from '@nivo/line';
import { buildChartData } from "../../Utils";
import { MenuItem, Select } from "@material-ui/core";
import { DateRange } from 'react-date-range';
import RangePicker from "../RangePicker/RangePicker";

const showValues = [
    {value: 'amount', label: 'Amount'},
    {value: 'count', label: 'Count'},
    {value: 'totalAmount', label: 'Total Amount'},
]

const ChartComponent = ({data, customColor, submitRange}) => {

    const [showBy, setShowBy] = useState('amount');
    const [range, setRange] = useState({
        from: new Date((new Date()).setMonth((new Date()).getMonth()-1)),
        to: new Date(),
    });

    useEffect(() => {
        submitRange(range)
    }, [range])

    const colors = customColor ? [customColor] : {scheme: 'nivo'};
    const chartData = buildChartData(data, showBy, showValues.find(el => el.value === showBy).label);
    return (
        <div className='chart_container'>
            <div className='chart_actions'>
                <Select value={showBy}
                    onChange={(e) => setShowBy(e.target.value)}>
                    {
                        showValues.map(el => (
                            <MenuItem value={el.value} key={el.value}>{el.label}</MenuItem>
                        ))
                    }
                </Select>
                <RangePicker setRange={setRange} range={range}/>
            </div>
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
                                <div>{`${input.point.data.label}: ${input.point.data.y.toFixed(2)}`}</div>
                            </div>
                        )}}
                    curve='monotoneX'
                    margin={{top: 30, right: 10, bottom: 30, left: 40}}
                    xScale={{
                        type: 'time',
                        format: '%Y-%m-%d',
                        precision: 'day',
                        // tickValues: 'every day',
                        min: moment(range.from).format('YYYY-MM-DD'),
                        max: moment(range.to).format('YYYY-MM-DD'),
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