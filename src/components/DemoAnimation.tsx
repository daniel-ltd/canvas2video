import Konva from "konva";
import { forwardRef, useState } from "react";
import { Layer, Stage, Rect, Text } from "react-konva";
import { UseSpringProps, animated, useSprings } from "@react-spring/web";
import useRecorder from "./useRecorder";

const AnimatedRect = animated(Rect);
const AnimatedText = animated(Text);

const DemoAnimation = forwardRef<Konva.Stage>((_props, stageRef) => {
  const [size] = useState({ width: 360, height: 640 });
  const [api, recorder] = useRecorder();

  const shapes = [
    {
      id: 1,
      type: AnimatedRect,
      width: 240,
      height: 60,
      fill: "#FFC16E",
    },
    {
      id: 2,
      type: AnimatedText,
      text: "Obello",
      fontSize: 60,
      align: "center",
      fontFamily: "Optima",
      width: 240,
      height: 60,
      fill: "#FF6E72",
    },
    {
      id: 3,
      type: AnimatedRect,
      width: 240,
      height: 25,
      fill: "#FF6E72",
    },
    {
      id: 4,
      type: AnimatedRect,
      width: 240,
      height: 400,
      fillLinearGradientStartPoint: { x: -60, y: -0 },
      fillLinearGradientEndPoint: { x: 0, y: 600 },
      fillLinearGradientColorStops: [
        0,
        "rgb(246, 211, 101)",
        1,
        "rgb(253, 160, 133)",
      ],
    },
    {
      id: 5,
      type: AnimatedText,
      text: "Style for days",
      fontSize: 30,
      align: "center",
      fontFamily: "Optima",
      width: 240,
      height: 30,
      fill: "#E87664",
    },
  ];

  const data: UseSpringProps[] = [
    {
      from: { x: 60, y: 0, opacity: 0 },
      to: { x: 60, y: 35, opacity: 1 },
      config: { duration: 1000 },
      ref: api,
    },
    {
      from: { x: 60, y: 0, opacity: 0 },
      to: { x: 60, y: 40, opacity: 1 },
      delay: 600,
      config: { duration: 1000 },
      ref: api,
    },
    {
      from: { x: 60, y: 190, opacity: 0 },
      to: { x: 60, y: 105, opacity: 1 },
      delay: 1600,
      config: { duration: 2000 },
      ref: api,
    },
    {
      from: { x: 60, y: 260, opacity: 0 },
      to: { x: 60, y: 155, opacity: 1 },
      // pause: true,
      // immediate: true,
      delay: 1000,
      config: { duration: 3600 },
      ref: api,
    },
    {
      from: { x: 60, y: 580, opacity: 0 },
      to: { x: 60, y: 575, opacity: 1 },
      delay: 4600,
      config: { duration: 1400 },
      ref: api,
    },
  ];
  const [springs, _controller] = useSprings(data.length, (i) => data[i], []);

  const resetAnimation = () => {
    const canvasElements = document.querySelectorAll(".canvas-stage canvas");
    if (canvasElements) {
      const recordCanvas = (canvasElements[1] ||
        canvasElements[0]) as HTMLCanvasElement;

      recorder.exportVideo(recordCanvas, 4600 + 1400 + 1000); // padding 1s
      // recorder.exportVideo(recordCanvas, 3000);
    }
  };

  return (
    <>
      <div className="btn-group">
        <button
          className="btn-record"
          onClick={resetAnimation}
          disabled={recorder.isRecording}
        >
          Export Video
        </button>
      </div>

      <div className="canvas-stage">
        <Stage ref={stageRef} width={size.width} height={size.height}>
          <Layer listening={false}>
            <Rect width={size.width} height={size.height} fill="white" />

            {shapes.map(({ type: Shape, id: id, ...rest }, i) => (
              <Shape key={id} {...rest} {...springs[i]} />
            ))}
          </Layer>
        </Stage>
      </div>
    </>
  );
});

export default DemoAnimation;
