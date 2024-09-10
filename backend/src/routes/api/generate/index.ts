import axios from 'axios';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.post('/', async (req: FastifyRequest, reply: FastifyReply) => {
    const { prompt } = req.body as any;
    try {
      console.log('Generate', prompt);
      reply.send({ message: 'Generation started' });
    } catch (error) {
      console.error('Error generating image', error);
      reply.code(500).send({ message: error });
    }
  });
};
