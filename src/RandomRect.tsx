import React, { useCallback, useEffect, useRef, useState } from "react";
import { Rect } from "react-konva";
import Konva from "konva";

export interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
}

const RandomRect: React.FC<Props> = ({ x, y, width, height, fill }) => {
  const rectRef = useRef<any>(null);
  const [animation, setAnimation] = useState<Konva.Animation | null>(null)

  const changeSize = () => {
    if (rectRef.current) {
      rectRef.current.to({
        scaleX: Math.random() + 0.8,
        scaleY: Math.random() + 0.8,
        duration: 0.2,
      });
    }
  };

  useEffect((): any => {
    const rect = rectRef.current;

    const minPeriod = 1000;
    const maxPeriod = 4000;
    const period = Math.floor(Math.random() * (maxPeriod - minPeriod + 1)) + minPeriod;
    const amplitude = Math.random() + 0.3;

    const anim = new Konva.Animation((frame: any) => {
      const newY = amplitude * Math.sin((frame.time * 2 * Math.PI) / period) + rect.getAttr("y");
      rect?.y(newY);
    }, rect?.getLayer());

    setAnimation(anim);
    anim.start();

    return () => anim.stop();
  }, []);

  const handleClick = () => {
    animation?.stop();
  };

  const handleMouseUp = () => {
    animation?.start();
  };

  return (
    <Rect
      ref={rectRef}
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      draggable
      onClick={handleClick}
      onMouseUp={handleMouseUp}
      onDblClick={changeSize}
    />
  );
};

export default RandomRect;