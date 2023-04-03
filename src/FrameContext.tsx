import React, { createContext, useContext, useState } from 'react';

interface FrameContextData {
  value: any;
  setNumFrames: (numFrames: any) => void;
}

const FrameContext = createContext<FrameContextData | undefined>(undefined);

interface Props {
  children?: React.ReactNode;
}

export const FrameProvider: React.FC<Props> = ({ children }) => {
  const [value, setValue] = useState(0);

  const setNumFrames = (numFrames: number) => {
    setValue(numFrames);
  };

  return (
    <FrameContext.Provider value={{ value, setNumFrames }}>
      {children}
    </FrameContext.Provider>
  );
};

export const useFrame = (): FrameContextData => {
  const context = useContext(FrameContext);
  if (!context) {
    throw new Error('useFrame must be used within a FrameProvider');
  }
  return context;
};