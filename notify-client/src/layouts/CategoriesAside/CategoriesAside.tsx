import React, { useContext, useState } from 'react';
import { GeneralContext } from '../../config/generalContext';
import Category from '../../models/category';
import styles from './CategoriesAside.module.scss';

interface Props {
	categories: Category[];
	selectCategory: (categoria:number) => void;
}

export default function NoteForm(props : Props) {
	const [ categories ] = useState<Category[]>(props.categories);
	const { isDarkMode } = useContext(GeneralContext);

	return (
		<ul className={`${styles.categories}${isDarkMode ? ` ${styles.darkMode}` : ''}`}>
			<li key={0} className={`${styles.categoryItem}`} onClick={() => props.selectCategory(0)}><span>All</span></li>
			{categories.map((category) => (
				<li key={category.id} className={`${styles.categoryItem}`} onClick={() => props.selectCategory(category.id)}><span>{category.name}</span></li>
			))}
		</ul>
  	)
}
