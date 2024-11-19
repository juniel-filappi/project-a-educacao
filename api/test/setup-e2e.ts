import 'dotenv/config';

import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';

const prisma = new PrismaClient();

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  const url = new URL(process.env.DATABASE_URL);

  url.pathname = `/${schemaId}`;

  return url.toString();
}

const schemaId = randomUUID();

beforeAll(async () => {
  process.env.DATABASE_URL = generateUniqueDatabaseURL(schemaId);

  execSync('yarn prisma migrate deploy --preview-feature', {
    stdio: 'inherit',
  });
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(
    'DROP DATABASE IF EXISTS ' + '`' + schemaId + '`',
  );
  await prisma.$disconnect();
});
