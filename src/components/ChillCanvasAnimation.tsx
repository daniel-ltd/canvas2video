import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Stage, Layer, Text, Rect } from 'react-konva';
import Rectangle, { ShapeProps } from './RandomRect';
import Konva from "konva";
import CanvasCapture from 'canvas-capture';
import { useFrame } from '../FrameContext';

interface ChillCanvasAnimationProps {
}

const ChillCanvasAnimation = forwardRef<Konva.Stage, ChillCanvasAnimationProps>((props, stageRef) => {
  const [rectangles, setRectangles] = useState<ShapeProps[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const panelRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<Konva.Layer>(null);

  useEffect(() => {
    const minSize = 30;
    const maxSize = 130;
    const numRectangles = 8;
    const newRectangles = [];
    for (let i = 0; i < numRectangles; i++) {
      const isSquare = Math.random() < 0.3;
      const recSize = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
      const recWidth = recSize;
      const recHeight = isSquare ? recSize : recSize * Math.random() + minSize;
      const x = Math.floor(Math.random() * (size.width - recWidth));
      const y = Math.floor(Math.random() * (size.height - recHeight));

      newRectangles.push({
        id: i.toString(),
        x,
        y,
        width: recWidth,
        height: recHeight,
        fill: Konva.Util.getRandomColor(),
        rotation: Math.random() < 0.3 ? Math.random() * 360 : 0
      });
    }
    setRectangles(newRectangles);
  }, [size]);

  useEffect(() => {
    const handleResize = () => {
      const stageContainer = panelRef.current;
      if (!stageContainer) return;
      const newWidth = Math.max(Math.floor(stageContainer.offsetWidth / 3), 320);
      const newHeight = stageContainer.offsetHeight;
      setSize({ width: newWidth, height: newHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [selectedId, selectShape] = React.useState<string | null>(null);
  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  // useEffect(() => {
  //   let anim: Konva.Animation;

  //   if (isRecording) {
  //     console.info(layerRef.current)
  //     anim = new Konva.Animation((frame: any) => {
  //       CanvasCapture.recordFrame();
  //       console.info("capture");
  //     }, layerRef.current);
  //   }

  //   return () => {
  //     anim?.stop();
  //   };
  // }, [isRecording, layerRef]);

  // useEffect(() => {
  //   let anim: Konva.Animation;

  //   anim = new Konva.Animation((frame: any) => {
  //     if (CanvasCapture.isRecording()) CanvasCapture.recordFrame();
  //     // console.info("capture");
  //   }, layerRef.current);

  //   anim.start();

  //   return () => {
  //     anim?.stop();
  //   };
  // }, [layerRef]);

  // const { value, setNumFrames } = useFrame();
  // useEffect(() => {
  //   // setInterval(() => {
  //   //   setNumFrames(new Date());
  //   // }, 16);
  //   if (isRecording) {
  //     console.info('capture');
  //     CanvasCapture.recordFrame();
  //     setNumFrames(new Date());
  //   }
  // }, [value, isRecording]);

  return (
    <div ref={panelRef} className="canvas-stage">
      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        backgroundColor="red">
        <Layer
          ref={layerRef}
          className="canvas-layer">
          <Rect
            x={0}
            y={0}
            width={size.width}
            height={size.height}
            fill="#181818"
            listening={false}
          />
          {rectangles.map((rect, index) => (
            <Rectangle
              key={index}
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              onSelect={() => {
                selectShape(rect.id);
              }}
              onChange={(newAttrs) => {
                const rects = rectangles.slice();
                // @ts-ignore
                rects[index] = newAttrs;
                setRectangles(rects);
              }} />
          ))}
          <Text x={60} y={60} text="Hello, world!" fontSize={20} fill="white" />
        </Layer>
      </Stage>
    </div>
  );
});

export default ChillCanvasAnimation;
