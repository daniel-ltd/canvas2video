import RecordRTC, { invokeSaveAsDialog } from "recordrtc";

interface CanvasRecordRTCProps {
  onBeforeRecord: Function
}

function CanvasRecordRTC({ onBeforeRecord }: CanvasRecordRTCProps) {
  const recordVideo = () => {
    const canvasElements = document.querySelectorAll(".canvas-stage canvas");
    if (canvasElements) {
      const recordCanvas = (canvasElements[1] || canvasElements[0]) as HTMLVideoElement;
      console.info(recordCanvas)

      // https://github.com/muaz-khan/RecordRTC#configuration
      const recorder: RecordRTC = new RecordRTC(recordCanvas, {
        type: 'canvas',
        mimeType: 'video/webm',
        timeSlice: 1000,
        frameInterval: 30,
        canvas: {
          width: 360,
          height: 640
        },
        disableLogs: false
      });

      recorder.startRecording();
      onBeforeRecord();

      setTimeout(() => {
        recorder.stopRecording(function () {
          const blob = recorder.getBlob();
          invokeSaveAsDialog(blob, 'video.webm');

          // const url = URL.createObjectURL(blob);
          // window.open(url);
        });
      }, 6000);
    }
  };

  return (
    <button className="btn-record" onClick={recordVideo}>
      Export Video
    </button>
  );
}

export default CanvasRecordRTC;