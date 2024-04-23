import React, { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { OptionType } from '../select/Option';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group';
import { fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';

type ArticleParamsFormProps = {
  isOpen: boolean;
  handleToggleSidebar: () => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({ isOpen, handleToggleSidebar }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowButtonRef = useRef<HTMLDivElement>(null);
  const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(fontFamilyOptions[0]);
  const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(fontSizeOptions[0]);

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
      <div ref={arrowButtonRef}><ArrowButton onClick={handleToggleSidebar} /></div>
      <aside className={`${styles.container} ${isOpen ? styles.container_open : ''}`} ref={containerRef}>
        <form className={styles.form}>
          <h2 className={styles.title}>Задайте параметры</h2>
          <Select
            selected={selectedFontFamily}
            options={fontFamilyOptions}
            placeholder="Выберите шрифт"
            onChange={(option) => setSelectedFontFamily(option)}
            title="Выберите шрифт"
          />
          <RadioGroup
					name='radio'
            options={fontSizeOptions}
            selected={selectedFontSize}
            onChange={(option) => setSelectedFontSize(option)}
            title="Выберите размер шрифта"
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" type="reset" />
            <Button title="Применить" type="submit" />
          </div>
        </form>
      </aside>
    </>
  );
};
