import Konva from "konva";
import { useEffect, useState } from "react";

interface RecorderProps {
  canvasRef: Konva.Stage | null;
}

function Recorder({ canvasRef }: RecorderProps) {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    // @ts-ignore
    console.info(canvasRef);

    // TODO: create recorder
    const recorder = null;

    setRecorder(recorder);
  }, [canvasRef]);

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
    <button className="btn-record" onClick={isRecording ? stopRecording : startRecording}>
      {isRecording ? "Stop Recording" : "Start Recording"}
    </button>
  );
}

export default Recorder;