![Portada Notify](repositoryImage.png)

# MANUAL INSTALACIÓN DETALLADO EN EL DOCUMENTO
*Estos pasos son recomendaciones. Se pueden cambiar las configuraciones que sean necesarias*

## INSTALAR PROGRAMAS:
- PYCHARM CON PYTHON
- NODEJS
- MYSQL COMMUNITY SERVER 

## EN MYSQL:
RECOMENDADO ASIGNAR PUERTO 3306 EN LA CONFIGURACIÓN DE LA INSTALACIÓN
RECOMENDADO ASIGNAR PUERTO @N0t1fyDB2024 EN LA CONFIGURACIÓN DE LA INSTALACIÓN
CREAR BD notifydb

## EN LA CARPETA NOTIFY-CLIENT, EJECUTAR COMANDO:
```
npm install
npm run dev
```

## EN LA CARPETA NOTIFY-API, EJECUTAR COMANDO:
```
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```