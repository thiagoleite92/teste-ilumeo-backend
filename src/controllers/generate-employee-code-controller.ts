import { FastifyReply, FastifyRequest } from 'fastify';
import { makeGenerateEmployeeCodeService } from '../services/factories/make-generate-employee-code-service';

export const generateEmployeeCodeController = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const generateCodeEmployeeService = makeGenerateEmployeeCodeService();

  const { employeeCode, id } = await generateCodeEmployeeService.execute();

  return rep.status(201).send({ id, employeeCode });
};
