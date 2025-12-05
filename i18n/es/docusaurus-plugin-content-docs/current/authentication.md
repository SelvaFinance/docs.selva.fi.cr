---
sidebar_position: 3
---

# Autenticación

La API de Selva utiliza OAuth 2.0 para la autenticación. Esta guía explica cómo implementar el flujo de código de autorización OAuth 2.0.

## Resumen del Flujo OAuth 2.0

La API de Selva utiliza el flujo de **Código de Autorización**, que es el flujo OAuth 2.0 más seguro para aplicaciones del lado del servidor.

```
┌─────────┐         ┌──────────────┐         ┌──────────┐
│  Su     │         │   API Selva  │         │ Usuario  │
│  App    │         │              │         │          │
└────┬────┘         └──────┬───────┘         └────┬─────┘
     │                     │                      │
     │  1. Redirigir a     │                      │
     │     /oauth/authorize│                      │
     ├────────────────────>│                      │
     │                     │  2. Usuario autoriza │
     │                     │<────────────────────┤
     │                     │                      │
     │  3. Código de       │                      │
     │     autorización    │                      │
     │     devuelto        │                      │
     │<────────────────────┤                      │
     │                     │                      │
     │  4. Intercambiar    │                      │
     │     código por      │                      │
     │     token           │                      │
     ├────────────────────>│                      │
     │                     │                      │
     │  5. Token de acceso │                      │
     │     devuelto        │                      │
     │<────────────────────┤                      │
     │                     │                      │
```

## Paso 1: Redirigir Usuario al Endpoint de Autorización

Dirija al usuario al endpoint de autorización con los parámetros requeridos:

```
GET https://dev.selva.fi.cr/oauth/authorize?
  client_id=su-id-de-cliente&
  redirect_uri=https://su-app.com/callback&
  response_type=code&
  scope=read write
```

### Parámetros

- **client_id** (requerido): El ID de cliente de su aplicación
- **redirect_uri** (requerido): La URI a la que redirigir después de la autorización. Debe coincidir con una URI de redirección registrada.
- **response_type** (requerido): Debe ser `code` para el flujo de código de autorización
- **scope** (opcional): Lista de alcances separados por espacios (ej., `read write`)

### Ejemplo

```javascript
const authUrl = new URL('https://dev.selva.fi.cr/oauth/authorize');
authUrl.searchParams.set('client_id', 'su-id-de-cliente');
authUrl.searchParams.set('redirect_uri', 'https://su-app.com/callback');
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('scope', 'read write');

// Redirigir usuario a authUrl.toString()
window.location.href = authUrl.toString();
```

## Paso 2: Manejar el Callback de Autorización

Después de que el usuario autorice su aplicación, será redirigido de vuelta a su `redirect_uri` con un código de autorización:

```
https://su-app.com/callback?code=CODIGO_DE_AUTORIZACION&state=estado_opcional
```

Extraiga el parámetro `code` de la URL.

## Paso 3: Intercambiar Código por Token de Acceso

Intercambie el código de autorización por un token de acceso realizando una solicitud POST al endpoint de token:

```bash
curl -X POST https://dev.selva.fi.cr/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "authorization_code",
    "client_id": "su-id-de-cliente",
    "client_secret": "su-secreto-de-cliente",
    "redirect_uri": "https://su-app.com/callback",
    "code": "CODIGO_DE_AUTORIZACION"
  }'
```

### Respuesta

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "token-de-refresco-aqui",
  "scope": "read write"
}
```

## Paso 4: Usar el Token de Acceso

Incluya el token de acceso en el encabezado `Authorization` de todas las solicitudes a la API:

```bash
curl -X GET https://dev.selva.fi.cr/api/accounts \
  -H "Authorization: Bearer SU_TOKEN_DE_ACCESO"
```

## Expiración del Token

Los tokens de acceso expiran después de un período determinado (típicamente 1 hora). Cuando un token expira:

1. Use el `refresh_token` para obtener un nuevo token de acceso
2. O redirija al usuario a través del flujo de autorización nuevamente

## Tokens de Refresco

Para refrescar un token de acceso expirado:

```bash
curl -X POST https://dev.selva.fi.cr/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "refresh_token",
    "client_id": "su-id-de-cliente",
    "client_secret": "su-secreto-de-cliente",
    "refresh_token": "su-token-de-refresco"
  }'
```

## Alcances (Scopes)

Los alcances definen lo que su aplicación puede acceder:

- **read**: Leer información de cuentas, saldos y transacciones
- **write**: Crear pagos y gestionar cuentas
- **webhooks**: Gestionar suscripciones de webhooks

Solicite alcances durante el paso de autorización. Los usuarios pueden otorgar o denegar alcances específicos.

## Mejores Prácticas de Seguridad

1. **Nunca exponga secretos de cliente**: Mantenga su `client_secret` solo en el lado del servidor
2. **Use HTTPS**: Siempre use HTTPS para todas las llamadas a la API
3. **Almacene tokens de forma segura**: Encripte tokens en su base de datos
4. **Valide URIs de redirección**: Solo use URIs de redirección registradas
5. **Maneje errores adecuadamente**: Implemente manejo de errores apropiado para tokens expirados o inválidos
6. **Use claves de idempotencia**: Incluya encabezados `X-Idempotency-Key` para solicitudes de pago

## Respuestas de Error

Si la autenticación falla, recibirá una respuesta de error:

```json
{
  "error": "invalid_grant",
  "message": "El código de autorización es inválido o ha expirado"
}
```

Errores comunes:

- `invalid_client`: ID de cliente o secreto inválido
- `invalid_grant`: Código de autorización inválido o expirado
- `invalid_scope`: Alcance solicitado es inválido
- `unauthorized`: Token de acceso es inválido o expirado

Consulte la [guía de Manejo de Errores](/docs/errors) para más detalles.

## Probar Autenticación

Puede probar el flujo de autenticación usando:

1. **Postman**: Importe nuestra colección de Postman y use el asistente OAuth 2.0
2. **cURL**: Use los ejemplos anteriores
3. **Referencia de API**: Pruebe los endpoints en la [Referencia de API](/docs/api-reference)

## Próximos Pasos

- Explore la [Referencia de API](/docs/api-reference) para ver todos los endpoints disponibles
- Aprenda sobre [Flujos de Trabajo Comunes](/docs/common-workflows) para patrones típicos de integración
- Revise [Manejo de Errores](/docs/errors) para manejar errores adecuadamente

