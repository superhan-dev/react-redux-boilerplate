import React, { useRef, useEffect, useState } from "react";

import { select } from "d3";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
  },
  svg: {
    overflow: "visible",
  },
}));

function D3CirclePage() {
  const classes = useStyles();
  const [data, setData] = useState([25, 30, 45, 60, 20]);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      // join안에는 다음과 같은 내부 함수가 있는데, 이를 줄여서 "circle"로 인자를 넘기면 내부적으로 아래 코드를 실행한다.
      // .join(
      //   (enter) => enter.append("circle").attr("class", "new"),
      //   (update) => update.attr("class", "updated"),
      //   (exit) => exit.remove()
      // )
      .join("circle")
      .attr("r", (value) => value)
      .attr("cx", (value) => value * 2)
      .attr("cy", (value) => value * 2)
      .attr("stroke", "red");
  }, [data]);

  return (
    <div className={classes.root}>
      <h1>The Circles </h1>
      <svg ref={svgRef}></svg>
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

export { D3CirclePage };
