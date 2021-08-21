import React, { useRef, useEffect, useState } from "react";
import { select } from "d3";

function D3LineChartPage() {
  const [data, setData] = useState([25, 30, 45, 60, 20]);
  const svgRef = useRef(null);

  useEffect(() => {
    console.log("helo");
    // const svg = select(svgRef.current);
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export { D3LineChartPage };
