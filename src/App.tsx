import CanvasCapture from 'canvas-capture';
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import ChillCanvasAnimation from './components/ChillCanvasAnimation';
import IntenseCanvasAnimation from './components/IntenseCanvasAnimation';

function App() {
  const stageRef = useRef<Konva.Stage>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    const canvasElements = stageRef.current?.container().querySelectorAll("canvas");
    if (canvasElements && canvasElements[1]) {
      canvasRef.current = canvasElements[1];
    }
  }, [stageRef]);

  useEffect(() => {
    if (!canvasRef.current) return;

    // TODO: create recorder
    const recorder = null;

    CanvasCapture.init(
      canvasRef.current,
      { showRecDot: true },
    );

    setRecorder(recorder);
  }, [canvasRef]);

  const startRecording = () => {
    setIsRecording(true);
    // TODO: start recording
    // recorder?.startRecording();
    CanvasCapture.beginVideoRecord({
      name: 'demo-webm',
      format: CanvasCapture.WEBM,
      quality: 1,
      fps: 30,
      // onExportProgress: (progress: number) => console.log(`WEBM export progress: ${progress}.`),
      // onExportFinish: () => console.log(`Finished WEBM export.`),
    });
  };

  const stopRecording = () => {
    setIsRecording(false);

    // TODO: stop recording
    // recorder?.stopRecording();
    CanvasCapture.stopRecord();

    // TODO: export video
    // recorder?.getStreamURL()
    //   .then((url) => {
    //     window.open(url);
    //   })
    //   .catch((err) => console.error(err));
  };

  return (
    <>
      {/* <ChillCanvasAnimation /> */}
      <IntenseCanvasAnimation ref={stageRef} />
      <button className="btn-record" onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </>
  );
}

export default App;
