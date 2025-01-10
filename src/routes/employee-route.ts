import { employeeLogController } from '@controllers/employee-log-controller';
import { FastifyInstance } from 'fastify';

export const employeeRoute = async (app: FastifyInstance) => {
  app.post('/', employeeLogController);
};
