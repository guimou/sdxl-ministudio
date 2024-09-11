import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { getSDXLEndpoint } from '../../../utils/config';

export default async (fastify: FastifyInstance): Promise<void> => {
  // Retrieve endpoint settings
  fastify.get('/sdxl-endpoint', async (req: FastifyRequest, reply: FastifyReply) => {
    const { endpointUrl, endpointToken } = getSDXLEndpoint();
    const settings = {
      endpointUrl: endpointUrl,
      endpointToken: endpointToken,
    };
    reply.send({ settings });
  });
};
