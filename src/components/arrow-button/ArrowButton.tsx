import React, { useState, useRef, useEffect } from 'react';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

export type ArrowButtonProps = {
  onClick: () => void;
};

export const ArrowButton: React.FC<ArrowButtonProps> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
    onClick();
  };

  return (
    <div ref={containerRef}>
      <div
        role='button'
        aria-label='Открыть/Закрыть форму параметров статьи'
        tabIndex={0}
        className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
        onClick={handleClick}
      >
        <img
          src={arrow}
          alt='иконка стрелочки'
          className={`${styles.arrow} ${isOpen ? styles.arrow_open : ''}`}
        />
      </div>
    </div>
  );
};
