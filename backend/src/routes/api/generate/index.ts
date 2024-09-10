import axios from 'axios';
import { Buffer } from 'buffer';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { getInferencingEndpoint } from '../../../utils/config';

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.post('/', async (req: FastifyRequest, reply: FastifyReply) => {
    const {
      prompt,
      guidance_scale,
      num_inference_steps,
      crops_coords_top_left,
      width,
      height,
      denoising_limit,
    } = req.body as any;
    try {
      // Prepare the request data with your prompt
      const data = {
        instances: [
          {
            prompt: prompt,
            guidance_scale: guidance_scale,
            num_inference_steps: num_inference_steps,
            crops_coords_top_left: crops_coords_top_left,
            width: width,
            height: height,
            denoising_limit: denoising_limit,
          },
        ],
      };

      // Send a request to your server using axios
      const response = await axios.post(
        getInferencingEndpoint() + '/v1/models/model:predict',
        data,
      );
      const imgStr = response.data.predictions[0].image.b64;

      if (imgStr) {
        // Decode the Base64 string to bytes
        const imgBytes = Buffer.from(imgStr, 'base64');

        // Return the image as a response
        reply
          .header('Content-Type', 'image/png') // Set the correct content type for an image
          .header('Content-Disposition', 'attachment; filename="image.png"') // Set the filename for the image
          .send(imgBytes); // Send the raw image bytes
      } else {
        reply.status(500).send({ error: 'No image data found' });
      }
    } catch (error) {
      console.error('Error generating image', error);
      reply.code(500).send({ message: error });
    }
  });
};
