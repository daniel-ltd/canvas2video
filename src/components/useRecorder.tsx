import { Controller, useSpring, useSpringRef } from "@react-spring/web";
import CanvasCapture from "canvas-capture";
import { useState, useEffect } from "react";

const useRecorder = (recordTime = 0) => {
  const api = useSpringRef();
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (isRecording && !CanvasCapture.isRecording()) {
      const canvasElements = document.querySelectorAll(".canvas-stage canvas");
      if (canvasElements) {
        const recordCanvas = (canvasElements[1] ||
          canvasElements[0]) as HTMLCanvasElement;

        CanvasCapture.init(recordCanvas, { showRecDot: true });

        CanvasCapture.beginVideoRecord({
          name: "demo-webm",
          format: CanvasCapture.WEBM,
          quality: 1,
          fps: 60,
        });
      }

      const animations = new Controller({
        opacity: 0,
        config: { duration: recordTime },
        ref: api,
        onRest: () => {
          console.info("stop record");

          CanvasCapture.stopRecord();
          setIsRecording(false);
        },
        onChange: () => {
          console.log("capture frame");

          CanvasCapture.recordFrame();
          api.resume();
        },
      });

      animations.start({ opacity: 1 });
      api.start();
    }
  }, [isRecording, api]);

  const exportVideo = () => {
    setIsRecording(true);
  };

  const recorder = {
    api,
    exportVideo,
  };

  return recorder;
};

export default useRecorder;
