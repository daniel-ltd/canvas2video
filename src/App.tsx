import { Canvas2Video } from 'canvas2video';
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import ChillCanvasAnimation from './components/ChillCanvasAnimation';
import IntenseCanvasAnimation from './components/IntenseCanvasAnimation';

function App() {
  const stageRef = useRef<Konva.Stage>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recorder, setRecorder] = useState<Canvas2Video | null>(null);

  useEffect(() => {
    const canvasElements = stageRef.current?.container().querySelectorAll("canvas");
    if (canvasElements) {
      canvasRef.current = canvasElements[1] || canvasElements[0];
    }
  }, [stageRef]);

  useEffect(() => {
    if (!canvasRef.current) return;

    // https://github.com/welefen/canvas2video
    const recorder: Canvas2Video = new Canvas2Video({
      canvas: canvasRef.current,
      outVideoType: "webm",
      // workerOptions: {
      // logger: str => console.error(str),
      // }
    });

    setRecorder(recorder);
  }, [canvasRef]);

  const startRecording = () => {
    setIsRecording(true);
    recorder?.startRecord();
  };

  const stopRecording = () => {
    setIsRecording(false);

    recorder?.stopRecord();
    recorder?.getStreamURL()
      .then((url) => {
        window.open(url);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {/* <ChillCanvasAnimation ref={stageRef} /> */}
      <IntenseCanvasAnimation ref={stageRef} />
      <button className="btn-record" onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </>
  );
}

export default App;
