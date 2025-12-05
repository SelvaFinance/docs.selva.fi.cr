---
sidebar_position: 4
---

# Referencia de API

La API de Selva proporciona un conjunto integral de endpoints para procesamiento de pagos, gestión de cuentas y suscripciones de webhooks.

## Documentación Interactiva de API

Explore todos los endpoints disponibles, pruebe solicitudes y vea respuestas usando nuestra documentación interactiva de API impulsada por Scalar.

import ScalarApiReference from '@site/src/components/ScalarApiReference';

<ScalarApiReference />

La referencia de API anterior se genera automáticamente a partir de nuestra especificación OpenAPI y proporciona una interfaz interactiva para explorar todos los endpoints, ver esquemas de solicitud/respuesta y probar llamadas a la API directamente desde su navegador.

## Categorías de Endpoints

### Autenticación
- `GET /oauth/authorize` - Iniciar flujo de autorización OAuth
- `POST /oauth/token` - Intercambiar código de autorización por token de acceso

### Cuentas
- `GET /api/accounts` - Listar todas las cuentas
- `POST /api/accounts` - Crear una nueva cuenta
- `GET /api/accounts/information` - Obtener información de cuenta
- `GET /api/accounts/{identifier}/information` - Obtener información de cuenta por identificador
- `GET /api/accounts/{id}/balance` - Obtener saldo de cuenta
- `GET /api/accounts/{id}/details` - Obtener detalles de cuenta
- `GET /api/accounts/{id}/movements` - Obtener movimientos de cuenta
- `GET /api/accounts/{id}/kyc` - Obtener estado KYC
- `GET /api/accounts/{id}/transactions/{transactionCode}` - Obtener transacción por código

### Pagos
- `POST /api/payments` - Crear un pago
- `POST /api/payments/validate` - Validar detalles de pago
- `GET /api/payments/history` - Obtener historial de pagos
- `GET /api/payments/{id}` - Obtener pago por ID

### Verificación
- `GET /api/phone/information` - Obtener información de número de teléfono
- `GET /api/iban/information` - Obtener información de IBAN

### Webhooks
- `GET /api/webhooks/subscriptions` - Listar suscripciones de webhooks
- `POST /api/webhooks/subscriptions` - Crear suscripción de webhook
- `GET /api/webhooks/subscriptions/{id}` - Obtener suscripción de webhook
- `DELETE /api/webhooks/subscriptions/{id}` - Eliminar suscripción de webhook
- `POST /api/NotifyIncomingTransfers` - Webhook de transferencias entrantes

### Sistema
- `GET /api/IsServiceAvailable` - Verificar disponibilidad del servicio

## Formato de Solicitud

Todas las solicitudes a la API utilizan:

- **Content-Type**: `application/json` para solicitudes POST
- **Authorization**: Encabezado `Bearer {access_token}` para solicitudes autenticadas
- **Idempotencia**: Incluya encabezado `X-Idempotency-Key` para solicitudes de pago

## Formato de Respuesta

Todas las respuestas de la API utilizan formato JSON e incluyen códigos de estado HTTP estándar:

- `200 OK` - Solicitud exitosa
- `201 Created` - Recurso creado exitosamente
- `204 No Content` - Solicitud exitosa, sin contenido para devolver
- `400 Bad Request` - Parámetros de solicitud inválidos
- `401 Unauthorized` - Autenticación inválida o faltante
- `403 Forbidden` - Permisos insuficientes
- `404 Not Found` - Recurso no encontrado
- `500 Internal Server Error` - Error del servidor
- `503 Service Unavailable` - Servicio temporalmente no disponible

## Límites de Tasa

Los límites de tasa de la API se aplican por cliente y endpoint. La información de límite de tasa se incluye en los encabezados de respuesta:

- `X-RateLimit-Limit` - Número máximo de solicitudes permitidas
- `X-RateLimit-Remaining` - Número de solicitudes restantes
- `X-RateLimit-Reset` - Tiempo cuando se restablece el límite de tasa

## Paginación

Los endpoints de lista admiten paginación usando parámetros `limit` y `offset`:

```
GET /api/payments/history?limit=20&offset=0
```

La respuesta incluye metadatos de paginación:

```json
{
  "data": [...],
  "limit": 20,
  "offset": 0,
  "total": 100,
  "has_more": true
}
```

## Filtrado y Ordenamiento

Muchos endpoints de lista admiten filtrado y ordenamiento. Consulte la documentación de cada endpoint para ver las opciones disponibles.

## Manejo de Errores

Todos los errores siguen un formato consistente:

```json
{
  "error": "codigo_de_error",
  "message": "Mensaje de error legible",
  "details": {}
}
```

Consulte la [guía de Manejo de Errores](/docs/errors) para códigos de error detallados y estrategias de manejo.

## Especificación OpenAPI

Descargue la especificación completa de OpenAPI 3.0:

- [openapi-es.yaml](/openapi/openapi-es.yaml) (Español)
- [openapi-en.yaml](/openapi/openapi-en.yaml) (English)

Puede usar esta especificación para:

- Generar SDKs de cliente
- Importar en herramientas de prueba de API (Postman, Insomnia)
- Generar documentación
- Validar solicitudes y respuestas

## SDKs y Ejemplos de Código

Aunque la API se puede llamar directamente, puede encontrar útiles estos recursos:

- **Colección de Postman**: Importar para pruebas
- **Ejemplos de Código**: Consulte [Flujos de Trabajo Comunes](/docs/common-workflows) para patrones de integración

## Soporte

Para preguntas sobre endpoints específicos:

- Consulte la documentación interactiva de API anterior
- Revise [Flujos de Trabajo Comunes](/docs/common-workflows) para ejemplos de uso
- Contacte con soporte en support@selva.fi.cr

