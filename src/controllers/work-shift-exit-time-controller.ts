import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeWorkShiftExitTimeService } from '../services/factories/make-work-shift-extit-time-service';
import messages from '../utils/messages';

export const workShiftExitTimeController = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const bodySchema = z.object({
    employeeCode: z.string().min(1).max(6),
  });

  const { employeeCode } = bodySchema.parse(req?.body);

  const workShiftExitTimeService = makeWorkShiftExitTimeService();

  const exitTime = await workShiftExitTimeService.execute(employeeCode);

  return rep.status(201).send({ message: messages.successRegister, exitTime });
};
