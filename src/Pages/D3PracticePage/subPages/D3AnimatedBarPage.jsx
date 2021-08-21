import { Button, makeStyles } from "@material-ui/core";
import { scaleLinear, select, axisBottom, axisLeft, scaleBand } from "d3";
import React, { useRef, useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
  },
  svg: {
    overflow: "visible",
  },
}));

function D3AnimatedBarPage() {
  const classes = useStyles();

  const svgRef = useRef(null);

  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);

  useEffect(() => {
    const svg = select(svgRef.current);

    // scaleBand를 이용하면 domain 배열의 요소만큼 range 안에 동등하게 나눈다.
    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    // domain에서 첫번째 인덱스에 가까운 값은 green에 가깝게, 두번째 인덱스에 가까운 값은 red에 가깝게 색깔을 준다.
    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(["green", "orange", "red"])
      .clamp(true);

    const xAxis = axisBottom(xScale).ticks(data.length);
    // x축을 차트 아래로 내리기 위해 150px 만큼 translate을 준다.
    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);

    // bar라는 클래스를 가진 사각형을 정의한다.
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1,-1)") // 바의 상하를 전환하기 위해 transform을 사용하여 상하 반전을 준다.
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150) // 상하 반전이된 차트를 -150만큼 아래로 내린다.
      .attr("width", xScale.bandwidth()) // scaleBand의 너비만큼의 바를 만든다. padding을 주어 굵기를 조절할 수 있다.
      .transition()
      .attr("fill", colorScale)
      .attr("height", (value) => 150 - yScale(value));
  }, [data]);

  return (
    <div className={classes.root}>
      <h1>The Animated Bar</h1>
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

export { D3AnimatedBarPage };
