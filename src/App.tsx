import { SpeedInsights } from '@vercel/speed-insights/react';

import { Routes } from './Routes';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <>
      <SpeedInsights />
      <Toaster />
      <Routes />
    </>
  );
}

export default App;
