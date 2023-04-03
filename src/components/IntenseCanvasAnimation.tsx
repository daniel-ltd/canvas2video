import { forwardRef, useEffect, useRef, useState } from "react";
import { Layer, Stage, Rect } from "react-konva";
import Konva from "konva";

interface CanvasProps {
  onFrameRender: any
}

const IntenseCanvasAnimation = forwardRef<Konva.Stage, CanvasProps>(({ onFrameRender }, stageRef) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<Konva.Layer>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });

  // handle canvas re-size
  useEffect(() => {
    const handleResize = () => {
      const stageContainer = panelRef.current;
      if (!stageContainer) return;

      setSize({
        width: Math.max(Math.floor(stageContainer.offsetWidth / 3), 320),
        height: stageContainer.offsetHeight
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // handle canvas animation
  useEffect(() => {
    if (!layerRef.current) return;

    const colors = [
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'cyan',
      'purple',
    ];
    let colorIndex = 0;

    for (let i = 0; i < 300; i++) {
      const color = colors[colorIndex++];
      if (colorIndex >= colors.length) {
        colorIndex = 0;
      }

      const randWidth = Math.random() * 100 + 20;
      const randHeight = Math.random() * 100 + 20;
      const randX = Math.random() * size.width - 20;
      const randY = Math.random() * size.height - 20;

      const box = new Konva.Rect({
        x: randX,
        y: randY,
        offset: {
          x: randWidth / 2,
          y: randHeight / 2,
        },
        width: randWidth,
        height: randHeight,
        fill: color,
        stroke: 'black',
        strokeWidth: 4,
      });

      layerRef.current?.add(box);
    }

    const anim = new Konva.Animation(function (frame: any) {
      if (!layerRef.current) return;

      const angularSpeed = 100;
      const angularDiff = (angularSpeed * frame.timeDiff) / 1000;
      const shapes = layerRef.current.getChildren();

      for (let n = 0; n < shapes.length; n++) {
        const shape = shapes[n];
        shape.rotate(angularDiff);
      }

      // onFrameRender && onFrameRender();
      // @ts-ignore
      window.capture && window.capture();
    }, layerRef.current);

    anim.start();

    return () => {
      anim.stop();
      layerRef.current?.destroyChildren();
    }
  }, [size, layerRef.current]);

  return (
    <div ref={panelRef} className="canvas-stage">
      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}>
        <Layer listening={false}>
          <Rect width={size.width} height={size.height} fill="#262626" />
        </Layer>

        <Layer
          ref={layerRef}
          listening={false}
          className="canvas-layer" />
      </Stage>
    </div>
  );
});

export default IntenseCanvasAnimation;