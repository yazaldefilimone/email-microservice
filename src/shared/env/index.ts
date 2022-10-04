import { config } from "dotenv";
config();
export const env = {
  host: String(process.env.HOST),
  stripe_key: String(process.env.STRIPE_API_KEY),
  port: Number(process.env.PORT),
  secure: Boolean(process.env.SECURE),
};
