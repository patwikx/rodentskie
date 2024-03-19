import { PrismaClient } from "@prisma/client";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth"; // Import Session from "next-auth"
import type { NextApiRequest } from "next";

interface ExtendedSession extends Session {
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
    id: string; // Add the id property
    role: string;
  };
}

const prisma = new PrismaClient();
const f = createUploadthing();

const auth = async (req: NextApiRequest) => {
  const session = await getSession({ req }) as ExtendedSession;
  return session?.user?.id || null;
};

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const userId = await auth(req as unknown as NextApiRequest); // Cast req to unknown before casting to NextApiRequest
      if (!userId) throw new UploadThingError("Unauthorized");
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      // Save the file URL in the Properties model
      await prisma.properties.create({
        data: {
          // Assuming you have a userId and imageUrl fields in your Properties model
          sysUserId: metadata.userId,
          propertyImage: file.url,
        },
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;