import React, { useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  isOpen: boolean;
	handleToggleSidebar: () => void;
};

export const ArticleParamsForm = ({ isOpen, handleToggleSidebar }: ArticleParamsFormProps) => {
	 // Состояние для отслеживания открытия/закрытия панели
	const [isFormOpen, setIsFormOpen] = useState(false);

	 // Функция для открытия/закрытия панели
	const toggleForm = () => {
		setIsFormOpen(!isFormOpen);
	};

return (
    <>
      <ArrowButton onClick={handleToggleSidebar} />
      {/* Добавляем класс styles.open, если панель открыта */}
      <aside className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
        <form className={styles.form}>
          <div className={styles.bottomContainer}>
            <Button title='Сбросить' type='reset' />
            <Button title='Применить' type='submit' />
          </div>
        </form>
      </aside>
    </>
  );
};
