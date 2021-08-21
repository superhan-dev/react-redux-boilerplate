import React, { useRef, useEffect, useState } from "react";
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  scaleLinear,
  axisRight,
} from "d3";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  svg: {
    overflow: "visible",
  },
}));

function D3LineChartPage() {
  const classes = useStyles();

  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    // x축 scale을 정의한다.
    // 인자로 아무것도 받지 않는것 처럼 보이지만 index를 받아 x축을 그린다.
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    // xScale을 받아 x 축의 데이터로 사용할 범위를 넘긴다.
    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index) => index + 1); // 차트의 숫자를 1부터 보이도록 하게 위해 index + 1로 처리한다.
    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

    // path 안에 들어갈 "d" element를 정의한다.
    const myLine = line()
      .x((value, index) => xScale(index))
      .y((value) => yScale(value))
      .curve(curveCardinal);

    // path를 랜더링하고, 미리정의한 라인을 "d" 속성에 붙인다.
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", (value) => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  return (
    <div className={classes.root}>
      <h1>The Line Chart</h1>
      <svg ref={svgRef} className={classes.svg}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
      <br></br>
      <br></br>
      <Button
        onClick={() => setData(data.map((value) => value + 5))}
        color="primary"
      >
        Update Data
      </Button>

      <Button
        onClick={() => setData(data.filter((value) => value < 35))}
        color="primary"
      >
        Filter Data
      </Button>
    </div>
  );
}

export { D3LineChartPage };
