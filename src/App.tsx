import Konva from 'konva';
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import ChillCanvasAnimation from './components/ChillCanvasAnimation';
import IntenseCanvasAnimation from './components/IntenseCanvasAnimation';
import CCapturer from './components/CCapturer';

function App() {
  const stageRef = useRef<Konva.Stage>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recorder, setRecorder] = useState<CCapture | null>(null);

  useEffect(() => {
    const canvasElements = stageRef.current?.container().querySelectorAll("canvas");
    if (canvasElements && canvasElements[1]) {
      canvasRef.current = canvasElements[1];
    }
  }, [stageRef]);

  useEffect(() => {
    if (!canvasRef.current) return;

    // TODO: create recorder
    const recorder = new CCapture({
      format: 'webm',
      framerate: 30,
      quality: 100,
      name: 'my_animation',
    });

    // @ts-ignore
    window.capture = () => {
      recorder.capture(canvasRef.current!);
    }

    setRecorder(recorder);
  }, [canvasRef]);

  const startRecording = () => {
    setIsRecording(true);
    // TODO: start recording
    // recorder?.startRecording();
    recorder?.start();
  };

  const stopRecording = () => {
    setIsRecording(false);

    // TODO: stop recording
    // recorder?.stopRecording();
    recorder?.save();

    // TODO: export video
    // recorder?.getStreamURL()
    //   .then((url) => {
    //     window.open(url);
    //   })
    //   .catch((err) => console.error(err));
  };

  const captureCanvas = useCallback(() => {
    // console.info(isRecording);
    // isRecording && console.info(canvasRef.current!);
    // isRecording && recorder?.capture(canvasRef.current!);
  }, [isRecording, recorder, canvasRef]);

  return (
    <>
      <ChillCanvasAnimation ref={stageRef} />
      {/* <IntenseCanvasAnimation ref={stageRef} onFrameRender={captureCanvas} /> */}
      {/* <button className="btn-record" onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button> */}
      <CCapturer />
    </>
  );
}

export default App;
