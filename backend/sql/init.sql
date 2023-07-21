SELECT 'CREATE DATABASE capstonedb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'capstonedb')\gexec