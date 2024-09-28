// Configure the client
import {Api, TonApiClient} from "@ton-api/client";

const http = new TonApiClient({
  baseUrl: 'https://tonapi.io',
  apiKey: 'AFOW3GTM73SZHRAAAAAKQA3ZY2P2LODZ6CTCTG5XHTON5G3PJ3R2ELEIOIIQY2V3Z6DANFQ'
});

// Initialize the API
export const TONApi = new Api(http);
