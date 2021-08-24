import { Button, Dialog, makeStyles } from "@material-ui/core";
import { scaleLinear, select, axisBottom, axisLeft, scaleBand } from "d3";
import React, { useRef, useState, useEffect } from "react";
import { DrawPointDialog } from "./DrawPointDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
  },
  svg: {
    overflow: "visible",
    position: "absolute",
    zIndex: "1",
  },

  video: {
    position: "absolute",
  },
}));

/**
 * 구현 목적: video위에 svg를 올려 도형을 그리는 것을 목표한다.
 * 시도 1. video를 svg안에 넣었으나,
 *   svg 엘리먼트가 가장 아래 레이어에 생성되어 도형들을 가려버리는 현상이 발생.
 * 시도 2. video와 svg를 각각 분리한 뒤 position을 absolute로 주어 z-index를 이용하여,
 *   svg를 가장 앞 레이어로 보이도록 구현.
 */
function D3AnimatedBarPage() {
  const classes = useStyles();

  const svgRef = useRef(null);

  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const [open, setOpen] = useState(false);

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

    // video에 autoplay속성을 주었으나, 자동 재생되지 않아 quertSelector를 이용하여 play.
    // const video = document.querySelector("video");
    // video.play();
  }, [data]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <h1>The Animated Bar</h1>

      <svg ref={svgRef} className={classes.svg}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
        {/* video를 안에 넣을 수 있지만 레이어가 가장 앞으로 나와버려 도형들을 덮어버린다. */}
        {/* <foreignObject x="0" y="0" width="300" height="150">
          <video width="300" height="150" controls>
            <source src="/video/SampleVideo.mp4" type="video/mp4" />
          </video>
        </foreignObject> */}
      </svg>

      {/* <video width="300" height="150" autoPlay muted> */}
      <video width="300" height="150">
        <source src="/video/SampleVideo.mp4" type="video/mp4" />
      </video>

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

      <Button onClick={handleClickOpen} color="primary">
        Add Point
      </Button>
      <DrawPointDialog open={open} onClose={handleClose} />
    </div>
  );
}

export { D3AnimatedBarPage };
