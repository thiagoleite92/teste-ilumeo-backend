import { FastifyInstance } from 'fastify';
import { workShiftEntryTimeController } from '../controllers/work-shift-entry-time-controller';
import { workShiftExitTimeController } from '../controllers/work-shift-exit-time-controller';

export const workShiftRoute = async (app: FastifyInstance) => {
  app.post('/entry-time', workShiftEntryTimeController);
  app.post('/exit-time', workShiftExitTimeController);
};
