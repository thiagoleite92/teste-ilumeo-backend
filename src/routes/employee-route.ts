import { FastifyInstance } from 'fastify';
import { employeeLogController } from '../controllers/employee-log-controller';
import { generateEmployeeCodeController } from '../controllers/generate-employee-code-controller';

export const employeeRoute = async (app: FastifyInstance) => {
  app.post('/', employeeLogController);
  app.post('/generate-code', generateEmployeeCodeController);
};
