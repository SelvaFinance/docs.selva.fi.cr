---
sidebar_position: 5
---

# Flujos de Trabajo Comunes

Esta guía cubre patrones de integración y flujos de trabajo comunes para la API de Selva.

## Flujo de Trabajo 1: Procesamiento de Pagos

Flujo completo para procesar un pago desde la validación hasta la finalización.

### Paso 1: Validar Pago

Antes de crear un pago, valide los detalles del pago:

```javascript
const validateResponse = await fetch('https://dev.selva.fi.cr/api/payments/validate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    amount: 10000,
    currency: 'CRC',
    recipient_identifier: 'CR78037010600458074353',
  }),
});

const validation = await validateResponse.json();

if (!validation.valid) {
  console.error('Errores de validación:', validation.errors);
  // Manejar errores de validación
  return;
}
```

### Paso 2: Crear Pago

Una vez validado, cree el pago con una clave de idempotencia:

```javascript
const idempotencyKey = crypto.randomUUID();

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
console.log('Pago creado:', payment.id);
```

### Paso 3: Consultar Estado

Consulte el estado del pago hasta que se complete o falle:

```javascript
async function waitForPaymentCompletion(paymentId) {
  while (true) {
    const response = await fetch(`https://dev.selva.fi.cr/api/payments/${paymentId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    const payment = await response.json();
    
    if (payment.status === 'completed') {
      return payment;
    }
    
    if (payment.status === 'failed' || payment.status === 'cancelled') {
      throw new Error(`Pago ${payment.status}`);
    }
    
    // Esperar antes de consultar nuevamente
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}
```

## Flujo de Trabajo 2: Gestión de Cuentas

Flujo completo para gestionar cuentas y ver transacciones.

### Crear Cuenta

```javascript
const accountResponse = await fetch('https://dev.selva.fi.cr/api/accounts', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    currency: 'CRC',
  }),
});

const account = await accountResponse.json();
console.log('Cuenta creada:', account.id);
```

### Obtener Saldo de Cuenta

```javascript
const balanceResponse = await fetch(
  `https://dev.selva.fi.cr/api/accounts/${accountId}/balance`,
  {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  }
);

const balance = await balanceResponse.json();
console.log(`Saldo: ${balance.currency} ${balance.balance}`);
```

### Ver Movimientos de Cuenta

```javascript
const movementsResponse = await fetch(
  `https://dev.selva.fi.cr/api/accounts/${accountId}/movements?start_date=2024-01-01T00:00:00Z&end_date=2024-12-31T23:59:59Z`,
  {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  }
);

const movements = await movementsResponse.json();
console.log('Movimientos de cuenta:', movements);
```

## Flujo de Trabajo 3: Integración de Webhooks

Configure webhooks para recibir notificaciones en tiempo real.

### Paso 1: Crear Suscripción de Webhook

```javascript
const webhookResponse = await fetch('https://dev.selva.fi.cr/api/webhooks/subscriptions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://su-app.com/webhooks',
    events: 'payment.completed,payment.failed,account.created',
    max_attempts: '3',
    headers: {
      'X-Custom-Header': 'valor-personalizado',
    },
  }),
});

const subscription = await webhookResponse.json();
console.log('Suscripción de webhook creada:', subscription.id);
```

### Paso 2: Manejar Eventos de Webhook

Implemente un endpoint de webhook en su aplicación:

```javascript
// Ejemplo Express.js
app.post('/webhooks', async (req, res) => {
  const signature = req.headers['signature'];
  const payload = req.body;
  
  // Verificar firma del webhook
  if (!verifySignature(signature, payload)) {
    return res.status(401).json({ error: 'Firma inválida' });
  }
  
  // Manejar diferentes tipos de eventos
  if (payload.event === 'payment.completed') {
    await handlePaymentCompleted(payload.data);
  } else if (payload.event === 'payment.failed') {
    await handlePaymentFailed(payload.data);
  }
  
  res.status(200).json({ status: 'recibido' });
});
```

### Paso 3: Manejar Transferencias Entrantes

Para notificaciones de transferencias entrantes:

```javascript
app.post('/webhooks/incoming-transfers', async (req, res) => {
  const signature = req.headers['signature'];
  const notification = req.body;
  
  // Verificar firma
  if (!verifySignature(signature, notification)) {
    return res.status(401).json({ error: 'Firma inválida' });
  }
  
  // Procesar cada transferencia
  for (const transfer of notification.Transfers) {
    await processIncomingTransfer(transfer);
  }
  
  res.status(200).json({ status: 'recibido' });
});
```

## Flujo de Trabajo 4: Servicios de Verificación

Verifique información de cuenta antes de procesar pagos.

### Verificar IBAN

```javascript
const ibanResponse = await fetch('https://dev.selva.fi.cr/api/iban/information', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    iban: 'CR78037010600458074353',
  }),
});

const ibanInfo = await ibanResponse.json();

if (ibanInfo.valid) {
  console.log('IBAN es válido:', ibanInfo.account_holder);
} else {
  console.error('IBAN inválido');
}
```

### Verificar Número de Teléfono

```javascript
const phoneResponse = await fetch(
  'https://dev.selva.fi.cr/api/phone/information?phone_number=+50688888888',
  {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  }
);

const phoneInfo = await phoneResponse.json();
console.log('Teléfono verificado:', phoneInfo.verified);
```

## Flujo de Trabajo 5: Manejo de Errores y Reintentos

Implemente manejo robusto de errores con retroceso exponencial.

```javascript
async function apiCallWithRetry(url, options, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      if (response.ok) {
        return await response.json();
      }
      
      // No reintentar en errores del cliente (4xx)
      if (response.status >= 400 && response.status < 500) {
        const error = await response.json();
        throw new Error(error.message);
      }
      
      // Reintentar en errores del servidor (5xx)
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

// Uso
try {
  const accounts = await apiCallWithRetry(
    'https://dev.selva.fi.cr/api/accounts',
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );
} catch (error) {
  console.error('Llamada a la API falló:', error);
}
```

## Mejores Prácticas

1. **Siempre valide pagos** antes de crearlos
2. **Use claves de idempotencia** para solicitudes de pago
3. **Implemente verificación de firma de webhook** para seguridad
4. **Maneje límites de tasa** con retroceso exponencial
5. **Almacene tokens de acceso de forma segura** y actualícelos antes de que expiren
6. **Registre todas las llamadas a la API** para depuración y auditoría
7. **Maneje errores adecuadamente** con mensajes amigables para el usuario

## Próximos Pasos

- Revise la [Referencia de API](/docs/api-reference) para ver todos los endpoints disponibles
- Consulte la [guía de Manejo de Errores](/docs/errors) para códigos de error y estrategias
- Vea [Autenticación](/docs/authentication) para gestión de tokens

