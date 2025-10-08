````markdown
<h1 align="center">🛒 Inventory Management System</h1>

<p align="center">
  <b>Gestión inteligente de inventario con autenticación JWT, generación de PDFs, correos automáticos y control de stock.</b><br/>
  <sub>Desarrollado con <b>Next.js + MongoDB + Node.js</b></sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens"/>
</p>

---

## ✨ Características Principales

✅ **Inicio de sesión seguro** con autenticación basada en JWT  
🧾 **Generación automática de PDFs** a partir de plantillas HTML usando Puppeteer  
📧 **Recuperación de contraseña** con enlaces enviados por correo  
📦 **Gestión completa de productos** (crear, listar, editar, eliminar)  
💰 **Módulo de ventas** con actualización automática de stock  
🧠 **Arquitectura limpia** basada en servicios y controladores independientes  

---

## 🧩 Tecnologías Usadas

| 💡 Tecnología | 🔍 Descripción |
|---------------|----------------|
| **dotenv** | Manejo de variables de entorno |
| **mongodb** | Base de datos NoSQL para usuarios y productos |
| **puppeteer** | Generación de PDF desde HTML |
| **nodemailer** | Envío de correos electrónicos |
| **jsonwebtoken (JWT)** | Autenticación segura |
| **Font Awesome** | Iconos visuales para la UI |

### 📦 Instalación de dependencias

```bash
npm install dotenv mongodb puppeteer nodemailer jsonwebtoken
npm install @fortawesome/fontawesome-free
npm install @fortawesome/react-fontawesome @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons
````

---

## 🗂️ Estructura del Proyecto

```bash
src/
 ├── lib/
 │   └── db.js                  # Conexión con MongoDB Atlas
 │
 ├── services/
 │   ├── auth.service.js        # Autenticación y permisos de usuario
 │   ├── behavior.service.js    # Comportamiento de productos
 │   ├── email.service.js       # Envío de correos electrónicos
 │   ├── pdf.service.js         # Generación de PDF
 │   ├── product.service.js     # CRUD de productos
 │   └── venta.service.js       # Ventas y actualización de stock
 │
 └── app/api/
      ├── Auth/
      │   ├── route.js          # Login de usuario (POST)
      │   └── setPass/route.js  # Recuperación de contraseña (PUT)
      │
      ├── email/
      │   └── route.js          # Envío de correo de recuperación
      │
      ├── PDF/
      │   └── route.js          # Generación de PDF desde HTML
      │
      ├── Product/
      │   ├── route.js          # Crear/Listar productos (POST/GET)
      │   └── [id]/route.js     # Editar/Eliminar productos (PUT/DELETE)
      │
      └── sale/
          └── [id]/route.js     # Registrar venta y actualizar stock (POST)
```

---

## ⚙️ Configuración del Entorno

Crea un archivo **`.env.local`** en la raíz del proyecto con tus credenciales:

```bash
MONGO_URI=tu_uri_de_mongo
JWT_SECRET=clave_super_secreta
JWT_EXPIRESS_IN=1h
GOOGLE_USER=tu_correo@gmail.com
GOOGLE_PWD=tu_token_o_contraseña
JWT_RESET_SECRET=clave_super_secreta
JWT_RESET_EXPIRESS_IN=15m
```

---

## 🔐 Seguridad y Autenticación

Cada sesión de usuario se gestiona con un **JSON Web Token (JWT)** almacenado en cookies `HttpOnly`, lo que impide el acceso desde el frontend.
El flujo de autenticación incluye:

1. 🔑 Inicio de sesión → se genera el token.
2. 🍪 Cookie segura → se guarda `access_token` en el navegador.
3. 🔍 Validación → las rutas protegidas verifican el token antes de continuar.
4. ⏱️ Expiración → el token caduca según `JWT_EXPIRESS_IN`.

---

## 🧾 Generación de PDFs

El módulo usa **Puppeteer** para crear archivos PDF profesionales desde contenido HTML dinámico.
Ejemplo: reportes de ventas, listados de productos, o comprobantes de compra.

```js
import puppeteer from "puppeteer";

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setContent("<h1>Reporte de Inventario</h1>");
await page.pdf({ path: "reporte.pdf", format: "A4" });
await browser.close();
```

---

## 📨 Envío de Correos

El sistema usa **Nodemailer** para enviar mensajes personalizados, incluyendo enlaces temporales de recuperación de contraseña.

Ejemplo:

```js
await transporter.sendMail({
  from: "Inventario <no-reply@inventario.com>",
  to: "usuario@gmail.com",
  subject: "Recupera tu contraseña",
  html: `<a href="https://miapp.com/newPass?token=XYZ">Restablecer contraseña</a>`
});
```

---


## 👨‍💻 Autor

**Cristian Valderrama**
💻 Desarrollador Full Stack
📧 [cristianvalderrama1014@gmail.com](mailto:cristianvalderrama1014@gmail.com)
🌐 [GitHub Profile](https://github.com/tu-usuario)



