import React from 'react';
import {ResponsiveLine} from '@nivo/line';
import {chartData} from "../../Constants";

const ChartComponent = () => {
    return (
        <div className='goal_expanded_chart_container'>
            <ResponsiveLine
                colorBy={d => d.color}
                data={chartData}
                curve='monotoneX'
                margin={{top: 30, right: 10, bottom: 30, left: 40}}
                xScale={{
                    type: 'time',
                    format: '%Y-%m-%d',
                    precision: 'day',
                    min: "auto",
                    max: "auto",
                }}
                yScale={{type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false}}
                xFormat="time:%Y-%m-%d"
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    format: "%b %d",
                    tickValues: "every 7 days",
                }}
                colors={{scheme: 'nivo'}}
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
        </div>
    );
};

export default ChartComponent;