import React, { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  isOpen: boolean;
  handleToggleSidebar: () => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({ isOpen, handleToggleSidebar }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node) && !arrowButtonRef.current?.contains(event.target as Node)) {
        if (isOpen) {
          handleToggleSidebar();
        }
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, handleToggleSidebar]);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <>
      <div ref={arrowButtonRef}>
        <ArrowButton onClick={handleToggleSidebar} />
      </div>
      <aside className={`${styles.container} ${isOpen ? styles.container_open : ''}`} ref={containerRef}>
        <form className={styles.form}>
					<h2 className={styles.title}>Задайте параметры</h2>
          <div className={styles.bottomContainer}>
            <Button title='Сбросить' type='reset' />
            <Button title='Применить' type='submit' />
          </div>
        </form>
      </aside>
    </>
  );
};
