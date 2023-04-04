import Konva from "konva";

interface Props {
  onBeforeRecord: Function
}

function CCapturer({ onBeforeRecord }: Props) {
  const recordVideo = () => {
    const canvasElements = document.querySelectorAll(".canvas-stage canvas");
    if (canvasElements) {
      const recordCanvas = (canvasElements[1] || canvasElements[0]) as HTMLCanvasElement;
      console.info(recordCanvas)

      const recorder = new CCapture({
        format: 'webm',
        framerate: 30,
        quality: 100,
        name: 'my_animation',
      });

      const anim = new Konva.Animation((frame: any) => {
        recorder.capture(recordCanvas);
      });

      recorder.start();
      anim.start();
      onBeforeRecord();

      setTimeout(() => {
        recorder.save();
      }, 6000);
    }
  };

  return (
    <button className="btn-record" onClick={recordVideo}>
      CCapture Export
    </button>
  );
}

export default CCapturer;