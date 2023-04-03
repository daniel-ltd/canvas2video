import CanvasCapture from 'canvas-capture';
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import ChillCanvasAnimation from './components/ChillCanvasAnimation';
import IntenseCanvasAnimation from './components/IntenseCanvasAnimation';
import RecordRTC from "recordrtc";
import CanvasRecordRTC from './components/CanvasRecordRTC';
import { FrameProvider, useFrame } from './FrameContext';
import CanvasCapturer from './components/CanvasCaptuter';

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

  useEffect(() => {
    if (!canvasRef.current) return;

    // https://github.com/muaz-khan/RecordRTC
    const recorder: RecordRTC = new RecordRTC(canvasRef.current, {
      type: 'canvas',
      // MediaRecorder API seems unable to record mimeType: video/mp4
      mimeType: 'video/webm',
      disableLogs: false
    });

    setRecorder(recorder);
  }, [canvasRef]);

  const startRecording = () => {
    setIsRecording(true);

    // reset recorder states and remove the data
    recorder?.reset();
    // start recording <canvas> drawings
    recorder?.startRecording();
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
    <>
      {/* <ChillCanvasAnimation ref={stageRef} /> */}
      <IntenseCanvasAnimation ref={stageRef} />
      {/* <button className="btn-record" onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button> */}
      <CanvasRecordRTC />
      <CanvasCapturer />
    </>
  );
}

export default App;
