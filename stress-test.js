import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 10 },  // subida
    { duration: '30s', target: 10 },  // carga sostenida
    { duration: '10s', target: 0 },   // bajada
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% deben responder en menos de 500ms
  },
};

const BASE_URL = 'http://localhost:3000';

export default function () {
  // LOGIN
  const loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
    username: 'user123',
    password: 'pass123'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });

  check(loginRes, {
    'login status 201': (r) => r.status === 201,
  });

  const token = `Bearer ${loginRes.json('token')}`;

  // CREAR CARRITO
  const cartRes = http.post(`${BASE_URL}/carts`, null, {
    headers: {
      Authorization: token,
    },
  });

  check(cartRes, {
    'carrito creado': (r) => r.status === 201,
  });

  const cartId = cartRes.json('id');

  // AGREGAR PRODUCTO 1
  const add1 = http.put(`${BASE_URL}/carts/${cartId}/product/1`, null, {
    headers: {
      Authorization: token,
    },
  });

  check(add1, {
    'producto 1 agregado': (r) => r.status === 200,
  });

  // AGREGAR PRODUCTO 2
  const add2 = http.put(`${BASE_URL}/carts/${cartId}/product/2`, null, {
    headers: {
      Authorization: token,
    },
  });

  check(add2, {
    'producto 2 agregado': (r) => r.status === 200,
  });

  // PROCESAR PEDIDO
  const processRes = http.post(`${BASE_URL}/carts/${cartId}/process`, null, {
    headers: {
      Authorization: token,
    },
  });

  check(processRes, {
    'procesamiento iniciado': (r) => r.status === 202,
  });

  sleep(1); // espera 1 segundo entre usuarios
}
