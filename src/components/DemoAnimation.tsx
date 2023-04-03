import { forwardRef, useEffect, useRef, useState } from "react";
import { Layer, Stage, Rect, Circle } from "react-konva";
import Konva from "konva";
import CanvasCapture from "canvas-capture";
import { animated, useSpring } from "@react-spring/web";

interface CanvasProps {
}

const AnimatedCircle = animated(Circle);

const DemoAnimation = forwardRef<Konva.Stage, CanvasProps>((props, stageRef) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<Konva.Layer>(null);

  const [size, setSize] = useState({ width: 360, height: 640 });
  // const spring = useSpring({
  //   from: { x: 10, y: 10 },
  //   to: { x: 200, y: 300 }
  // });
  const [spring, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
  }));

  useEffect(() => {
    const intervalId = setInterval(() => {
      set({
        x: Math.random() * size.width,
        y: Math.random() * size.height,
        config: { duration: 1000 },
      });
    }, 1500);

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
          <AnimatedCircle {...spring} radius={20} fill="red" />

        </Layer>
      </Stage>
    </div>
  );
});

export default DemoAnimation;