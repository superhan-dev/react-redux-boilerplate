import { makeStyles } from "@material-ui/styles";
import React, { useRef, useEffect, useState } from "react";
import { AppLayout } from "../../_components";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.text.light,
  },
}));

function CanvasPage() {
  const classes = useStyles();

  // Canvas에 그림을 그리기 위해서는 DOM을 직접 선택해야한다.
  // 따라서 useRef를 이용하여, canvas 태그를 가르킨다.
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    initCanvas();
  }, []);

  useEffect(() => {
    console.log("isdrawing", isDrawing);
  }, [isDrawing]);

  function initCanvas() {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    setCtx(context);
  }

  function startDrawing() {
    setIsDrawing(true);
  }
  function finishDrawing() {
    setIsDrawing(false);
  }
  function drawing(event) {
    let x = event.offsetX;
    let y = event.offsetY;

    if (isDrawing) {
      console.log(event);
    }
  }
  function finishDrawing() {
    setIsDrawing(false);
  }

  return (
    <AppLayout>
      <div className={classes.root}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={drawing}
          onMouseLeave={finishDrawing}
        />
      </div>
    </AppLayout>
  );
}

export { CanvasPage };
