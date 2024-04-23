import React, { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { OptionType } from '../select/Option';
import styles from './ArticleParamsForm.module.scss';
import { FontFamiliesClasses } from 'src/constants/articleProps';

type ArticleParamsFormProps = {
  isOpen: boolean;
  handleToggleSidebar: () => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({ isOpen, handleToggleSidebar }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowButtonRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const fontFamilies: FontFamiliesClasses[] = [
    'open-sans',
    'ubuntu',
    'cormorant-garamond',
    'days-one',
    'merriweather',
  ];

  const handleChange = (option: OptionType) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !arrowButtonRef.current?.contains(event.target as Node)
      ) {
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
          <Select
            selected={selectedOption}
            options={fontFamilies.map((family) => ({
              title: family,
              value: family,
              className: family,
            }))}
            placeholder="Выберите опцию"
            onChange={handleChange}
            title="шрифт"
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
