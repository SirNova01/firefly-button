import React, { useEffect, useRef } from 'react';
import Kinet from 'kinet';
import './App.css';
import './tailwind.css';

const KinetCircle = () => {
  const circleRef = useRef(null);

  useEffect(() => {
    const kinet = new Kinet({
      acceleration: 0.02,
      friction: 0.25,
      names: ["x", "y"],
    });

    const circle = circleRef.current;

    const onTick = (instances) => {
      circle.style.transform = `translate3d(${instances.x.current}px, ${instances.y.current}px, 0) rotateX(${instances.x.velocity / 2}deg) rotateY(${instances.y.velocity / 2}deg)`;
    };

    const onMouseMove = (event) => {
      kinet.animate('x', event.clientX - window.innerWidth / 2);
      kinet.animate('y', event.clientY - window.innerHeight / 2);
    };

    kinet.on('tick', onTick);

    document.addEventListener('mousemove', onMouseMove);

    kinet.on('start', () => {
      console.log('start');
    });

    kinet.on('end', () => {
      console.log('end');
    });

    // Clean up event listeners and Kinet instance on unmount
    return () => {
      kinet.off('tick', onTick);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <a className="button-wrapper">
        <span className="dot dot-1"></span>
        <span className="dot dot-2"></span>
        <span className="dot dot-3"></span>
        <span className="dot dot-4"></span>
        <span className="dot dot-5"></span>
        <span className="dot dot-6"></span>
        <span className="dot dot-7"></span>
        <span className="button bg-yellow-500 px-16 py-4 rounded-full uppercase">
          Button
        </span>
      </a>
      <div id="circle" className="circle bg-yellow-500" ref={circleRef}></div>
    </>
  );
};

export default KinetCircle;
