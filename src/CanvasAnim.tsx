import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import Konva from "konva";
import './App.css';
// @ts-ignore
// import CCapture from "./CCapture.min.js";

// if (!window.requestAnimationFrame) {

//   window.requestAnimationFrame = (function () {

//     // @ts-ignore
//     return window.webkitRequestAnimationFrame ||
//       // @ts-ignore
//       window.mozRequestAnimationFrame ||
//       // @ts-ignore
//       window.oRequestAnimationFrame ||
//       // @ts-ignore
//       window.msRequestAnimationFrame ||
//       // @ts-ignore
//       function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {

//         window.setTimeout(callback, 1000 / 60);

//       };

//   })();

// }


// @ts-ignore
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    const s = document.createElement('script');
    let r = false;
    s.type = 'text/javascript';
    s.src = src;
    s.async = true;
    s.onerror = function (err) {
      // @ts-ignore
      reject(err, s);
    };
    // @ts-ignore
    s.onload = s.onreadystatechange = function () {
      // console.log(this.readyState); // uncomment this line to see which ready states are called.
      // @ts-ignore
      if (!r && (!this.readyState || this.readyState == 'complete')) {
        r = true;
        // @ts-ignore
        resolve();
      }
    };
    const t = document.getElementsByTagName('script')[0];
    // @ts-ignore
    t.parentElement.insertBefore(s, t);
  });
}

function CanvasAnim() {
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recorder, setRecorder] = useState(null);

  // const [lastFrameTime, setLastFrameTime] = useState(0);
  const lastFrameTime = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const stageContainer = panelRef.current;
      if (!stageContainer) return;
      const newWidth = stageContainer.offsetWidth;
      const newHeight = stageContainer.offsetHeight;
      setSize({ width: newWidth, height: newHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const [angle, setAngle] = useState(0);
  useEffect(() => {
    const canvasElement = stageRef.current?.container().querySelector("canvas") as HTMLCanvasElement;

    // @ts-ignore
    const animate = (timestamp) => {
      requestAnimationFrame(animate);

      const timeDiff = timestamp - (lastFrameTime.current || 0);
      // console.info(timeDiff);
      // setLastFrameTime(timestamp);
      lastFrameTime.current = timestamp;

      const angularSpeed = 100;
      // setAngle(angle => angle + angularSpeed * (timeDiff / 1000));
      var angularDiff = (angularSpeed * timeDiff) / 1000;

      var shapes = layerRef.current?.getChildren() || [];

      for (var n = 0; n < shapes.length; n++) {
        var shape = shapes[n];
        shape.rotate(angularDiff);
      }
      // @ts-ignore
      isRecording && recorder?.capture(canvasElement);
    };

    requestAnimationFrame(animate);

    return () => {
      console.info("cancel")
      // @ts-ignore
      cancelAnimationFrame(animate);
    }
  }, []);

  // resize canvas => re-render shapes
  useLayoutEffect(() => {
    if (!stageRef.current) return;

    var colors = [
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'cyan',
      'purple',
    ];
    var colorIndex = 0;

    for (var i = 0; i < 300; i++) {
      var color = colors[colorIndex++];
      if (colorIndex >= colors.length) {
        colorIndex = 0;
      }

      var randWidth = Math.random() * 100 + 20;
      var randHeight = Math.random() * 100 + 20;
      var randX = Math.random() * size.width - 20;
      var randY = Math.random() * size.height - 20;

      var box = new Konva.Rect({
        x: randX,
        y: randY,
        offset: {
          x: randWidth / 2,
          y: randHeight / 2,
        },
        width: randWidth,
        height: randHeight,
        fill: color,
        stroke: 'black',
        strokeWidth: 4,
      });

      layerRef.current?.add(box);
    }

    // const canvasElement = stageRef.current?.container().querySelector("canvas") as HTMLCanvasElement;
    // var anim = new Konva.Animation(function (frame) {
    //   layerRef.current && update(layerRef.current, frame);
    // }, layerRef.current);

    // anim.start();

    return () => {
      // anim.stop();
      layerRef.current?.destroyChildren();
    }
  }, [size, stageRef.current]);

  // set recorder
  useEffect(() => {
    // TODO: create recorder
    // @ts-ignore
    const recorder = new CCapture({
      // framerate: 60,
      // verbose: true,
      format: 'webm',
      // name: 'my-animation'
    });

    console.info("set record");
    // @ts-ignore
    setRecorder(recorder);
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    // TODO: start recording
    // @ts-ignore
    recorder?.start();
    console.info('start recording');

    // requestAnimationFrame(animate)
  };

  const stopRecording = () => {
    setIsRecording(false);

    // TODO: stop recording
    // @ts-ignore
    recorder?.stop();

    // TODO: export video
    // @ts-ignore
    // recorder?.save(blob => {
    //   const url = URL.createObjectURL(blob);
    //   window.open(url);
    // });
  };

  return (
    <div ref={panelRef} className="canvas-stage">
      <button className="btn-record" onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}>
        <Layer
          ref={layerRef}
          listening={false}
          className="canvas-layer" />
      </Stage>
    </div>
  )
}

export default CanvasAnim;