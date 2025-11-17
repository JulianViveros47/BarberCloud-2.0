import { Description } from '@radix-ui/react-toast';
import { add } from 'date-fns';
import i18n from 'i18next';
import { title } from 'process';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      nav: {
        home: "Inicio",
        features: "Características",
        contact: "Contacto",
        login: "Iniciar Sesión",
        register: "Registrar Barbería"
      },
      hero: {
        title: "En BarbeCloud puedes llevar tu barberia a otro nivel.",
        subtitle: "La plataforma completa que conecta barberías profesionales con clientes que buscan el mejor servicio. Gestiona tu negocio o encuentra tu estilo ideal.",
        explore: "Explora barberías",
        start: "Empieza ahora"
      },
      features: {
        client: {
          title: "¿Eres cliente de alguna barbería? Disfruta de estos beneficios:",
          schedule: {
            title: "Agendar citas",
            description: "Reserva tu cita en línea de forma fácil y rápida"
          },
          shop: {
            title: "Comprar productos",
            description: "Adquiere productos profesionales de tu barbería favorita"
          },
          reminders: {
            title: "Recordatorios automáticos",
            description: "Recibe notificaciones de tus próximas citas"
          },
          payments: {
            title: "Pagos en línea",
            description: "Paga de forma segura y conveniente"
          },
          mobile: {
            title: "Acceso desde tu teléfono",
            description: "Gestiona todo desde tu dispositivo móvil"
          },
          ratings: {
            title: "Calificaciones y reseñas",
            description: "Evalúa y comenta sobre los servicios recibidos"
          }
        },
        owner: {
          title: "¿Tienes tu propia barbería? Accede a estas ventajas:",
          sell: {
            title: "Vender productos",
            description: "Ofrece tus productos a todos tus clientes en línea"
          },
          calendar: {
            title: "Manejar el calendario",
            description: "Organiza las agendas de todos tus barberos"
          },
          showcase: {
            title: "Mostrar tu barbería",
            description: "Dale visibilidad a tu negocio y atrae nuevos clientes"
          },
          analytics: {
            title: "Analíticas del negocio",
            description: "Obtén estadísticas y mejora tu servicio"
          }
        }
      },
      login: {
        title: "Iniciar Sesión",
        subtitle: "Ingresa tus credenciales para acceder a tu cuenta",
        email: "Correo electrónico",
        password: "Contraseña",
        forgot: "¿Olvidaste tu contraseña?",
        submit: "Iniciar Sesión",
        google: "Iniciar sesión con Google",
        noAccount: "¿No tienes una cuenta?",
        registerLink: "Regístrate gratis"
      },
      register: {
        saveChanges: "Guardar Cambios",
        infoTitle: "Editar Información de la Barbería",
        infoDescription: "Revisa y edita la información de tu barbería",
        title: "Registrar Barbería",
        subtitle: "Completa el formulario para registrar tu barbería en BarberCloud",
        firstName: "Nombre",
        lastName: "Apellido",
        id: "Cédula",
        phone: "Teléfono del dueño",
        shopName: "Nombre de la barbería",
        descripcion: "Descripción",
        logo: "Logo",
        department: "Departamento",
        city: "Ciudad",
        address: "Dirección",
        primaryColor: "Color principal",
        secondaryColor: "Color secundario",
        submit: "Registrar barbería",
        hasAccount: "¿Ya tienes una cuenta?",
        loginLink: "Inicia sesión"
      },
      contact: {
        title: "Contáctanos",
        subtitle: "¿Tienes alguna pregunta? Estamos aquí para ayudarte",
        name: "Nombre",
        email: "Correo electrónico",
        message: "Mensaje",
        submit: "Enviar mensaje",
        phone: "Teléfono",
        support: "Correo de soporte"
      },
      footer: {
        product: "Producto",
        features: "Características",
        pricing: "Precios",
        company: "Empresa",
        about: "Sobre nosotros",
        contact: "Contacto",
        legal: "Legal",
        privacy: "Privacidad",
        terms: "Términos",
        rights: "© 2025 BarbeCloud. Todos los derechos reservados.",
        description :"La plataforma completa para barberías modernas y sus clientes."
      },
      navCustomer: {
        search: "Buscar tu barbería favorita...",
        department: "Departamento",
        selectDepartment: "Seleccionar departamento",
        city: "Ciudad",
        selectCity: "Seleccionar ciudad",
        profileTitle: "Perfil del usuario",
        logout: "Cerrar sesión",
      },
      heroCustomer: {
        title: "Barberías con Mejor Promedio",
        subtitle: "Descubre las barberías mejor calificadas por nuestra comunidad",
        button: "Explorar ahora",
        enter: "Ingresar",
      },
      ratings: {
        title: "Califica tu experiencia en esta barbería",
        subtitle: "Deja tu valoración y observación",
        ratingLabel: "Valoración",
        observation: "Observación",
        observationPlaceholder: "Escribe tu observación...",
        submit: "Enviar"
      },
      featuresAdminBarber: {
        title: "Administra tu barbería",
        barber: {
          title: "Agrega los barberos que trabajan contigo",
          description: "Podrás gestionar sus horarios y citas asignadas"
        },
        setBarber: {
          title: "Edita la información de tus barberos",
          description: "Actualiza los datos de contacto y especialidades"
        },
        product: {
          title: "Agrega y vende productos",
          description: "Podras agregar productos para que tus clientes los compren en línea"
        },
        setProduct: {
          title: "Edita la información de tus productos",
          description: "Actualiza los precios y descripciones de los productos"
        },
        showcase: {
          title: "Modifica la informacion de tu barbería",
          description: "Actualiza la descripción, dirección y colores de tu barbería"
        },
        historical: {
          title: "Historial de ventas",
          description: "Revisa el historial de ventas realizadas en tu barbería"
        },
        store:{
          title: "Mi tienda",
          description: "Asi se ve tu tienda para tus clientes"
        },
        ratings:{
          title: "Reseñas de clientes",
          description: "Estas son las reseñas que han dejado tus clientes"
        }
      },
      shop:{
        addToCart: "Agregar al carrito",
        colorsAvailable: "Colores disponibles",
        description: "Descripción",
        cart: "Carrito de Compras",
        cartEmpty: "Tu carrito está vacío",
        addProducts: "Agrega productos para comenzar tu compra",
        continueShopping: "Continuar comprando",
        addedToCart: "ha sido agregado al carrito",
        colors: "Colores",
        add: "Agregar",
        search: "Buscar productos...",
        subtotal: "Subtotal",
        shipping: "Envío",
        free: "Gratis",
        total: "Total",
        pay: "Proceder al Pago",
        emptyCart: "Vaciar Carrito"
      },
      product: {
        titleRegister: "Registrar Nuevo Producto",
        registerProduct: "Registrar Producto",
        titleRegistered: "Productos Registrados",
        stateTable: "Estado",
        inactive: "Inactivo",
        active: "Activo",
        nameTable: "Nombre",
        categoryTable: "Categoría",
        priceTable: "Precio",
        quantityTable: "Cantidad",
        colorsTable: "Colores",
        actions: "Acciones",
        titleModify: "Modificar Producto",
        selectProduct: "Selecciona un producto para editar su información",
        edit: "Editar",


        titleEdit: "Editar Producto",
        notFound: "Producto no encontrado",
        id: "ID del Producto",
        category: "Categoría",
        name: "Nombre del Producto",
        description: "Descripción",
        photos: "Fotos del Producto",
        uploadText: "Arrastra y suelta imágenes aquí o haz clic para seleccionar",
        uploadFormats: "Se permiten múltiples archivos (JPG, PNG, WEBP)",
        colors: "Colores Disponibles",
        addColor: "Agregar Color",
        disable: "Deshabilitar producto",
        quantity: "Cantidad Disponible",
        price: "Precio (COP)",
        save: "Guardar Cambios",
        cancel: "Cancelar"
      },
      reviews: {
      title: "Reseñas de Clientes",
      cantidadEstrellas: "Cantidad de Estrellas",
      observacion: "Observación",
    }
    }
    
  },

  /* ----------- ENGLISH ----------- */
  en: {
    translation: {
      nav: {
        home: "Home",
        features: "Features",
        contact: "Contact",
        login: "Sign In",
        register: "Register Barbershop"
      },
      hero: {
        title: "Take your barbershop to the next level with Barbercloud.",
        subtitle: "The complete platform that connects professional barbershops with clients seeking the best service.",
        explore: "Explore barbershops",
        start: "Start now"
      },
      features: {
        client: {
          title: "Are you a barbershop client? Enjoy these benefits:",
          schedule: {
            title: "Schedule appointments",
            description: "Book your appointment online easily and quickly"
          },
          shop: {
            title: "Buy products",
            description: "Purchase professional products from your favorite barbershop"
          },
          reminders: {
            title: "Automatic reminders",
            description: "Receive notifications for your upcoming appointments"
          },
          payments: {
            title: "Online payments",
            description: "Pay securely and conveniently"
          },
          mobile: {
            title: "Access from your phone",
            description: "Manage everything from your mobile device"
          },
          ratings: {
            title: "Ratings and reviews",
            description: "Rate and comment on the services received"
          }
        },
        owner: {
          title: "Do you own a barbershop? Access these advantages:",
          sell: {
            title: "Sell products",
            description: "Offer your products online"
          },
          calendar: {
            title: "Manage calendar",
            description: "Organize schedules for all your barbers"
          },
          showcase: {
            title: "Showcase your barbershop",
            description: "Give visibility to your business and attract new clients"
          },
          analytics: {
            title: "Business analytics",
            description: "Get insights and improve your service"
          }
        }
      },
      login: {
        title: "Sign In",
        subtitle: "Enter your credentials to access your account",
        email: "Email address",
        password: "Password",
        forgot: "Forgot your password?",
        submit: "Sign In",
        google: "Sign in with Google",
        noAccount: "Don't have an account?",
        registerLink: "Register for free"
      },
      register: {
        saveChanges: "Save Changes",
        infoTitle: "Edit Barbershop Information",
        infoDescription: "Review and edit your barbershop information",
        title: "Register Barbershop",
        subtitle: "Complete the form to register your barbershop",
        firstName: "First Name",
        lastName: "Last Name",
        id: "ID Number",
        phone: "Owner's Phone",
        shopName: "Barbershop Name",
        descripcion: "Description",
        logo: "Logo",
        department: "State/Province",
        city: "City",
        address: "Address",
        primaryColor: "Primary Color",
        secondaryColor: "Secondary Color",
        submit: "Register barbershop",
        hasAccount: "Already have an account?",
        loginLink: "Sign in"
      },
      contact: {
        title: "Contact Us",
        subtitle: "Have any questions? We're here to help",
        name: "Name",
        email: "Email address",
        message: "Message",
        submit: "Send message",
        phone: "Phone",
        support: "Support email"
      },
      footer: {
        product: "Product",
        features: "Features",
        pricing: "Pricing",
        company: "Company",
        about: "About us",
        contact: "Contact",
        legal: "Legal",
        privacy: "Privacy",
        terms: "Terms",
        rights: "© 2025 BarbeCloud. All rights reserved.",
        description: "The complete platform for modern barbershops and their clients."
      },
      navCustomer: {
        search: "Search your favorite barbershop...",
        department: "Department",
        selectDepartment: "Select department",
        city: "City",
        selectCity: "Select city",
        profileTitle: "User profile",
        logout: "Log out"
      },
      heroCustomer: {
        title: "Top Rated Barbershops",
        subtitle: "Discover the highest-rated barbershops by our community",
        button: "Explore now",
        enter: "Enter"
      },
      ratings: {
        title: "Rate your experience",
        subtitle: "Leave your rating and observation",
        ratingLabel: "Rating",
        observation: "Observation",
        observationPlaceholder: "Write your observation...",
        submit: "Send"
      },
      featuresAdminBarber: {
        title: "Manage your barbershop",
        barber: {
          title: "Add barbers to your team",
          description: "Manage their schedules and assigned appointments"
        },
        setBarber: {
          title: "Edit your barbers' information",
          description: "Update contact details and specialties"
        },
        product: {
          title: "Add and sell products",
          description: "Offer products online"
        },
        setProduct: {
          title: "Edit your products",
          description: "Update prices and descriptions"
        },
        showcase: {
          title: "Modify your barbershop",
          description: "Update description, address and colors"
        },
        historical: {
          title: "Sales history",
          description: "Review the sales history of your barbershop"
        },        
        store:{
          title: "My store",
          description: "This is how your store looks to your customers"
        },
        ratings:{
          title: "Customer reviews",
          description: "These are the reviews your customers have left"
        }

      },
      shop: {
        addToCart: "Add to cart",
        colorsAvailable: "Available colors",
        description: "Description",
        cart: "Shopping Cart",
        cartEmpty: "Your cart is empty",
        addProducts: "Add products to start your purchase",
        continueShopping: "Continue shopping",
        addedToCart: "has been added to the cart",
        colors: "Colors",
        add: "Add",
        search: "Search products...",
        subtotal: "Subtotal",
        shipping: "Shipping",
        free: "Free",
        total: "Total",
        pay: "Proceed to Checkout",
        emptyCart: "Empty Cart"
        
      },

      product: {
        titleRegister: "Register New Product",
        registerProduct: "Register Product",
        titleRegistered: "Registered Products",
        stateTable: "State",
        inactive: "Inactive",
        active: "Active",

        nameTable: "Product Name",
        categoryTable: "Category",
        priceTable: "Price",
        quantityTable: "Quantity",
        colorsTable: "Colors",
        actions: "Actions",
        titleModify: "Modify Product",
        selectProduct: "Select a product to edit its information",
        edit: "Edit",


        titleEdit: "Edit Product",
        notFound: "Product not found",
        back: "Go back",
        id: "Product ID",
        category: "Category",
        name: "Product Name",
        description: "Description",
        photos: "Product Photos",
        uploadText: "Drag and drop images here or click to select",
        uploadFormats: "Multiple files allowed (JPG, PNG, WEBP)",
        colors: "Available Colors",
        addColor: "Add Color",
        disable: "Disable product",
        quantity: "Available Quantity",
        price: "Price (COP)",
        save: "Save Changes",
        cancel: "Cancel"
      },
      reviews: {
        title: "Customer Reviews",
        cantidadEstrellas: "Number of Stars",
        observacion: "Observation"
      }


    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
