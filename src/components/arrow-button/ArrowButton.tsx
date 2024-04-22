import React, { useState, useEffect, useRef } from 'react';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

export type ArrowButtonProps = {
  onClick: () => void;
};

export const ArrowButton: React.FC<ArrowButtonProps> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        const sidebar = sidebarRef.current;
        if (sidebar && !sidebar.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleClick = () => {
    setIsOpen(!isOpen);
    onClick();
  };

  return (
    <div ref={sidebarRef}>
      <div
        role='button'
        aria-label='Открыть/Закрыть форму параметров статьи'
        tabIndex={0}
        className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
        onClick={handleClick}
        ref={buttonRef}
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
