---
sidebar_position: 4
title: Referencia de la API
---

# Referencia de la API

La API de Selva proporciona un conjunto completo de endpoints para el procesamiento de pagos, gestión de cuentas y suscripciones a webhooks.

## Documentación Interactiva

Explora todos los endpoints disponibles, prueba solicitudes y ve respuestas utilizando nuestra documentación de API interactiva con tecnología Scalar.

**Abra la referencia de API interactiva:** [/api-reference](/api-reference)

La referencia de la API se genera automáticamente a partir de nuestra especificación OpenAPI y proporciona una interfaz interactiva para explorar todos los endpoints, ver esquemas de solicitud/respuesta y probar llamadas a la API directamente desde su navegador.

## Categorías de Endpoints

### Autenticación
- `GET /oauth/authorize` - Iniciar el flujo de autorización OAuth
- `POST /oauth/token` - Intercambiar código de autorización por token de acceso

### Cuentas
- `GET /api/accounts` - Listar todas las cuentas
- `POST /api/accounts` - Crear una nueva cuenta
- `GET /api/accounts/information` - Obtener información de cuentas
- `GET /api/accounts/{identifier}/information` - Obtener información de cuenta por identificador
- `GET /api/accounts/{id}/balance` - Consultar saldo de cuenta
- `GET /api/accounts/{id}/details` - Obtener detalles de cuenta
- `GET /api/accounts/{id}/movements` - Obtener movimientos de cuenta
- `GET /api/accounts/{id}/kyc` - Consultar estado KYC (Know Your Customer)
- `GET /api/accounts/{id}/transactions/{transactionCode}` - Obtener transacción por código

### Pagos
- `POST /api/payments` - Crear un pago
- `POST /api/payments/validate` - Validar detalles de pago
- `GET /api/payments/history` - Obtener historial de pagos
- `GET /api/payments/{id}` - Obtener pago por ID

### Verificación
- `GET /api/phone/information` - Obtener información de número de teléfono
- `GET /api/iban/information` - Verificar si IBAN está registrado
- `GET /api/accounts/information` - Verificar información de cuenta

### Webhooks
- `GET /api/webhooks/subscriptions` - Listar suscripciones a webhooks
- `POST /api/webhooks/subscriptions` - Crear suscripción a webhook
- `GET /api/webhooks/subscriptions/{id}` - Obtener suscripción a webhook
- `DELETE /api/webhooks/subscriptions/{id}` - Eliminar suscripción a webhook
- `POST /api/NotifyIncomingTransfers` - Webhook de transferencias entrantes

### Sistema
- `GET /api/IsServiceAvailable` - Verificar disponibilidad del servicio

## Formato de Solicitud

Todas las solicitudes de API usan:

- **Content-Type**: `application/json` para solicitudes POST
- **Authorization**: `Bearer {access_token}` encabezado para solicitudes autenticadas
- **Idempotencia**: Incluya encabezado `X-Idempotency-Key` para solicitudes de pago
  - Incluya encabezado `X-Idempotency-Key` para solicitudes de pago

## Formato de Respuesta

Todas las respuestas de API usan formato JSON e incluyen códigos de estado HTTP estándar:

- `200 OK` - Solicitud exitosa
- `201 Created` - Recurso creado exitosamente
- `204 No Content` - Solicitud exitosa, sin contenido a devolver
- `400 Bad Request` - Parámetros de solicitud inválidos
- `401 Unauthorized` - Autenticación inválida o faltante
- `403 Forbidden` - Permisios insuficientes
- `404 Not Found` - Recurso no encontrado
- `500 Internal Server Error` - Error del servidor
- `503 Service Unavailable` - Servicio temporalmente no disponible

## Límites de Tasa

Los límites de tasa de API se aplican por cliente y por endpoint. La información de límites de tasa se incluye en encabezados de respuesta:

- `X-RateLimit-Limit` - Número máximo de solicitudes permitidas
- `X-RateLimit-Remaining` - Número de solicitudes restantes
- `X-RateLimit-Reset` - Tiempo cuando se restablece el límite de tasa

## Paginación

Los endpoints de lista soportan paginación utilizando los parámetros `limit` y `offset`:

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

Muchos endpoints de lista soportan filtrado y ordenamiento. Vea la documentación de endpoint individual para opciones disponibles.

## Manejo de Errores

Todos los errores siguen un formato consistente:

```json
{
  "error": "error_code",
  "message": "Mensaje de error legible para humanos",
  "details": {}
}
```

Vea la [guía de manejo de errores](/docs/errors) para códigos de error detallados y estrategias de manejo.

## Especificación OpenAPI

Descargue la especificación OpenAPI 3.0 completa:

- [openapi.yaml](/openapi/openapi.yaml)

Puede utilizar esta especificación para:

- Generar SDKs de cliente
- Importar en herramientas de prueba de API (Postman, Insomnia)
- Generar documentación
- Validar solicitudes y respuestas

## SDKs y Ejemplos de Código

Si bien la API se puede llamar directamente, puede encontrar estos recursos útiles:

- **Colección de Postman**: Importe para probar
- **Especificación de OpenAPI**: Descargue la especificación completa para generación de código
- **Ejemplos de Código**: Vea [Flujos comunes](/docs/common-workflows) para patrones de integración

## Soporte

Para preguntas sobre endpoints específicos:

- Consulte la documentación de API interactiva arriba
- Revise [Flujos comunes](/docs/common-workflows) para ejemplos de uso
- Contacte soporte en support@selva.fi.cr
