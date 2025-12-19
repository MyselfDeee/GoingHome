import dotenv from 'dotenv';

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  supabaseUrl: process.env.SUPABASE_URL ?? 'https://guucarfnghsgisvdoxnt.supabase.co',
  supabaseServiceKey:
    process.env.SUPABASE_SERVICE_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1dWNhcmZuZ2hzZ2lzdmRveG50Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDIyNzAxNCwiZXhwIjoyMDc5ODAzMDE0fQ.OwJU7pMvk57Iw_wpPncclzVrZlmc0tCXh4_iW1yIAgo',
  jwtSecret: process.env.JWT_SECRET ?? 'supersecretkey'
};

if (Number.isNaN(env.port)) {
  throw new Error('PORT must be a number');
}

export default env;
