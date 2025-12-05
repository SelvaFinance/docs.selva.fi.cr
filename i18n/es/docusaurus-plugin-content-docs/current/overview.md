---
sidebar_position: 1
---

# Resumen de la API

Bienvenido a la documentación de la API de Selva. La API de Selva proporciona servicios financieros integrales para construir aplicaciones de pagos y banca.

## ¿Qué es Selva?

Selva (Soluciones Electrónicas Locales de Valor) es una plataforma de servicios financieros que permite a las empresas integrar el procesamiento de pagos, la gestión de cuentas y las operaciones bancarias en sus aplicaciones.

## Características Principales

### Procesamiento de Pagos
- Crear y procesar pagos
- Validar detalles de pago antes de procesar
- Recuperar historial y estado de pagos
- Soporte para múltiples métodos de pago (SINPE Móvil, PIN)

### Gestión de Cuentas
- Crear y gestionar cuentas
- Consultar saldos de cuentas
- Ver detalles e información de cuentas
- Recuperar historial de transacciones y movimientos
- Acceder al estado de KYC (Conozca a Su Cliente)

### Servicios de Verificación
- Verificar números de teléfono
- Validar IBAN (Número de Cuenta Bancaria Internacional)
- Verificar información de cuentas

### Webhooks
- Suscribirse a eventos en tiempo real
- Recibir notificaciones de pagos, transferencias y actividades de cuentas
- Configurar encabezados personalizados y políticas de reintento

## Arquitectura de la API

La API de Selva sigue principios RESTful y utiliza métodos HTTP estándar:

- **GET** - Recuperar recursos
- **POST** - Crear recursos o realizar acciones
- **DELETE** - Eliminar recursos

Todas las solicitudes de la API utilizan JSON para los cuerpos de solicitud y respuesta, y requieren autenticación OAuth 2.0.

## URLs Base

- **Desarrollo**: `https://dev.selva.fi.cr`
- **Producción**: `https://api.selva.fi.cr` (contacte con soporte para acceso)
- **Local**: `http://localhost` (para desarrollo local)

## Autenticación

La API utiliza OAuth 2.0 para la autenticación. Necesitará:

1. Obtener credenciales de cliente desde el panel de Selva
2. Implementar el flujo de código de autorización OAuth 2.0
3. Incluir tokens de acceso en el encabezado `Authorization`

Consulte la [guía de Autenticación](/docs/authentication) para obtener instrucciones detalladas.

## Límites de Tasa

Los límites de tasa de la API se aplican por cliente y endpoint. Contacte con soporte para obtener información sobre sus límites de tasa específicos.

## Soporte

Para preguntas, problemas o solicitudes de funciones:

- **Correo electrónico**: support@selva.fi.cr
- **Documentación**: Este sitio
- **Página de Estado**: Verifique la disponibilidad del servicio en `/api/IsServiceAvailable`

## Comenzar

¿Listo para comenzar a integrar? Consulte nuestra [guía de Comenzar](/docs/getting-started) para realizar su primera llamada a la API.

