import fastify from 'fastify';
import cors from '@fastify/cors';
import { ZodError } from 'zod';
import { healthRoute } from '../routes/health-route';
import { employeeRoute } from '../routes/employee-route';
import { ResourceNotFoundError } from '../errors/resource-not-found';
import { env } from '../env';
import { workShiftRoute } from '../routes/work-shift-route';
import { OpenRegisterError } from '../errors/open-register';

export const app = fastify();

app.register(cors, {
  origin: '*',
});

app.register(healthRoute, {
  prefix: '/api/health',
});

app.register(employeeRoute, {
  prefix: '/api/employee',
});

app.register(workShiftRoute, {
  prefix: '/api/work-shift',
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  if (error instanceof ResourceNotFoundError) {
    return reply.status(401).send({ message: error.message });
  }

  if (error instanceof OpenRegisterError) {
    return reply.status(401).send({ message: error.message });
  }

  console.log(error);

  return reply.status(500).send({ message: 'Internal Server Error' });
});
