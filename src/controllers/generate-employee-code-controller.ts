import { FastifyReply, FastifyRequest } from 'fastify';
import { makeGenerateEmployeeCodeService } from '../services/factories/make-generate-employee-code-service';

export const generateEmployeeCodeController = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const generateCodeEmployeeService = makeGenerateEmployeeCodeService();

  const employeeCode = await generateCodeEmployeeService.execute();

  return rep.status(200).send({ code: employeeCode });
};
