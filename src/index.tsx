import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { OptionType, defaultArticleState } from './constants/articleProps';
import { ArrowButton } from './components/arrow-button/ArrowButton';
import './styles/index.scss';
import styles from './styles/index.module.scss';
import { useOutsideClickClose } from './components/select/hooks/useOutsideClickClose';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageState, setPageState] = useState(defaultArticleState);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
    console.log("handleToggleSidebar called");
  };

  const applyPageState = (newState: React.SetStateAction<{ fontFamilyOption: OptionType; fontColor: OptionType; backgroundColor: OptionType; contentWidth: OptionType; fontSizeOption: OptionType }>) => {
    setPageState(newState);
  };

  // Используем useOutsideClickClose с отдельными параметрами onClose и onChange
  useOutsideClickClose(containerRef, () => setIsOpen(false));

  return (
    <div className={clsx(styles.main)} style={{
      '--font-family': pageState.fontFamilyOption.value,
      '--font-size': pageState.fontSizeOption.value,
      '--font-color': pageState.fontColor.value,
      '--container-width': pageState.contentWidth.value,
      '--bg-color': pageState.backgroundColor.value,
    } as CSSProperties}>
      <ArrowButton onClick={handleToggleSidebar} isOpen={isOpen} />
      <div ref={containerRef}>
        <ArticleParamsForm isOpen={isOpen} handleToggleSidebar={handleToggleSidebar} applyPageState={applyPageState} />
      </div>
      <Article />
    </div>
  );
};

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
