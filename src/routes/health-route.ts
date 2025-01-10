import { FastifyInstance } from 'fastify';

export const healthRoute = async (app: FastifyInstance) => {
  app.get('/', async (req, rep) => {
    return rep.status(200).send({ status: 'OK' });
  });
};
