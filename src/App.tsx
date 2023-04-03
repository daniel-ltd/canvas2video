import CanvasCapture from 'canvas-capture';
import { Canvas2Video } from 'canvas2video';
import Konva from 'konva';
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import ChillCanvasAnimation from './components/ChillCanvasAnimation';
import IntenseCanvasAnimation from './components/IntenseCanvasAnimation';
import RecordRTC from "recordrtc";
import CanvasRecordRTC from './components/CanvasRecordRTC';
import { FrameProvider, useFrame } from './FrameContext';
import CanvasCapturer from './components/CanvasCaptuter';
import Canvas2VideoRecorder from './components/Canvas2VideoRecorder';
import CCapturer from './components/CCapturer';

function App() {
  const stageRef = useRef<Konva.Stage>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recorder, setRecorder] = useState<RecordRTC | null>(null);

  useEffect(() => {
    const canvasElements = stageRef.current?.container().querySelectorAll("canvas");
    if (canvasElements) {
      canvasRef.current = canvasElements[1] || canvasElements[0];
    }
  }, [stageRef]);

  return (
    <>
      {/* <ChillCanvasAnimation ref={stageRef} /> */}
      <IntenseCanvasAnimation ref={stageRef} />
      {/* <button className="btn-record" onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button> */}
      <CanvasRecordRTC />
      <CanvasCapturer />
      <Canvas2VideoRecorder />
      <CCapturer />
    </>
  );
}

export default App;
