import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface AnimatedTitleProps {
  title: string;
  className?: string;
  id?: string;
}

export const AnimatedTitle = ({ title, className, id }: AnimatedTitleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '100 bottom',
          end: 'center bottom',
          toggleActions: 'play none none reverse',
        },
      });

      titleAnimation.to('.animated-word', {
        opacity: 1,
        transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)',
        ease: 'power2.inOut',
        stagger: 0.02,
      });
    }, containerRef);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id={id}
      className={twMerge('animated-title', className)}
    >
      {title.split('<br />').map((line, index) => (
        <div
          key={index}
          className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'
        >
          {line.split(' ').map((word, i) => (
            <span
              key={i}
              className='animated-word'
              dangerouslySetInnerHTML={{
                __html: word,
              }}
            ></span>
          ))}
        </div>
      ))}
    </div>
  );
};
