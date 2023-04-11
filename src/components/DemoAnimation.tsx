import { forwardRef, useEffect, useState } from "react";
import { Layer, Stage, Rect, Text } from "react-konva";
import Konva from "konva";
import { animated, useSpring, useSpringRef } from "@react-spring/web";
import CanvasCapture from "canvas-capture";

const AnimatedRect = animated(Rect);
const AnimatedText = animated(Text);

const DemoAnimation = forwardRef<Konva.Stage>((props, stageRef) => {
  const [timestamp, setTimestamp] = useState<number>();

  const api = useSpringRef();
  const [size] = useState({ width: 360, height: 640 });

  const rect1 = useSpring({
    from: { x: 60, y: 0, opacity: 0 },
    to: { x: 60, y: 35, opacity: 1 },
    config: { duration: 1000 },
    ref: api,
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

  const [obello, set] = useSpring(() => ({
    from: { x: 60, y: 0, opacity: 0 },
    to: { x: 60, y: 40, opacity: 1 },
    delay: 600,
    config: { duration: 1000 },
    ref: api,
    // reset: true,
  }));

  const rect2 = useSpring({
    from: { x: 60, y: 190, opacity: 0 },
    to: { x: 60, y: 105, opacity: 1 },
    delay: 1600,
    config: { duration: 2000 },
    ref: api,
    // reset: true,
  });

  const rect3 = useSpring({
    from: { x: 60, y: 260, opacity: 0 },
    to: { x: 60, y: 155, opacity: 1 },
    // pause: true,
    // immediate: true,
    delay: 1000,
    config: { duration: 3600 },
    ref: api,
    // reset: true,
  });

  const rect4 = useSpring({
    from: { x: 60, y: 580, opacity: 0 },
    to: { x: 60, y: 575, opacity: 1 },
    delay: 4600,
    config: { duration: 1320 },
    ref: api,
    // reset: true,
  });

  const record = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 4600 + 1320 },
    ref: api,
    onRest: () => {
      console.info("stop record");
      CanvasCapture.stopRecord();
    },
    onChange: () => {
      console.log("capture frame");

      api.pause();
      CanvasCapture.recordFrame();
      api.resume();

      // setTimeout(() => {
      //   api.resume();
      // }, 1000 / 60);
    },
  });

  useEffect(() => {
    if (!!timestamp) {
      const canvasElements = document.querySelectorAll(".canvas-stage canvas");
      if (canvasElements) {
        const recordCanvas = (canvasElements[1] ||
          canvasElements[0]) as HTMLCanvasElement;

        CanvasCapture.init(recordCanvas, { showRecDot: true });

        CanvasCapture.beginVideoRecord({
          name: "demo-webm",
          format: CanvasCapture.WEBM,
          quality: 1,
          fps: 150,
        });
      }
      api.start();
    }
  }, [timestamp, api]);

  const resetAnimation = () => {
    setTimestamp(Date.now());
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
