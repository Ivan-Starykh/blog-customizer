import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { OptionType } from '../select/Option';
import { RadioGroup } from '../radio-group';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Separator } from '../separator';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	handleToggleSidebar: () => void;
	applyPageState: (newState: any) => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	applyPageState,
}) => {
	const sidebarRef = useRef<HTMLElement>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [tempOptions, setTempOptions] = useState({
		fontFamily: fontFamilyOptions[0],
		fontSize: fontSizeOptions[0],
		fontColor: fontColors[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
	});

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleOptionChange = useCallback(
		(optionName: string, option: OptionType) => {
			setTempOptions((prevOptions) => ({
				...prevOptions,
				[optionName]: option,
			}));
		},
		[]
	);

	const handleApplyChanges = useCallback(() => {
		applyPageState(tempOptions);
	}, [applyPageState, tempOptions]);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const resetForm = useCallback(() => {
		setTempOptions({
			fontFamily: fontFamilyOptions[0],
			fontSize: fontSizeOptions[0],
			fontColor: fontColors[0],
			backgroundColor: backgroundColors[0],
			contentWidth: contentWidthArr[0],
		});
	}, []);

	return (
		<>
			<ArrowButton onClick={toggleSidebar} isOpen={isSidebarOpen} />
			<aside
				className={`${styles.container} ${
					isSidebarOpen ? styles.container_open : ''
				}`}
				ref={sidebarRef}>
				<form className={styles.form}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						selected={tempOptions.fontFamily}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						onChange={(option) => handleOptionChange('fontFamily', option)}
						title='шрифт'
					/>
					<RadioGroup
						name='radio'
						options={fontSizeOptions}
						selected={tempOptions.fontSize}
						onChange={(option) => handleOptionChange('fontSize', option)}
						title='размер шрифта'
					/>
					<Select
						selected={tempOptions.fontColor}
						options={fontColors}
						placeholder='Выберите цвет шрифта'
						onChange={(option) => handleOptionChange('fontColor', option)}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={tempOptions.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет фона'
						onChange={(option) => handleOptionChange('backgroundColor', option)}
						title={'цвет фона'}
					/>
					<Select
						selected={tempOptions.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину контента'
						onChange={(option) => handleOptionChange('contentWidth', option)}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetForm} />
						<Button
							title='Применить'
							type='button'
							onClick={handleApplyChanges}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
