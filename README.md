# fastQuest

## Ejecutar proyecto
- Ejecuete el archivo para crear el esquema de la base de datos
```bash
mysql -u {user} -p{password} {database} < resource/sql.sql
```
- Copie el archivo `.env.example` y cree un nuevo archivo `.env` y configure las variables de entorno
```bash
cp .env.example .env
```