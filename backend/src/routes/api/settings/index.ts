import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { getSDXLEndpoint, setSDXLEndpoint } from '../../../utils/config';

export default async (fastify: FastifyInstance): Promise<void> => {
  // Retrieve endpoint settings
  fastify.get('/sdxl-endpoint', async (req: FastifyRequest, reply: FastifyReply) => {
    const endpointUrl = getSDXLEndpoint().sdxlEndpointURL;
    const endpointToken = getSDXLEndpoint().sdxlEndpointToken;
    const settings = {
      endpointUrl: endpointUrl,
      endpointToken: endpointToken,
    };
    console.log(settings);
    reply.send({ settings });
  });

  // Update endpoint settings
  fastify.put('/sdxl-endpoint', async (req: FastifyRequest, reply: FastifyReply) => {
    const { endpointUrl, endpointToken } = req.body as any;
    setSDXLEndpoint(endpointUrl, endpointToken);
    reply.send({ message: 'Settings updated successfully!' });
  });
};
