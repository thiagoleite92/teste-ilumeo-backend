import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeEmployeeLogService } from '../services/factories/make-employee-log-service';

export const employeeLogController = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const bodySchema = z.object({
    employeeCode: z.string().min(1).max(6),
  });
  const { employeeCode } = bodySchema.parse(req?.body);

  const employeeLogService = makeEmployeeLogService();

  const employeeLogs = await employeeLogService.execute(employeeCode);

  return rep.status(200).send({ employeeLogs });
};
