// File: /pages/api/auth/signout.js

import { NextApiRequest, NextApiResponse } from 'next';

export default function signout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Redirect to the built-in signout route
    res.redirect('/api/auth/signout');
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}