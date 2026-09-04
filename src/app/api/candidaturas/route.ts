import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const jobId = formData.get("jobId") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const linkedin = formData.get("linkedin") as string | null;
    const github = formData.get("github") as string | null;
    const resume = formData.get("resume") as File | null;

    if (!jobId || !name || !email) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
    }

    let resumeUrl = null;
    // TODO: Implement actual file upload (e.g., to S3 or similar)


    const application = await prisma.application.create({
      data: {
        jobId,
        name,
        email,
        linkedin,
        github,
        resumeUrl,
      },
    });

    return NextResponse.json({ success: true, applicationId: application.id });
  } catch (error) {
    console.error("Erro ao enviar candidatura:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
