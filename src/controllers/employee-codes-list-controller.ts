import { FastifyReply, FastifyRequest } from 'fastify';
import { makeEmployeeCodeListService } from '../services/factories/make-employee-code-list-service';

export const employeeCodeListController = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const employeeCodeListService = makeEmployeeCodeListService();

  const employeeCodes = await employeeCodeListService.execute();

  return rep.status(200).send({ employeeCodes });
};
