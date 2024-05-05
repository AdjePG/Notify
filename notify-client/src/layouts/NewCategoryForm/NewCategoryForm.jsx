import React, { useEffect, useContext, useRef, useState } from 'react';
import * as CategoriesService from '../../services/categoriesService';
import Category from '../../models/category';
import { GeneralContext } from '../../config/generalContext';
import styles from './NewCategoryForm.module.scss'
import colors from './../../data/colors.json'

export default function NoteForm(props) {
  	const { isDarkMode } = useContext(GeneralContext);

	const [ category, setCategory ] = useState(new Category());

	const messageTextArea = useRef(null);
	const colorBoxDiv = useRef(null);

	useEffect(() => {
		autosizingAndScrolling()
	});

	const handleInputChange = (e) => {
		let property
		let value

		property = e.target.name;

		if (property === "color_id") {
			value = e.target.options[e.target.selectedIndex].value === "" ? 0 : e.target.options[e.target.selectedIndex].value;
		} else {
			value = e.target.value === '' ? null : e.target.value;
		}
		
		setCategory({...category, [property]: value});
		
		if (property === "color_id") {
			changeColorBox(parseInt(e.target.value));
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setCategory(new Category(category.id, category.name, category.info, category.color_id));
			const res = await CategoriesService.postCategory(category);
			const data = await res.json();
			
			if (data.retcode === 0) {
				props.listCategories();
				alert('Categoria creada correctamente');
			}
			else
			{
				alert(data.message);
			}

		} catch (err) {
			console.log(err);
		}
	}

	const changeColorBox = (color_id) => {
		let color

		if (colorBoxDiv.current) {
			color = colors.find(color => color.id === color_id);
			if (color) {
				colorBoxDiv.current.style.background = `linear-gradient(to right, ${color.primary_code} 25%, ${color.secondary_code} 25%)`;
			}
		}
	}

	const autosizingAndScrolling = () => {
		if (messageTextArea.current !== null) {	
			messageTextArea.current.style.height = "auto";
			messageTextArea.current.style.height = messageTextArea.current.scrollHeight + "px";

			if (parseInt(messageTextArea.current.style.getPropertyValue('height')) >= 300 ) {
				messageTextArea.current.style.overflow = "visible";
			}
		}
	}

	return (
		<div className={`${styles.component}`}>
			<form className={`${styles.form}${isDarkMode ? ` ${styles.darkMode}` : ''}`} action="" onSubmit={handleSubmit}>
				<label className={`${styles.label}`}> Categoría:
					<input className={`${styles.name}`} type="text" name="name" onChange={handleInputChange}/>
				</label>
				<label className={`${styles.label}`}> Información (adicional):
					<textarea className={`${styles.info}`} name="info" ref={messageTextArea} onChange={handleInputChange}></textarea>
				</label>
				<label className={`${styles.label}`}> Color:
					<div className={`${styles.colorGroup}`}>					
						<select className={`${styles.colors}`} name="color_id" onChange={handleInputChange}>
							{colors.map((color) => (
								<option key={color.id} value={color.id}>{color.name}</option>
							))}
						</select>
						<div className={`${styles.colorBox}`} ref={colorBoxDiv}/>
					</div>
				</label>
				<button className={`${styles.submit}`} type="submit">Crear categoria</button>
			</form>
		</div>
	)
}
