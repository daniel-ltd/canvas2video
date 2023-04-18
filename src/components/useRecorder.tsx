import { Controller, SpringRef, useSpringRef } from "@react-spring/web";
import CanvasCapture from "canvas-capture";
import { useState } from "react";

import {
  MP4_OPTIONS,
  WEBM_OPTIONS,
} from "canvas-capture/dist/@types/CanvasCapture";

type Settings = WEBM_OPTIONS | MP4_OPTIONS;

const defaultSettings: Settings = {
  format: CanvasCapture.WEBM,
  quality: 1,
  fps: 60,
  // onExport: (blob, _filename) => {
  //   const url = URL.createObjectURL(blob);
  //   window.open(url);
  // },
};

type Recorder = {
  exportVideo: (canvas: HTMLCanvasElement, recordTime: number) => void;
  isRecording: boolean;
};

type RecorderHook = (settings?: Settings) => [SpringRef, Recorder];

const useRecorder: RecorderHook = (settings) => {
  const api = useSpringRef();
  const [isRecording, setIsRecording] = useState(false);

  const exportVideo = (canvas: HTMLCanvasElement, recordTime: number) => {
    if (recordTime <= 0 || CanvasCapture.isRecording()) return false;
    
    setIsRecording(true);
    CanvasCapture.init(canvas, { showRecDot: true });

    const _settings: Settings = {
      ...defaultSettings,
      ...settings,
    };
    CanvasCapture.beginVideoRecord(_settings);

    const animations = new Controller({
      frame: 0,
      config: { duration: recordTime },
      onStart: () => {
        console.info("start record");
        api.start();
      },
      onChange: () => {
        console.log("capture frame");

        CanvasCapture.recordFrame();
        api.resume();
      },
      onRest: () => {
        console.info("stop record");

        CanvasCapture.stopRecord();
        setIsRecording(false);
      },
    });

    animations.start({ frame: (recordTime / 1000) * _settings.fps! });
    return true;
  };

  const recorder = {
    exportVideo,
    isRecording,
  };

  return [api, recorder];
};

export default useRecorder;
