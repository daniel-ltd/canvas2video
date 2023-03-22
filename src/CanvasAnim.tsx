import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import Konva from "konva";
import './App.css';

function CanvasAnim() {
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recorder, setRecorder] = useState(null);

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

  const update = (layer: Konva.Layer, frame: any) => {
    var angularSpeed = 100;
    var angularDiff = (angularSpeed * frame.timeDiff) / 1000;
    var shapes = layer.getChildren();

    for (var n = 0; n < shapes.length; n++) {
      var shape = shapes[n];
      shape.rotate(angularDiff);
    }
  };

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

    var anim = new Konva.Animation(function (frame) {
      layerRef.current && update(layerRef.current, frame);
    }, layerRef.current);

    anim.start();

    return () => {
      anim.stop();
      layerRef.current?.destroyChildren();
    }
  }, [size, stageRef.current]);

  useEffect(() => {
    // TODO: create recorder
    const recorder = null;

    setRecorder(recorder);
  }, [stageRef.current]);

  const startRecording = () => {
    setIsRecording(true);
    // TODO: start recording
    // recorder?.startRecording();
  };

  const stopRecording = () => {
    setIsRecording(false);

    // TODO: stop recording
    // recorder?.stopRecording();
    
    // TODO: export video
    // recorder?.getStreamURL()
    //   .then((url) => {
    //     window.open(url);
    //   })
    //   .catch((err) => console.error(err));
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