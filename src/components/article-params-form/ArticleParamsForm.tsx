import React, { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { OptionType } from '../select/Option';
import { RadioGroup } from '../radio-group';
import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps';
import { Separator } from '../separator';
import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
  isOpen: boolean;
  handleToggleSidebar: () => void;
  applyPageState: (newState: any) => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
  isOpen,
  handleToggleSidebar,
  applyPageState
}) => {
  const sidebarRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
				setIsSidebarOpen(false);
			}
		};
	
		document.addEventListener('mousedown', handleClickOutside);
	
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	
  const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(fontFamilyOptions[0]);
  const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(fontSizeOptions[0]);
  const [selectedFontColors, setSelectedFontColors] = useState<OptionType>(fontColors[0]);
  const [selectedBackgroundColors, setSelectedBackgroundColors] = useState<OptionType>(backgroundColors[0]);
  const [selectedContentWidthArr, setSelectedContentWidthArr] = useState<OptionType>(contentWidthArr[0]);

  const [tempFontFamily, setTempFontFamily] = useState<OptionType>(fontFamilyOptions[0]);
  const [tempFontSize, setTempFontSize] = useState<OptionType>(fontSizeOptions[0]);
  const [tempFontColors, setTempFontColors] = useState<OptionType>(fontColors[0]);
  const [tempBackgroundColors, setTempBackgroundColors] = useState<OptionType>(backgroundColors[0]);
  const [tempContentWidthArr, setTempContentWidthArr] = useState<OptionType>(contentWidthArr[0]);

  const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
				};

  const resetForm = () => {
    setTempFontFamily(fontFamilyOptions[0]);
    setTempFontSize(fontSizeOptions[0]);
    setTempFontColors(fontColors[0]);
    setTempBackgroundColors(backgroundColors[0]);
    setTempContentWidthArr(contentWidthArr[0]);
  };

  const handleFontFamilyChange = (option: OptionType) => {
    setTempFontFamily(option);
  };

  const handleFontSizeChange = (option: OptionType) => {
    setTempFontSize(option);
  };

  const handleFontColorChange = (option: OptionType) => {
    setTempFontColors(option);
  };

  const handleBackgroundColorChange = (option: OptionType) => {
    setTempBackgroundColors(option);
  };

  const handleContentWidthChange = (option: OptionType) => {
    setTempContentWidthArr(option);
  };

  const handleApplyChanges = () => {
    applyPageState({
      fontFamilyOption: tempFontFamily,
      fontSizeOption: tempFontSize,
      fontColor: tempFontColors,
      backgroundColor: tempBackgroundColors,
      contentWidth: tempContentWidthArr
    });
    setSelectedFontFamily(tempFontFamily);
    setSelectedFontSize(tempFontSize);
    setSelectedFontColors(tempFontColors);
    setSelectedBackgroundColors(tempBackgroundColors);
    setSelectedContentWidthArr(tempContentWidthArr);
  };

  return (
    <>
      <ArrowButton onClick={toggleSidebar} isOpen={isSidebarOpen} />
      <aside className={`${styles.container} ${isSidebarOpen ? styles.container_open : ''}`} ref={sidebarRef}>
        <form className={styles.form} >
          <h2 className={styles.title}>Задайте параметры</h2>
          <Select
            selected={tempFontFamily}
            options={fontFamilyOptions}
            placeholder="Выберите шрифт"
            onChange={handleFontFamilyChange}
            title="шрифт"
          />
          <RadioGroup
            name="radio"
            options={fontSizeOptions}
            selected={tempFontSize}
            onChange={handleFontSizeChange}
            title="размер шрифта"
          />
          <Select
            selected={tempFontColors}
            options={fontColors}
            placeholder="Выберите цвет шрифта"
            onChange={handleFontColorChange}
            title="цвет шрифта"
          />
          <Separator />
          <Select
            selected={tempBackgroundColors}
            options={backgroundColors}
            placeholder="Выберите цвет фона"
            onChange={handleBackgroundColorChange}
            title={'цвет фона'}
          />
          <Select
            selected={tempContentWidthArr}
            options={contentWidthArr}
            placeholder="Выберите ширину контента"
            onChange={handleContentWidthChange}
            title="ширина контента"
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" type="reset" onClick={resetForm} />
            <Button title="Применить" type="button" onClick={handleApplyChanges} />
          </div>
        </form>
      </aside>
    </>
  );
};
