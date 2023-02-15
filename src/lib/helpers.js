import dotenv from 'dotenv';
dotenv.config();
const { DOMAIN } = process.env;

export const makeURL = (image) => {
  return `${DOMAIN}/images/${image}`;
};
