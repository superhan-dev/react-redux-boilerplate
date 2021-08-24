import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
// import { select, path, drag } from "d3";
import * as d3 from "d3";
import { event as currentEvent } from "d3-selection";

const useDrawPointDialogStyles = makeStyles((theme) => ({
  drawPointDialog__root: {
    margin: "1rem",
  },
  drawPointDialog__content: {
    position: "relative",
  },
  drawPointDialog__svg: {
    overflow: "visible",
    position: "absolute",
    zIndex: "1",
  },
  drawPointDialog__video: {
    position: "absolute",
  },
}));

function DrawPointDialog({ open, onClose }) {
  const classes = useDrawPointDialogStyles();
  const svgRef = useRef(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    drawCircle();
    drawPath();
  }, [data]);

  // 처음 팝업이 뜨면 ref가 null로 잡히기 때문에 라이프 사이클이 한번 순회한 후에
  // 사용자로부터 버튼을 클릭하게하여 SVG를 초기화 하도록 한다.
  function initRef() {
    const svg = d3.select(svgRef.current);
    svg.on("click", function (d) {
      setData((dt) => [...dt, { x: d.offsetX, y: d.offsetY }]);
    });
  }

  function handleClose() {
    clearSvg();
    onClose();
  }

  function clearSvg() {
    // svg의 전체 요소를 선택해서 지운다.
    const svg = d3.select(svgRef.current);
    svg.selectAll("circle").remove();
    svg.selectAll("path").remove();
    // svg.selectAll("polygon").remove();
    // 요소를 그릴때 사용되는 Data도 비워준다.
    setData([]);
  }

  function drawCircle() {
    const svg = d3.select(svgRef.current);

    svg
      .select("g")
      .selectAll("circle")
      .data(data)
      // .enter()
      .join("circle")
      // .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 10)
      .on("mouseover", function () {
        d3.select(this).raise(); // 마우스 오버시 서클을 path보다 높은 z-index로 나타낸다.
      })
      .call(
        d3.drag().on("drag", function (event) {
          dragCircle(event, this);
        })
      );
  }

  //TODO: drag를 해서 도형의 크기를 키워야 한다.
  function dragCircle(event, self) {
    console.log(event, self);
    // let e = currentEvent;
    // d.x += e.dx;
    // d.y += e.dy;

    // clearSvg(); // 현재 그려진 도형을 모두 지운다.
    // drawPath(); // path를 다시 그린다.
    // drawCircle();
  }

  function drawPath() {
    const svg = d3.select(svgRef.current);
    // path를 그린 후에 붙여줘야 한다.
    // path를 그려주면 M25,25L75,25L75,75Z이와 같은 형식으로 문자열이 만들어진다.
    // path에는 moveTo, lineTo, closePath가 존재한다.
    // moveTo는 M을 붙여 첫번째 꼭지점을 만들어주고,
    // lineTo는 L을 붙여 이후 선이 그려진 꼭지점을 생성해 주며,
    // 마지막으로 closePath 함수는 Z를 끝에 붙여주는 원리이다.
    const p = d3.path();
    data.reduce((acc, cur, i, arr) => {
      if (i === 0) p.moveTo(cur.x, cur.y);
      else p.lineTo(cur.x, cur.y);

      if (i === arr.length - 1) p.closePath();
    }, []);

    svg.append("path").attr("d", p).attr("stroke", "black").attr("fill", "red");
  }

  function drawPolygon() {
    const svg = d3.select(svgRef.current);
    // polygon을 그릴 때는 "10,10 20,20 30,30" 과 같은 형태로 그려진다.
    // 따라서 reduce로 배열을 순회하며
    // 요구되는 형식으로 변경해 주어야 한다.
    const points = data.reduce((acc, cur, i, arr) => {
      return [...acc, `${cur.x},${cur.y}`];
    }, []);

    svg
      .append("polygon")
      .attr("points", points.join(", "))
      .attr("stroke", "#f00")
      .attr("fill", "none");
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth={"md"}
    >
      <DialogTitle id="form-dialog-title">
        DrawDialog
        <Button onClick={initRef}>Start Draw</Button>
        <Button onClick={clearSvg}>Init Draw</Button>
      </DialogTitle>
      <DialogContent className={classes.drawPointDialog__content}>
        <svg
          ref={svgRef}
          className={classes.drawPointDialog__svg}
          width="800"
          height="500"
        >
          <g></g>
        </svg>

        <video width="800" height="500" autoPlay loop muted>
          <source src="/video/SampleVideo.mp4" type="video/mp4" />
        </video>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { DrawPointDialog };

const data1 = [
  { name: "chevrolet chevelle malibu", x: 18, y: 130 },
  { name: "buick skylark 320", x: 15, y: 165 },
  { name: "plymouth satellite", x: 18, y: 150 },
  { name: "amc rebel sst", x: 16, y: 150 },
  { name: "ford torino", x: 17, y: 140 },
  { name: "ford galaxie 500", x: 15, y: 198 },
  { name: "chevrolet impala", x: 14, y: 220 },
  { name: "plymouth fury iii", x: 14, y: 215 },
  { name: "pontiac catalina", x: 14, y: 225 },
  { name: "amc ambassador dpl", x: 15, y: 190 },
  { name: "citroen ds-21 pallas", x: 0, y: 115 },
  { name: "chevrolet chevelle concours (sw)", x: 0, y: 165 },
  { name: "ford torino (sw)", x: 0, y: 153 },
  { name: "plymouth satellite (sw)", x: 0, y: 175 },
  { name: "amc rebel sst (sw)", x: 0, y: 175 },
  { name: "dodge challenger se", x: 15, y: 170 },
  { name: "plymouth 'cuda 340", x: 14, y: 160 },
  { name: "ford mustang boss 302", x: 0, y: 140 },
  { name: "chevrolet monte carlo", x: 15, y: 150 },
  { name: "buick estate wagon (sw)", x: 14, y: 225 },
  { name: "toyota corona mark ii", x: 24, y: 95 },
  { name: "plymouth duster", x: 22, y: 95 },
  { name: "amc hornet", x: 18, y: 97 },
  { name: "ford maverick", x: 21, y: 85 },
  { name: "datsun pl510", x: 27, y: 88 },
  { name: "volkswagen 1131 deluxe sedan", x: 26, y: 46 },
  { name: "peugeot 504", x: 25, y: 87 },
  { name: "audi 100 ls", x: 24, y: 90 },
  { name: "saab 99e", x: 25, y: 95 },
  { name: "bmw 2002", x: 26, y: 113 },
  { name: "amc gremlin", x: 21, y: 90 },
  { name: "ford f250", x: 10, y: 215 },
  { name: "chevy c20", x: 10, y: 200 },
  { name: "dodge d200", x: 11, y: 210 },
  { name: "hi 1200d", x: 9, y: 193 },
  { name: "datsun pl510", x: 27, y: 88 },
  { name: "chevrolet vega 2300", x: 28, y: 90 },
  { name: "toyota corona", x: 25, y: 95 },
  { name: "ford pinto", x: 25, y: 0 },
];
