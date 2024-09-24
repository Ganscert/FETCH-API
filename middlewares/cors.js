import cors from 'cors';

export const corsMiddleware = cors({
  origin: '*', // Acepta todas las solicitudes de cualquier origen
});
