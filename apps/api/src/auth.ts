import { FastifyRequest, FastifyReply } from 'fastify';
import * as jose from 'jose';

// Minimal Supabase JWT verification using JWKS
// Set SUPABASE_JWT_JWKS to the JWKS URL: https://<project>.supabase.co/auth/v1/keys
const JWKS = process.env.SUPABASE_JWT_JWKS;

export async function requireAuth(req: FastifyRequest, res: FastifyReply) {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) throw new Error('Missing token');
    if (!JWKS) throw new Error('JWKS not configured');
    const { payload } = await jose.jwtVerify(token, jose.createRemoteJWKSet(new URL(JWKS)));
    // Attach user to request
    (req as any).user = payload;
  } catch (e: any) {
    res.code(401).send({ error: 'Unauthorized', message: e.message });
  }
}
