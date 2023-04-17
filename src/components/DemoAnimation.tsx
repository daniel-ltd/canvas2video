import Konva from "konva";
import { forwardRef, useState } from "react";
import { Layer, Stage, Rect, Text } from "react-konva";
import { animated, useSpring } from "@react-spring/web";
import useRecorder from "./useRecorder";

const AnimatedRect = animated(Rect);
const AnimatedText = animated(Text);

const DemoAnimation = forwardRef<Konva.Stage>((_props, stageRef) => {
  const [size] = useState({ width: 360, height: 640 });
  const recorder = useRecorder(4600 + 1400 + 1000); // padding 1s

  const rect1 = useSpring({
    from: { x: 60, y: 0, opacity: 0 },
    to: { x: 60, y: 35, opacity: 1 },
    config: { duration: 1000 },
    ref: recorder.api,
    // onRest: () => {
    //   console.info("onRest");
    // },
    // onResolve: () => {
    //   console.info("onResolve");
    // },
    // onProps: () => {
    //   console.info("onProps");
    // },
    // onDestroyed: () => {
    //   console.info("onDestroyed");
    // },
    // onChange: () => {
    //   console.log("the spring has resolved");
    //   api.pause();
    //   setTimeout(() => {
    //     api.resume();
    //   }, 1000 / 60);
    // },
    // reset: true,
  });

  const obello = useSpring({
    from: { x: 60, y: 0, opacity: 0 },
    to: { x: 60, y: 40, opacity: 1 },
    delay: 600,
    config: { duration: 1000 },
    ref: recorder.api,
    // reset: true,
  });

  const rect2 = useSpring({
    from: { x: 60, y: 190, opacity: 0 },
    to: { x: 60, y: 105, opacity: 1 },
    delay: 1600,
    config: { duration: 2000 },
    ref: recorder.api,
    // reset: true,
  });

  const rect3 = useSpring({
    from: { x: 60, y: 260, opacity: 0 },
    to: { x: 60, y: 155, opacity: 1 },
    // pause: true,
    // immediate: true,
    delay: 1000,
    config: { duration: 3600 },
    ref: recorder.api,
    // reset: true,
  });

  const rect4 = useSpring({
    from: { x: 60, y: 580, opacity: 0 },
    to: { x: 60, y: 575, opacity: 1 },
    delay: 4600,
    config: { duration: 1400 },
    ref: recorder.api,
    // reset: true,
  });

  const resetAnimation = () => {
    recorder.exportVideo();
  };

  return (
    <>
      <div className="btn-group">
        <button className="btn-record" onClick={resetAnimation}>
          Export Video
        </button>
      </div>

      <div className="canvas-stage">
        <Stage ref={stageRef} width={size.width} height={size.height}>
          <Layer listening={false}>
            <Rect width={size.width} height={size.height} fill="white" />
            <AnimatedRect {...rect1} width={240} height={60} fill="#FFC16E" />

            <AnimatedText
              text="Obello"
              fontSize={60}
              align="center"
              fontFamily="Optima"
              {...obello}
              width={240}
              height={60}
              fill="#FF6E72"
            />

            <AnimatedRect {...rect2} width={240} height={25} fill="#FF6E72" />

            <AnimatedRect
              {...rect3}
              width={240}
              height={400}
              fillLinearGradientStartPoint={{ x: -60, y: -0 }}
              fillLinearGradientEndPoint={{ x: 0, y: 600 }}
              fillLinearGradientColorStops={[
                0,
                "rgb(246, 211, 101)",
                1,
                "rgb(253, 160, 133)",
              ]}
            />

            <AnimatedText
              text="Style for days"
              fontSize={30}
              align="center"
              fontFamily="Optima"
              {...rect4}
              width={240}
              height={30}
              fill="#E87664"
            />
          </Layer>
        </Stage>
      </div>
    </>
  );
});

export default DemoAnimation;
