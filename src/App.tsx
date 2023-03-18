import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Stage, Layer, Text, Rect } from 'react-konva';
import Rectangle, { Props as RectangleProps } from './RandomRect';
import RecordRTC from "recordrtc";
import Konva from "konva";

function App() {
  const [rectangles, setRectangles] = useState<RectangleProps[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recorder, setRecorder] = useState<RecordRTC | null>(null);

  useEffect(() => {
    const minSize = 30;
    const maxSize = 130;
    const numRectangles = 8;
    const newRectangles = [];
    for (let i = 0; i < numRectangles; i++) {
      const isSquare = Math.random() < 0.3;
      const recSize = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
      const recWidth = recSize;
      const recHeight = isSquare ? recSize : recSize * Math.random() + minSize;
      const x = Math.floor(Math.random() * (size.width - recWidth));
      const y = Math.floor(Math.random() * (size.height - recHeight));
      newRectangles.push({ x, y, width: recWidth, height: recHeight, fill: Konva.Util.getRandomColor() });
    }
    setRectangles(newRectangles);
  }, [size]);

  useEffect(() => {
    const canvasElement = stageRef.current?.container().querySelector("canvas") as HTMLCanvasElement;
    // https://github.com/muaz-khan/RecordRTC
    const recorder: RecordRTC = new RecordRTC(canvasElement, {
      type: 'canvas',
      mimeType: 'video/mp4',
      disableLogs: false
    });

    setRecorder(recorder);
  }, [stageRef.current]);

  const startRecording = () => {
    setIsRecording(true);

    // reset recorder states and remove the data
    recorder?.reset();
    // start recording <canvas> drawings
    recorder?.startRecording();
  };

  const stopRecording = () => {
    setIsRecording(false);

    recorder?.stopRecording(function () {
      const blob = recorder.getBlob();
      const url = URL.createObjectURL(blob);
      window.open(url);
    });
  };

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

  return (
    <div ref={panelRef} className="canvas-stage">
      <button className="btn-record" onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      <Stage ref={stageRef} width={size.width} height={size.height} backgroundColor="red">
        <Layer className="canvas-layer">
          <Rect
            x={0}
            y={0}
            width={size.width}
            height={size.height}
            fill="#181818"
            listening={false}
          />
          {rectangles.map((rectangle, index) => (
            <Rectangle key={index} {...rectangle} />
          ))}
          <Text x={600} y={100} text="Hello, world!" fontSize={20} fill="white" />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
