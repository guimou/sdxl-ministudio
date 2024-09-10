import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { getInferencingEndpoint } from '../../../utils/config';

export default async (fastify: FastifyInstance): Promise<void> => {
  // Retrieve endpoint settings
  fastify.get('/inferencing_endpoint', async (req: FastifyRequest, reply: FastifyReply) => {
    const hfToken = getInferencingEndpoint();
    const settings = {
      hfToken: hfToken,
    };
    reply.send({ settings });
  });
};
