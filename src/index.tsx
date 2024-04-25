import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { OptionType, defaultArticleState } from './constants/articleProps';
import { ArrowButton } from './components/arrow-button/ArrowButton';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageState, setPageState] = useState(defaultArticleState); // Состояние страницы

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Функция для применения нового состояния страницы
  const applyPageState = (newState: React.SetStateAction<{ fontFamilyOption: OptionType; fontColor: OptionType; backgroundColor: OptionType; contentWidth: OptionType; fontSizeOption: OptionType; }>) => {
    setPageState(newState);
  };

  return (
    <div
      className={clsx(styles.main)}
      style={{
        '--font-family': pageState.fontFamilyOption.value,
        '--font-size': pageState.fontSizeOption.value,
        '--font-color': pageState.fontColor.value,
        '--container-width': pageState.contentWidth.value,
        '--bg-color': pageState.backgroundColor.value,
      } as CSSProperties}
    >
      <ArrowButton onClick={handleToggleSidebar} />
      {/* Передача функции для применения нового состояния */}
      <ArticleParamsForm isOpen={isOpen} handleToggleSidebar={handleToggleSidebar} applyPageState={applyPageState} />
      <Article />
    </div>
  );
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
