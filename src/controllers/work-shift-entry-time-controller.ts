import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeWorkShiftEntryService } from '../services/factories/make-work-shift-entry-service';
import messages from '../utils/messages';

export const workShiftEntryTimeController = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const bodySchema = z.object({
    employeeCode: z.string().min(1).max(6),
  });

  const { employeeCode } = bodySchema.parse(req?.body);

  const workShiftEntryService = makeWorkShiftEntryService();

  const entryTime = await workShiftEntryService.execute(employeeCode);

  return rep.status(201).send({ message: messages.successRegister, entryTime });
};
