import { makeEmployeeLogService } from '@services/factories/make-employee-log-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const workShiftEntryTimeController = async (
  req: FastifyRequest,
  rep: FastifyReply,
) => {
  const bodySchema = z.object({
    employeeCode: z.string().min(1).max(6),
  });

  const { employeeCode } = bodySchema.parse(req?.body);

  const employeeLogService = makeEmployeeLogService();

  const employeeLogResponse = await employeeLogService.execute(employeeCode);

  return rep.status(200).send({ employeeLogResponse });
};
