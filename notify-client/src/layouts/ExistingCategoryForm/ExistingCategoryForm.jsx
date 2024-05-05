import React, { useEffect, useRef, useState, useContext } from 'react';
import { GeneralContext } from '../../config/generalContext';
import * as CategoriesService from '../../services/categoriesService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCheck, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './ExistingCategoryForm.module.scss'
import colors from '../../data/colors.json'

export default function NoteRead(props) {
	const { isDarkMode } = useContext(GeneralContext);

	const [ editMode, setEditMode ] = useState(false);
	const [ originalCategory, setOriginalCategory ] = useState(props.category);
	const [ category, setCategory ] = useState(originalCategory);

	const categoryHeaderDiv = useRef(null);
	const categoryTextArea = useRef(null);

	useEffect(() => {
		autosizingAndScrolling()
	});

	const handleInputChange = (e) => {
		const property = e.target.name;
		const value = e.target.value;

		setCategory({...category, [property]: value});
	}

	const handleEdit = (e) => {
		e.preventDefault();
		setEditMode(!editMode);
	}

	const handleDelete = async (e) => {
		e.preventDefault();
		if (props.category.id !== undefined) {
			if (window.confirm("¿Estás seguro de eliminar esta nota? No se podrá recuperar una vez eliminada.") === true) {
				await CategoriesService.deleteCategory(props.category.id);
				props.listCategories();
			}
		}
	}

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const res = await CategoriesService.putCategory(category);
			await res.json();
			setOriginalCategory(category);
			props.listCategories();
		} catch (err) {
			console.log(err);
		}
		setEditMode(!editMode);
	}

	const handleUndo = (e) => {
		e.preventDefault();
		setCategory({...category, "name": originalCategory.name, "info": originalCategory.info});
		setEditMode(!editMode);
	}
	
	const autosizingAndScrolling = () => {
		if (categoryTextArea.current !== null) {	
			categoryTextArea.current.style.height = "auto";
			categoryTextArea.current.style.height = categoryTextArea.current.scrollHeight + "px";

			if (parseInt(categoryTextArea.current.style.getPropertyValue('height')) >= 300 ) {
				categoryTextArea.current.style.overflow = "visible";
			}
		}
	}

	return (
		<form className={`${styles.category}${isDarkMode ? ` ${styles.darkMode}` : ''}`} action="">
			<div className={`${styles.categoryHeader}${isDarkMode ? ` ${styles.darkMode}` : ''}`} ref={categoryHeaderDiv}>
				<input className={`${styles.name}${editMode ? ` ${styles.editMode}` : ''}`} type="text" name="name" value={category.name} onChange={handleInputChange} disabled={!editMode} maxLength={40}></input>
				<div className={`${styles.categoryButtons}${editMode ? ` ${styles.editMode}` : ''}`}>
					<button className={`${styles.edit}`} onClick={handleEdit}><FontAwesomeIcon icon={faPen} /></button>
					<button className={`${styles.delete}`} onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></button>
				</div>
				<div className={`${styles.categoryButtonsEdit}${editMode ? ` ${styles.editMode}` : ''}`}>
					<button className={`${styles.update}`} onClick={handleUpdate}><FontAwesomeIcon icon={faCheck} /></button>
					<button className={`${styles.undo}`} onClick={handleUndo}><FontAwesomeIcon icon={faRotateLeft} /></button>
				</div>
			</div>
			<div className={`${styles.categoryBody}`}>
				<textarea className={`${styles.info}${editMode ? ` ${styles.editMode}` : ''}`} ref={categoryTextArea} name="info" value={category.info} onChange={handleInputChange} disabled={!editMode}></textarea>
				<hr className={`${styles.separator}`} />
			</div>
			<div className={`${styles.categoryFooter}`}>
				<select className={`${styles.colors}${editMode ? ` ${styles.editMode}` : ''}`} name="color_id" defaultValue={category.color_id} onChange={handleInputChange} disabled={!editMode}>
					<option key={0} value={0}></option>
					{colors.map((color) => (
						<option key={color.id} value={color.id}>{color.name}</option>
					))}
				</select>
			</div>
		</form>
	)
}
