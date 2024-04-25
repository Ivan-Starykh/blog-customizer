import React, { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { OptionType } from '../select/Option';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group';
import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, defaultArticleState } from 'src/constants/articleProps';
import { Separator } from '../separator';


type ArticleParamsFormProps = {
  isOpen: boolean;
  handleToggleSidebar: () => void;
  applyPageState: (newState: any) => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({ isOpen, handleToggleSidebar, applyPageState }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowButtonRef = useRef<HTMLDivElement>(null);
  const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(fontFamilyOptions[0]);
  const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(fontSizeOptions[0]);
  const [selectedFontColors, setSelectedFontColors] = useState<OptionType>(fontColors[0]);
  const [selectedBackgroundColors, setSelectedBackgroundColors] = useState<OptionType>(backgroundColors[0]);
  const [selectedContentWidthArr, setSelectedContentWidthArr] = useState<OptionType>(contentWidthArr[0]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node) && !arrowButtonRef.current?.contains(event.target as Node) && event.target instanceof HTMLElement && event.target.nodeName !== 'LI') {
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

  const resetForm = () => {
    setSelectedFontFamily(fontFamilyOptions[0]);
    setSelectedFontSize(fontSizeOptions[0]);
    setSelectedFontColors(fontColors[0]);
    setSelectedBackgroundColors(backgroundColors[0]);
    setSelectedContentWidthArr(contentWidthArr[0]);
    applyPageState(defaultArticleState);
  };

  const handleFontFamilyChange = (option: OptionType) => {
    setSelectedFontFamily(option);
    applyPageState({ ...defaultArticleState, fontFamilyOption: option });
  };

  const handleFontSizeChange = (option: OptionType) => {
    setSelectedFontSize(option);
    applyPageState({ ...defaultArticleState, fontSizeOption: option });
  };

  const handleFontColorChange = (option: OptionType) => {
    setSelectedFontColors(option);
    applyPageState({ ...defaultArticleState, fontColor: option });
  };

  const handleBackgroundColorChange = (option: OptionType) => {
    setSelectedBackgroundColors(option);
    applyPageState({ ...defaultArticleState, backgroundColor: option });
  };

  const handleContentWidthChange = (option: OptionType) => {
    setSelectedContentWidthArr(option);
    applyPageState({ ...defaultArticleState, contentWidth: option });
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
            selected={selectedFontFamily}
            options={fontFamilyOptions}
            placeholder="Выберите шрифт"
            onChange={handleFontFamilyChange}
            title="шрифт"
          />
          <RadioGroup
            name="radio"
            options={fontSizeOptions}
            selected={selectedFontSize}
            onChange={handleFontSizeChange}
            title="размер шрифта"
          />
          <Select
            selected={selectedFontColors}
            options={fontColors}
            placeholder="Выберите цвет шрифта"
            onChange={handleFontColorChange}
            title="цвет шрифта"
          />
          <Separator />
          <Select
            selected={selectedBackgroundColors}
            options={backgroundColors}
            placeholder="Выберите цвет фона"
            onChange={handleBackgroundColorChange}
            title="цвет фона"
          />
          <Select
            selected={selectedContentWidthArr}
            options={contentWidthArr}
            placeholder="Выберите ширину контента"
            onChange={handleContentWidthChange}
            title="ширина контента"
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" type="reset" onClick={resetForm} />
            <Button title="Применить" type="submit" />
          </div>
        </form>
      </aside>
    </>
  );
};
