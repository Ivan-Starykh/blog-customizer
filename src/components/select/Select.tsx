import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import arrowDown from 'src/images/arrow-down.svg';
import { Option } from './Option';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterSubmit } from './hooks/useEnterSubmit';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { FontFamiliesClasses } from 'src/constants/articleProps';
import styles from './Select.module.scss';

type SelectProps = {
  selected: OptionType | null;
  options: OptionType[];
  placeholder?: string;
  onChange?: (selected: OptionType) => void;
  onClose?: () => void;
  title?: string;
	fontFamilies?: FontFamiliesClasses[];
};

export const Select = (props: SelectProps) => {
  const {
    options,
    placeholder,
    selected,
    onChange,
    onClose,
    title,
    fontFamilies,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen,
    rootRef,
    onClose,
    onChange: () => setIsOpen(false),
  });

	useEnterSubmit({
    placeholderRef,
    onChange: setIsOpen,
  });

	const handlePlaceHolderClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleOptionClick = (option: OptionType) => {
    setIsOpen(false);
    onChange?.(option);
  };

	return (
    <div className={styles.container}>
      {title && (
        <>
          <Text size={12} weight={800} uppercase>
            {title}
          </Text>
        </>
      )}
      <div
        className={styles.selectWrapper}
        ref={rootRef}
        data-is-active={isOpen}
        data-testid="selectWrapper"
      >
        <img
          src={arrowDown}
          alt="иконка стрелочки"
          className={styles.arrow}
        />
        <div
          className={styles.placeholder}
          data-status=""
          data-selected={!!selected?.value}
          onClick={handlePlaceHolderClick}
          role="button"
          tabIndex={0}
          ref={placeholderRef}
        >
          <Text family={isFontFamilyClass(selected?.className) ? selected?.className : undefined}>
            {selected?.title || placeholder}
          </Text>
        </div>
        {isOpen && (
          <ul className={styles.select} data-testid="selectDropdown">
            {options.map((option) => (
              <Option
                key={option.value}
                option={option}
                onClick={() => handleOptionClick(option)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
