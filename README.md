# 📦 Backend de Gestión de Pedidos

## 📄 Documentación en Postman
La colección completa con ejemplos de requests y responses está disponible en el siguiente enlace:  
👉 [Ver colección en Postman](https://documenter.getpostman.com/view/51906927/2sBXc8q4VZ)

---

## 📘 Reglas de negocio implementadas

### Creación de pedido
- Todo pedido nuevo inicia en estado `"pendiente"`.
- No se permite crear pedidos con cantidad menor o igual a 0.

### Cambio de estado
- Un pedido `"pendiente"` puede pasar a `"confirmado"` o `"cancelado"`.
- Pedidos `"confirmado"` o `"cancelado"` no pueden modificarse.

### Eliminación
- Solo se pueden eliminar pedidos en estado `"pendiente"`.
- Intentar eliminar pedidos `"confirmado"` o `"cancelado"` devuelve error 400.

---

## 📂 Ubicación de las reglas
- **Controllers** (`/controllers/pedidos.controller.js`)  
  Aquí viven las reglas de negocio y validaciones. El controlador decide qué acciones son válidas y qué códigos HTTP devolver.

- **Repositories** (`/repositories/pedidos.repository.js`)  
  Encapsula el almacenamiento en memoria y las operaciones CRUD básicas. No contiene reglas de negocio, solo gestiona datos.

- **Routes** (`/routes/pedidos.routes.js`)  
  Define los endpoints y redirige las solicitudes al controlador.

---

## 🧠 Decisiones tomadas
- Las reglas de negocio se implementaron en el **controller**, porque ahí se valida la lógica antes de modificar los datos y se decide la respuesta HTTP adecuada.  
- El **repository** se mantiene limpio y enfocado en el almacenamiento, lo que facilita cambios futuros en las reglas sin alterar la capa de datos.  
- Esta separación asegura una arquitectura clara, evaluable y alineada con buenas prácticas de desarrollo backend.

---

## 📌 Conclusión
Este backend demuestra cómo aplicar reglas de negocio reales en un sistema CRUD, garantizando integridad de datos y control de estados.  
La arquitectura modular y el uso de POO permiten un código mantenible, evaluable y profesional.

---

## ⚙️ Inicialización del proyecto

### 1. Clonar el repositorio
Ejecuta en tu terminal:
```bash
git clone https://github.com/Fernando-Nun/Actividad_3_Full_Stack.git
```
### 2. Instalar dependencias Dentro de la carpeta del proyecto: 
```bash
cd Actividad_3_Full_Stack
npm install
```
**Nota:** Descarga la dependencia de desarrollador de nodemon con el siguiente código en la terminal:
```bash
npm install --save-dev- nodemon
```
## 3. Ejecutar el servidor 
Inicia el backend con: 
```bash
npm run dev
```
El servidor se levantará en `http://localhost:3000`.

## 🗂️ Notas
- Se incluye un archivo `.gitignore` para excluir `node_modules` y otros archivos innecesarios del repositorio.  
- El proyecto utiliza **almacenamiento en memoria**, por lo que los datos se reinician cada vez que se reinicia el servidor.

