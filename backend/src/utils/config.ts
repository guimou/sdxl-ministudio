// Initial configuration
let sdxlEndpointURL = process.env.SDXL_ENDPOINT_URL || '';
let sdxlEndpointToken = process.env.SDXL_ENDPOINT_TOKEN || '';

export const getSDXLEndpoint = (): any => {
  return { sdxlEndpointURL, sdxlEndpointToken };
};

export const setSDXLEndpoint = (url: string, token: string): void => {
  sdxlEndpointURL = url;
  sdxlEndpointToken = token;
};
