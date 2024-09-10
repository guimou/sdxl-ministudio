// Initial configuration
const inferencingEndpoint = process.env.INFERENCING_ENDPOINT || '';

export const getInferencingEndpoint = (): string => {
  return inferencingEndpoint;
};
