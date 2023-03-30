import React, { useEffect, useState } from "react";
import { Rect, Transformer } from "react-konva";
import Konva from "konva";
import CanvasCapture from "canvas-capture";
import { useFrame } from "../FrameContext";

export interface ShapeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  id: string;
  rotation?: number;
}

export interface Props {
  shapeProps: ShapeProps;
  isSelected: boolean;
  onSelect: (e: Konva.KonvaEventObject<Event>) => void;
  onChange: (e: Konva.KonvaEventObject<Event>) => void;
}

const RandomRect: React.FC<Props> = ({ shapeProps, isSelected, onSelect, onChange }) => {
  // const shapeRef = useRef<any>(null);
  const shapeRef = React.useRef<Konva.Rect>(null);
  const trRef = React.useRef<Konva.Transformer>(null);
  const [animation, setAnimation] = useState<Konva.Animation | null>(null)

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const changeSize = () => {
    if (shapeRef.current) {
      shapeRef.current.to({
        scaleX: Math.random() + 0.8,
        scaleY: Math.random() + 0.8,
        duration: 0.2,
      });
    }
  };

  const { value, setNumFrames } = useFrame();
  useEffect(() => {
    animation?.start();
  }, [value, animation]);

  useEffect((): any => {
    const rect = shapeRef.current;

    const minPeriod = 1000;
    const maxPeriod = 4000;
    const period = Math.floor(Math.random() * (maxPeriod - minPeriod + 1)) + minPeriod;
    const amplitude = Math.random() * 6;

    const anim = new Konva.Animation((frame: any) => {
      const newY = amplitude * Math.sin((frame.time * 2 * Math.PI) / period) + rect?.getAttr("y");
      rect?.y(newY);

      anim.stop();
      // if (CanvasCapture.isRecording()) CanvasCapture.recordFrame();
    });

    setAnimation(anim);
    // anim.start();

    return () => anim.stop();
  }, []);

  useEffect(() => {
    isSelected ?
      animation?.stop() :
      animation?.start();
  }, [isSelected, animation])

  return (
    <>
      <Rect
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onClick={onSelect}
        onDblClick={changeSize}
        onDragStart={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            // @ts-ignore
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          // @ts-ignore
          const scaleX = node.scaleX();
          // @ts-ignore
          const scaleY = node.scaleY();

          // we will reset it back
          // @ts-ignore
          node.scaleX(1);
          // @ts-ignore
          node.scaleY(1);
          onChange({
            ...shapeProps,
            // @ts-ignore
            x: node.x(),
            // @ts-ignore
            y: node.y(),
            // set minimal value
            // @ts-ignore
            width: Math.max(5, node.width() * scaleX),
            // @ts-ignore
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default RandomRect;