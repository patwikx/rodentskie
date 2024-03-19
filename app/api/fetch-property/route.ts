// pages/api/properties.ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const properties = await prisma.properties.findMany({
      include: {
        sysUser: {
          select: { name: true, createdAt: true }, // Only include the user's name
        },
      },
    });
    res.json(properties);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}