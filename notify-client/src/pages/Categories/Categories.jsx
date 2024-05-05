import React, { useContext, useState, useEffect } from 'react'
import { GeneralContext } from '../../config/generalContext';
import * as CategoriesService from '../../services/categoriesService';
import NewCategoryForm from '../../layouts/NewCategoryForm/NewCategoryForm';
import ExistingCategoryForm from '../../layouts/ExistingCategoryForm/ExistingCategoryForm';
import styles from './Categories.module.scss'

export default function Categories() {
  const { isDarkMode } = useContext(GeneralContext);
  
  const [categories, setCategories] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await fetchCategories()
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await CategoriesService.getCategories();
      const data = await res.json();

      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  
  if (categories === undefined) {
    return (
      <div className={`${styles.page}${isDarkMode ? ` ${styles.darkMode}` : ''}`}>
        <NewCategoryForm listCategories={fetchCategories}/>
      </div>
    )
  }

  return (
    <div className={`${styles.page}${isDarkMode ? ` ${styles.darkMode}` : ''}`}>
      <NewCategoryForm listCategories={fetchCategories}/>
      {categories.map((category) => (
        <ExistingCategoryForm key={category.id} category={category} listCategories={fetchCategories}/>
      ))}
    </div>
  )
}
