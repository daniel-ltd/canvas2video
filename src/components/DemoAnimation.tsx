import { forwardRef, useEffect, useRef, useState } from "react";
import { Layer, Stage, Rect, Text } from "react-konva";
import Konva from "konva";
import { animated, useSpring, useSpringRef } from "@react-spring/web";

interface CanvasProps {
  recording: boolean
}

const AnimatedRect = animated(Rect);
const AnimatedText = animated(Text);

const DemoAnimation = forwardRef<Konva.Stage, CanvasProps>(({ recording }, stageRef) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<Konva.Layer>(null);

  const api = useSpringRef();
  const [size] = useState({ width: 360, height: 640 });

  const [spring, set] = useSpring(() => ({
    x: 0,
    y: 0
  }));

  const rect1 = useSpring({
    from: { x: 60, y: 0, opacity: 0 },
    to: { x: 60, y: 20, opacity: 1 },
    config: { duration: 1600 },
    ref: api,
    // events: () => ({
    //   onStart: () => console.log('the spring has started'),
    //   onClick: () => console.log('the spring has resolved')
    // })
  });

  const obello = useSpring({
    from: { x: 60, y: 0, opacity: 0 },
    to: { x: 60, y: 25, opacity: 1 },
    delay: 600,
    config: { duration: 1000 },
    ref: api,
  });

  const rect2 = useSpring({
    from: { x: 60, y: 190, opacity: 0 },
    to: { x: 60, y: 90, opacity: 1 },
    delay: 1600,
    config: { duration: 2000 },
    ref: api,
  });

  const rect3 = useSpring({
    from: { x: 60, y: 260, opacity: 0 },
    to: { x: 60, y: 140, opacity: 1 },
    // pause: true,
    // immediate: true,
    delay: 1000,
    config: { duration: 3600 },
    ref: api,
  });

  const rect4 = useSpring({
    from: { x: 60, y: 580, opacity: 0 },
    to: { x: 60, y: 560, opacity: 1 },
    delay: 4600,
    config: { duration: 1320 },
    ref: api,
  });

  useEffect(() => {
    recording && api.start();
  }, [recording, api]);

  return (
    <div ref={panelRef} className="canvas-stage">
      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}>
        <Layer listening={false}>
          <Rect width={size.width} height={size.height} fill="white" />
          <AnimatedRect
            {...rect1}
            width={240}
            height={60}
            fill="#FFC16E"
          />

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

          <AnimatedRect
            {...rect2}
            width={240}
            height={20}
            fill="#FF6E72"
          />

          <AnimatedRect
            {...rect3}
            width={240}
            height={400}
            fillLinearGradientStartPoint={{ x: -60, y: -0 }}
            fillLinearGradientEndPoint={{ x: 0, y: 600 }}
            fillLinearGradientColorStops={[0, 'rgb(246, 211, 101)', 1, 'rgb(253, 160, 133)']}
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
  );
});

export default DemoAnimation;
