import React from 'react';
import wave1 from '/assets/images/wave-separator-1.png';
import wave2 from '/assets/images/wave-separator-2.png';
import wave3 from '/assets/images/wave-separator-3.png';

const WaveSeparator = () => {
  return (

    <div className="relative w-full h-[20vh] md:h-[5vh]">
      {/* wave-separator-3 (backmost layer, adjusted z-index) */}
      <img
        src={wave3}
        alt="Wave Separator Layer 3"
        className="absolute bottom-[2rem] w-full h-[50vh] object-cover object-top z-1"
      />
      {/* wave-separator-2 (middle layer, adjusted z-index) */}
      <img
        src={wave2}
        alt="Wave Separator Layer 2"
        className="absolute bottom-[-3rem] w-full h-[40vh] object-cover object-top z-2"
      />
      {/* wave-separator-1 (frontmost layer, adjusted z-index) */}
      <img
        src={wave1}
        alt="Wave Separator Layer 1"
        className="absolute bottom-[-3rem] left-0 w-full h-[50vh] object-cover object-top z-3"
      />
    </div>
  );
};

export default WaveSeparator;