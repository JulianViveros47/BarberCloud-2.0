# 💈 BarberCloud  
Plataforma moderna para la gestión de barberías — citas, agenda, productos, dashboard y experiencia del cliente.

BarberCloud es una aplicación web diseñada para mejorar la operación de barberías y ofrecer una experiencia más fluida tanto para clientes como para administradores.  
Incluye gestión de servicios, agendamientos, tienda virtual, autenticación, temas oscuro/claro y soporte multilenguaje.

Derechos:
Eider Julian Viveros Yace
Ricky Rhonaldo Ortega

---

## 🚀 Tecnologías Utilizadas
BarberCloud está construido con un stack moderno y basado en buenas prácticas:

### **Frontend**
- React + Vite
- TypeScript
- React Router DOM
- TailwindCSS
- shadcn/ui
- Lucide Icons
- i18next (internacionalización)
- Motion / Framer Motion (animaciones)
- React Query (manejo de estado asíncrono)

### **Backend**
- Spring Boot
- PostgreSQL
- API REST con JWT

---

## ✨ Características Principales

### 🧔 **Para Clientes**
- Registro e inicio de sesión
- Navegación simple y moderna
- Reserva de citas
- Tienda virtual con productos de barbería
- Perfil de usuario
- Tema claro/oscuro automático
- Selector de idioma

### 💼 **Para Administradores**
- Dashboard general
- Gestión de productos
- Gestión de servicios
- Gestión de empleados
- Control de citas y clientes
- Edición y deshabilitación de productos
- Registro de ventas de productos con historial

### 🎨 **Interfaz**
- Diseño clean y moderno
- Animaciones suaves
- Componentes reusables con shadcn/ui
- Totalmente responsive

---

## Demo local

Backend:

```bash
cd ../backend/barbercloud
./mvnw spring-boot:run
```

Frontend:

```bash
npm install
npm run dev
```

Variables de entorno:

```text
VITE_API_BASE_URL=http://localhost:8080/api
```

Usuario demo, cuando el backend inicia con seed activo:

- Email: `admin@barbercloud.test`
- Contrasena: `Admin123!`

Flujos utiles para probar:

- Login: `http://localhost:5173/login`
- Productos: `http://localhost:5173/register-products`
- Servicios: `http://localhost:5173/register-services`
- Nueva venta: `http://localhost:5173/shop-admin-barber`
- Historial de ventas: `http://localhost:5173/historical-sales`

Los datos demo quedan asociados a la barberia `BarberCloud Demo`, propiedad del usuario demo.


