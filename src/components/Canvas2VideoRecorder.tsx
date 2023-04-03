import { Canvas2Video } from "canvas2video";
import Konva from "konva";
import { useEffect, useState } from "react";

function Canvas2VideoRecorder() {
  const recordVideo = () => {
    const canvasElements = document.querySelectorAll(".canvas-stage canvas");
    if (canvasElements) {
      const recordCanvas = (canvasElements[1] || canvasElements[0]) as HTMLCanvasElement;
      console.info(recordCanvas)

      // https://github.com/welefen/canvas2video
      const recorder: Canvas2Video = new Canvas2Video({
        canvas: recordCanvas,
        outVideoType: "webm",
        // workerOptions: {
        // logger: str => console.error(str),
        // }
      });

      recorder.startRecord();

      setTimeout(() => {
        recorder.stopRecord();
        recorder.getStreamURL()
          .then((url) => {
            window.open(url);
          })
          .catch((err) => console.error(err));
      }, 6000);
    }
  };

  return (
    <button className="btn-record" onClick={recordVideo}>
      Canvas2Video Export
    </button>
  );
}

export default Canvas2VideoRecorder;