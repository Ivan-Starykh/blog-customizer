import React, { useState, useRef, CSSProperties } from 'react';
import clsx from 'clsx';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form';
import { OptionType, defaultArticleState } from '../../constants/articleProps';
import { ArrowButton } from '../arrow-button';
import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [pageState, setPageState] = useState(defaultArticleState);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleToggleSidebar = () => {
		setIsOpen(!isOpen);
		console.log('handleToggleSidebar called');
	};

	const applyPageState = (
		newState: React.SetStateAction<{
			fontFamilyOption: OptionType;
			fontColor: OptionType;
			backgroundColor: OptionType;
			contentWidth: OptionType;
			fontSizeOption: OptionType;
		}>
	) => {
		setPageState(newState);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamilyOption?.value,
					'--font-size': pageState.fontSizeOption?.value,
					'--font-color': pageState.fontColor?.value,
					'--container-width': pageState.contentWidth?.value,
					'--bg-color': pageState.backgroundColor?.value,
				} as CSSProperties
			}>
			<ArrowButton onClick={handleToggleSidebar} isOpen={isOpen} />
			<div ref={containerRef}>
				<ArticleParamsForm
					isOpen={isOpen}
					handleToggleSidebar={handleToggleSidebar}
					applyPageState={applyPageState}
				/>
			</div>
			<Article />
		</div>
	);
};
