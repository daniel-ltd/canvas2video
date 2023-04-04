import { forwardRef, useEffect, useRef, useState } from "react";
import { Layer, Stage, Rect, Circle } from "react-konva";
import Konva from "konva";
import CanvasCapture from "canvas-capture";
import { Controller, animated, useSpring } from "@react-spring/web";

interface CanvasProps {
}

const AnimatedCircle = animated(Circle);
const AnimatedRect = animated(Rect);

const DemoAnimation = forwardRef<Konva.Stage, CanvasProps>((props, stageRef) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<Konva.Layer>(null);

  const [size, setSize] = useState({ width: 360, height: 640 });
  const [animations, setAnimation] = useState(new Controller({ pause: true }))
  // const spring = useSpring({
  //   from: { x: 10, y: 10 },
  //   to: { x: 200, y: 300 }
  // });

  const [spring, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
  }));

  const rect1 = useSpring({
    from: { x: 60, y: 80, opacity: 0 },
    to: { x: 60, y: 20, opacity: 1 },
    config: { duration: 600 },
  });

  const rect2 = useSpring({
    from: { x: 60, y: 100, opacity: 0 },
    to: { x: 60, y: 90, opacity: 1 },
    delay: 600,
    config: { duration: 400 },
  });

  const rect3 = useSpring({
    from: { x: 60, y: 260, opacity: 0 },
    to: { x: 60, y: 140, opacity: 1 },
    pause: true,
    config: { duration: 1000 },
  });

  const rect4 = useSpring({
    from: { x: 60, y: 580, opacity: 0 },
    to: { x: 60, y: 560, opacity: 1 },
    delay: 800,
    config: { duration: 320 },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      set({
        x: Math.random() * size.width,
        y: Math.random() * size.height,
        config: { duration: 1000 },
      });
    }, 1500);

    // setTimeout(() => {
    //   animations.start({ pause: false })
    // }, 10000);

    return () => clearInterval(intervalId);
  }, [set]);

  return (
    <div ref={panelRef} className="canvas-stage">
      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}>
        <Layer listening={false}>
          <Rect width={size.width} height={size.height} fill="#262626" />
          <AnimatedRect {...rect1} width={240} height={60} fill="green" />
          <AnimatedRect {...rect2} width={240} height={20} fill="pink" />
          <AnimatedRect {...rect3} width={240} height={400} fill="yellow" />
          <AnimatedRect {...rect4} width={240} height={30} fill="blue" />
          {/* <AnimatedRect {...rect1} width={240} height={30} fill="blue" /> */}
          <AnimatedCircle {...spring} {...animations.springs} radius={20} fill="red" />
        </Layer>
      </Stage>
    </div>
  );
});

export default DemoAnimation;