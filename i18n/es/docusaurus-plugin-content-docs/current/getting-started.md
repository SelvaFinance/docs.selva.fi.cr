---
sidebar_position: 2
---

# Comenzar

Esta guía le ayudará a realizar su primera llamada a la API de Selva en solo unos minutos.

## Requisitos Previos

Antes de comenzar, necesitará:

- Una cuenta de Selva (contacte con soporte para comenzar)
- Credenciales de cliente (ID de Cliente y Secreto de Cliente)
- Comprensión básica de APIs REST y OAuth 2.0

## Paso 1: Obtener Sus Credenciales

1. Inicie sesión en el panel de Selva
2. Navegue a la sección de API
3. Cree una nueva aplicación o use una existente
4. Copie su **ID de Cliente** y **Secreto de Cliente**

Mantenga estas credenciales seguras y nunca las incluya en el control de versiones.

## Paso 2: Autenticarse

La API de Selva utiliza OAuth 2.0. Para obtener un token de acceso:

### Opción A: Usando cURL

```bash
curl -X POST https://dev.selva.fi.cr/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "authorization_code",
    "client_id": "su-id-de-cliente",
    "client_secret": "su-secreto-de-cliente",
    "redirect_uri": "https://su-app.com/callback",
    "code": "codigo-de-autorizacion-del-callback"
  }'
```

### Opción B: Usando JavaScript/Node.js

```javascript
const response = await fetch('https://dev.selva.fi.cr/oauth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    grant_type: 'authorization_code',
    client_id: 'su-id-de-cliente',
    client_secret: 'su-secreto-de-cliente',
    redirect_uri: 'https://su-app.com/callback',
    code: 'codigo-de-autorizacion-del-callback',
  }),
});

const data = await response.json();
const accessToken = data.access_token;
```

La respuesta incluirá un `access_token` que utilizará para las llamadas posteriores a la API.

## Paso 3: Realizar Su Primera Llamada a la API

Ahora que tiene un token de acceso, verifiquemos sus cuentas:

```bash
curl -X GET https://dev.selva.fi.cr/api/accounts \
  -H "Authorization: Bearer SU_TOKEN_DE_ACCESO"
```

O usando JavaScript:

```javascript
const response = await fetch('https://dev.selva.fi.cr/api/accounts', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  },
});

const accounts = await response.json();
console.log('Sus cuentas:', accounts);
```

## Paso 4: Verificar el Estado del Servicio

Verifique que la API esté disponible:

```bash
curl https://dev.selva.fi.cr/api/IsServiceAvailable
```

## Ejemplo: Crear un Pago

Aquí tiene un ejemplo completo de cómo crear un pago:

```javascript
// 1. Obtener token de acceso (del Paso 2)
const accessToken = 'su-token-de-acceso';

// 2. Generar clave de idempotencia
const idempotencyKey = crypto.randomUUID();

// 3. Crear pago
const paymentResponse = await fetch('https://dev.selva.fi.cr/api/payments', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    'X-Idempotency-Key': idempotencyKey,
  },
  body: JSON.stringify({
    amount: 10000,
    currency: 'CRC',
    recipient_identifier: 'CR78037010600458074353',
    description: 'Pago por servicios',
    payment_method: 'SINPE Movil',
  }),
});

const payment = await paymentResponse.json();
console.log('Pago creado:', payment);
```

## Próximos Pasos

- Aprenda sobre [Autenticación](/docs/authentication) en detalle
- Explore la [Referencia de API](/docs/api-reference) para ver todos los endpoints disponibles
- Consulte [Flujos de Trabajo Comunes](/docs/common-workflows) para patrones de integración
- Revise [Manejo de Errores](/docs/errors) para manejar errores de manera adecuada

## SDKs y Bibliotecas

Aunque la API se puede llamar directamente, puede encontrar útiles estos recursos:

- **Colección de Postman**: Importe nuestra colección de Postman para pruebas
- **Especificación OpenAPI**: Descargue la especificación OpenAPI para generación de código

## ¿Necesita Ayuda?

Si encuentra problemas:

1. Consulte la [guía de Manejo de Errores](/docs/errors)
2. Verifique que sus credenciales sean correctas
3. Asegúrese de que su token de acceso no haya expirado
4. Contacte con soporte en support@selva.fi.cr

