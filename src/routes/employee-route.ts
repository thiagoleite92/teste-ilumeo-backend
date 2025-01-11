import { FastifyInstance } from 'fastify';
import { employeeLogController } from '../controllers/employee-log-controller';
import { generateEmployeeCodeController } from '../controllers/generate-employee-code-controller';
import { employeeCodeListController } from '../controllers/employee-codes-list-controller';

export const employeeRoute = async (app: FastifyInstance) => {
  app.get('/codes', employeeCodeListController);
  app.post('/', employeeLogController);
  app.post('/generate-code', generateEmployeeCodeController);
};
