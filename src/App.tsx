import './App.css';
import DemoAnimation from './components/DemoAnimation';

function App() {
  return (
    <>
      {/* <ChillCanvasAnimation ref={stageRef} /> */}
      {/* <IntenseCanvasAnimation ref={stageRef} /> */}
      <DemoAnimation />

      {/* <div className='btn-group'> */}
      {/* <CanvasRecordRTC onBeforeRecord={runAnimation} /> */}
      {/* <CanvasCapturer onBeforeRecord={runAnimation} /> */}
      {/* <Canvas2VideoRecorder onBeforeRecord={runAnimation} /> */}
      {/* <CCapturer onBeforeRecord={runAnimation} /> */}
      {/* </div> */}
    </>
  );
}

export default App;
