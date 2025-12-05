---
sidebar_position: 6
---

# Manejo de Errores

Esta guía explica cómo manejar errores al usar la API de Selva.

## Formato de Respuesta de Error

Todos los errores de la API siguen un formato consistente:

```json
{
  "error": "codigo_de_error",
  "message": "Mensaje de error legible",
  "details": {
    "field": "Detalles adicionales del error"
  }
}
```

## Códigos de Estado HTTP

La API utiliza códigos de estado HTTP estándar:

| Código de Estado | Significado | Descripción |
|-----------------|-------------|-------------|
| 200 | OK | Solicitud exitosa |
| 201 | Created | Recurso creado exitosamente |
| 204 | No Content | Solicitud exitosa, sin contenido para devolver |
| 400 | Bad Request | Parámetros o cuerpo de solicitud inválidos |
| 401 | Unauthorized | Token de autenticación inválido o faltante |
| 403 | Forbidden | Permisos insuficientes |
| 404 | Not Found | El recurso no existe |
| 500 | Internal Server Error | Ocurrió un error del servidor |
| 503 | Service Unavailable | Servicio temporalmente no disponible |

## Códigos de Error Comunes

### Errores de Autenticación

#### `invalid_client`
- **Estado**: 401
- **Descripción**: ID de cliente o secreto inválido
- **Solución**: Verifique que sus credenciales sean correctas

```json
{
  "error": "invalid_client",
  "message": "Credenciales de cliente inválidas"
}
```

#### `invalid_grant`
- **Estado**: 401
- **Descripción**: Código de autorización inválido o expirado
- **Solución**: Solicite un nuevo código de autorización

```json
{
  "error": "invalid_grant",
  "message": "El código de autorización es inválido o ha expirado"
}
```

#### `unauthorized`
- **Estado**: 401
- **Descripción**: Token de acceso inválido o expirado
- **Solución**: Actualice su token de acceso o vuelva a autenticarse

```json
{
  "error": "unauthorized",
  "message": "Token de acceso inválido o expirado"
}
```

### Errores de Solicitud

#### `invalid_request`
- **Estado**: 400
- **Descripción**: Parámetros de solicitud faltantes o inválidos
- **Solución**: Verifique los parámetros requeridos y sus formatos

```json
{
  "error": "invalid_request",
  "message": "La solicitud falta un parámetro requerido",
  "details": {
    "missing_field": "amount"
  }
}
```

#### `validation_error`
- **Estado**: 400
- **Descripción**: Validación del cuerpo de solicitud falló
- **Solución**: Revise los errores de validación y corrija la solicitud

```json
{
  "error": "validation_error",
  "message": "La validación de la solicitud falló",
  "details": {
    "amount": "El monto debe ser mayor que 0"
  }
}
```

### Errores de Recurso

#### `not_found`
- **Estado**: 404
- **Descripción**: El recurso solicitado no existe
- **Solución**: Verifique que el ID del recurso sea correcto

```json
{
  "error": "not_found",
  "message": "El recurso solicitado no fue encontrado"
}
```

#### `forbidden`
- **Estado**: 403
- **Descripción**: Permisos insuficientes
- **Solución**: Verifique sus alcances OAuth y permisos

```json
{
  "error": "forbidden",
  "message": "Usted no tiene permiso para acceder a este recurso"
}
```

### Errores del Servidor

#### `internal_error`
- **Estado**: 500
- **Descripción**: Error interno del servidor
- **Solución**: Reintente la solicitud con retroceso exponencial

```json
{
  "error": "internal_error",
  "message": "Ocurrió un error interno del servidor"
}
```

#### `service_unavailable`
- **Estado**: 503
- **Descripción**: Servicio temporalmente no disponible
- **Solución**: Reintente después del período de reintento indicado

```json
{
  "error": "service_unavailable",
  "message": "Servicio temporalmente no disponible",
  "details": {
    "retry_after": 60
  }
}
```

## Estrategias de Manejo de Errores

### 1. Lógica de Reintento

Implemente lógica de reintento para errores transitorios (códigos de estado 5xx):

```javascript
async function apiCallWithRetry(url, options, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      if (response.ok) {
        return await response.json();
      }
      
      // No reintentar errores del cliente
      if (response.status >= 400 && response.status < 500) {
        const error = await response.json();
        throw new Error(error.message);
      }
      
      // Reintentar errores del servidor
      if (response.status >= 500) {
        throw new Error('Error del servidor');
      }
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw error;
      }
      
      // Retroceso exponencial
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

### 2. Manejo de Límite de Tasa

Maneje errores de límite de tasa (código de estado 429):

```javascript
async function handleRateLimit(response) {
  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    const delay = retryAfter ? parseInt(retryAfter) * 1000 : 60000;
    
    console.log(`Límite de tasa alcanzado. Reintentando después de ${delay}ms`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return true; // Indicar que se necesita reintento
  }
  return false;
}
```

### 3. Actualización de Token

Actualice automáticamente tokens expirados:

```javascript
async function makeAuthenticatedRequest(url, options = {}) {
  let accessToken = getStoredAccessToken();
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  
  // Si no autorizado, intentar actualizar token
  if (response.status === 401) {
    accessToken = await refreshAccessToken();
    
    // Reintentar con nuevo token
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  }
  
  return response;
}
```

### 4. Mensajes de Error Amigables

Mapee códigos de error a mensajes amigables para el usuario:

```javascript
const errorMessages = {
  'invalid_request': 'Por favor verifique su entrada e intente nuevamente',
  'unauthorized': 'Su sesión ha expirado. Por favor inicie sesión nuevamente',
  'not_found': 'El elemento solicitado no pudo ser encontrado',
  'forbidden': 'Usted no tiene permiso para realizar esta acción',
  'internal_error': 'Ocurrió un error del servidor. Por favor intente más tarde',
};

function getUserFriendlyError(errorCode) {
  return errorMessages[errorCode] || 'Ocurrió un error inesperado';
}
```

## Errores de Validación

Los endpoints de creación de pagos y cuentas devuelven errores de validación detallados:

```json
{
  "error": "validation_error",
  "message": "La validación de la solicitud falló",
  "details": {
    "amount": "El monto debe ser mayor que 0",
    "currency": "Código de moneda inválido",
    "recipient_identifier": "Formato de identificador de cuenta inválido"
  }
}
```

Muestre estos errores a los usuarios para ayudarlos a corregir su entrada.

## Manejo de Errores de Webhooks

Al recibir webhooks, siempre devuelva un código de estado 200 para confirmar la recepción, incluso si el procesamiento falla:

```javascript
app.post('/webhooks', async (req, res) => {
  try {
    // Verificar firma
    if (!verifySignature(req.headers['signature'], req.body)) {
      return res.status(401).json({ error: 'Firma inválida' });
    }
    
    // Procesar webhook
    await processWebhook(req.body);
    
    // Siempre devolver 200 para confirmar recepción
    res.status(200).json({ status: 'recibido' });
  } catch (error) {
    // Registrar error pero aún así confirmar recepción
    console.error('Error al procesar webhook:', error);
    res.status(200).json({ status: 'recibido' });
  }
});
```

## Probar Escenarios de Error

Pruebe su manejo de errores mediante:

1. **Credenciales inválidas**: Use ID de cliente/secreto incorrectos
2. **Tokens expirados**: Espere a que expire el token
3. **Solicitudes inválidas**: Envíe cuerpos de solicitud mal formados
4. **Recursos faltantes**: Solicite IDs que no existen
5. **Límite de tasa**: Realice solicitudes rápidas

## Monitoreo y Registro

Registre todos los errores para monitoreo y depuración:

```javascript
async function logError(error, context) {
  console.error('Error de API:', {
    error: error.error,
    message: error.message,
    status: context.status,
    endpoint: context.url,
    timestamp: new Date().toISOString(),
  });
  
  // Enviar a servicio de seguimiento de errores (ej., Sentry)
  // trackError(error, context);
}
```

## Próximos Pasos

- Revise [Flujos de Trabajo Comunes](/docs/common-workflows) para patrones de manejo de errores
- Consulte la [Referencia de API](/docs/api-reference) para errores específicos de endpoints
- Vea [Autenticación](/docs/authentication) para manejo de errores de tokens

