import { MouseEvent, ReactNode, useRef, useState } from 'react';

export interface BentocardProps {
  src: string;
  title: ReactNode;
  description?: string;
}

export const Bentocard = ({ src, title, description }: BentocardProps) => {
  return (
    <div className='relative size-full'>
      <video
        src={src}
        loop
        muted
        autoPlay
        className='absolute left-0 top-0 size-full object-cover object-center'
      />

      <div className='relative z-10 flex size-full flex-col justify-between p-5 text-blue-50'>
        <div>
          <h1 className='bento-title'>{title}</h1>

          {description && (
            <p className='mt-3 max-w-64 text-xs md:text-base'>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const BentoTilt = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [transformStyle, setTransformStyle] = useState('');
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    // Getting the position of the mouse in the element to calculate the tilt
    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    // Calculating the tilt to apply to the element
    const tiltX = (y - 0.5) * 5;
    const tiltY = (x - 0.5) * -5;

    const transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;

    setTransformStyle(transform);
  };

  const handleMouseLeave = () => {
    setTransformStyle('');
  };

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
