import CanvasCapture from "canvas-capture";
import Konva from "konva";
import { useEffect } from "react";

interface Props {
  onBeforeRecord: Function
}

function CanvasCapturer({ onBeforeRecord }: Props) {
  useEffect((): any => {
    const anim = new Konva.Animation((frame: any) => {
      if (CanvasCapture.isRecording()) CanvasCapture.recordFrame();
    });

    anim.start();

    return () => anim.stop();
  }, []);

  const recordVideo = () => {
    const canvasElements = document.querySelectorAll(".canvas-stage canvas");
    if (canvasElements) {
      const recordCanvas = (canvasElements[1] || canvasElements[0]) as HTMLCanvasElement;
      console.info(recordCanvas)

      CanvasCapture.init(
        recordCanvas,
        { showRecDot: true },
      );

      CanvasCapture.beginVideoRecord({
        name: 'demo-webm',
        format: CanvasCapture.WEBM,
        quality: 1,
        fps: 30,
        // onExportProgress: (progress: number) => console.log(`WEBM export progress: ${progress}.`),
        // onExportFinish: () => console.log(`Finished WEBM export.`),
      });
      onBeforeRecord();

      setTimeout(() => {
        CanvasCapture.stopRecord();
      }, 6000);
    }
  };

  return (
    <button className="btn-record" onClick={recordVideo}>
      CanvasCapture Export
    </button>
  );
}

export default CanvasCapturer;