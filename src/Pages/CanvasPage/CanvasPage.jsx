import { makeStyles } from "@material-ui/styles";
import React, { useRef, useEffect, useState } from "react";
import { AppLayout } from "../../_components";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.text.secondary,
  },
  canvas: {
    backgroundColor: "#fff",
  },
}));

function CanvasPage() {
  const classes = useStyles();

  // Canvas에 그림을 그리기 위해서는 DOM을 직접 선택해야한다.
  // 따라서 useRef를 이용하여, canvas 태그를 가르킨다.
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    initCanvas();
  }, []);

  useEffect(() => {
    console.log("isdrawing", isDrawing);
  }, [isDrawing]);

  useEffect(() => {
    console.log(coordinates);
  }, [coordinates]);

  function initCanvas() {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 500;
    // canvas.width = window.innerWidth * 0.5;
    // canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    setCtx(context);
  }

  const drawLine = (style = {}) => {
    const { color = "black", width = 1 } = style;
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(coordinates[0].x, coordinates[0].y);

      // 나머지 값으로 라인을 그린다.
      coordinates.forEach((coordinate) => {
        ctx.lineTo(coordinate.x, coordinate.y);
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
    }
  };

  function startDrawing(event) {
    let nativeEvent = event.nativeEvent;

    const { offsetX, offsetY } = nativeEvent;
    let x = offsetX;
    let y = offsetY;
    console.log("drawing", x, y);

    setCoordinates((oldValue) => [...oldValue, { x, y }]);
  }
  function finishDrawing() {
    ctx.fill();
  }

  return (
    <AppLayout>
      <div className={classes.root}>
        <canvas
          className={classes.canvas}
          ref={canvasRef}
          // onClick={startDrawing}
          onMouseDown={startDrawing}
          onMouseUp={drawLine}
          onDoubleClick={finishDrawing}
          // onMouseMove={drawing}
          // onMouseLeave={finishDrawing}
        />
      </div>
    </AppLayout>
  );
}

export { CanvasPage };
