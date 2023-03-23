import React, { useRef, useEffect } from 'react';

const Capture = () => {
  const canvasRef = useRef(null);
  const lastFrameTime = useRef(0);
  const capturerRef = useRef(null);

  useEffect(() => {

    const capturer = new CCapture({
      format: 'webm',
      framerate: 10,
      name: 'my_animation',
    });
    console.info(capturer)
    // @ts-ignore
    capturerRef.current = capturer;

    let angle = 0;
    const render = () => {
      const canvas = canvasRef.current;
      // @ts-ignore
      const context = canvas.getContext('2d');
  
      const timestamp = Date.now()
      const timeDiff = timestamp - (lastFrameTime.current || 0);
      // console.info(timeDiff);
      lastFrameTime.current = timestamp;

      const angularSpeed = 2.3;
      var angularDiff = (angularSpeed * timeDiff) / 1000;
      angle += angularDiff;

      // @ts-ignore
      context.clearRect(0, 0, canvas.width, canvas.height);

      // tính toán tọa độ và kích thước của hình chữ nhật
      const rectWidth = 100;
      const rectHeight = 50;
      // @ts-ignore
      const rectX = canvas.width / 2 + Math.cos(angle) * 100;
      // @ts-ignore
      const rectY = canvas.height / 2 + Math.sin(angle) * 100;

      context.save();
      context.translate(rectX, rectY);
      context.rotate(angle);
      context.fillStyle = '#00ff00';
      context.fillRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);
      context.restore();

      if (capturerRef.current) {
        // console.info('capture')
        // @ts-ignore
        capturerRef.current?.capture(document.querySelector("canvas"));
      }
    }

    // @ts-ignore
    const animate = () => {
      requestAnimationFrame(animate);
      render();
    }

    setTimeout(() => {
      capturer.save()
    }, 3000);

    capturer.start();

		animate();
  }, []);

  return (
    <canvas ref={canvasRef} width={640} height={480} />
  );
};

export default Capture;