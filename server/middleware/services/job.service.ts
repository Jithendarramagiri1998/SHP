import { db } from "../db";
import { jobs } from "../../shared/schema";
import { eq } from "drizzle-orm";

/* =========================
   TYPES
========================= */

interface JobInput {
  title: string;
  company: string;
  location?: string;
  description?: string;
  url?: string;
  experienceRequired?: string;
}

/* =========================
   JOB SERVICE
========================= */

export class JobService {

  /* =========================
     CREATE JOB
  ========================= */

  static async createJob(data: JobInput, userId: string) {
    const [job] = await db.insert(jobs).values({
      ...data,
      userId,
    }).returning();

    return job;
  }

  /* =========================
     GET JOBS (PAGINATION)
  ========================= */

  static async getJobs(page = 1, limit = 6) {
    const offset = (page - 1) * limit;

    const data = await db
      .select()
      .from(jobs)
      .limit(limit)
      .offset(offset);

    return data;
  }

  /* =========================
     GET SINGLE JOB
  ========================= */

  static async getJobById(id: string) {
    const job = await db.query.jobs.findFirst({
      where: (j, { eq }) => eq(j.id, id),
    });

    if (!job) {
      throw new Error("Job not found");
    }

    return job;
  }

  /* =========================
     UPDATE JOB
  ========================= */

  static async updateJob(id: string, data: Partial<JobInput>, user: any) {
    const job = await this.getJobById(id);

    // 🔐 Ownership check
    if (job.userId !== user.id && user.role !== "admin") {
      throw new Error("Not authorized to update");
    }

    await db
      .update(jobs)
      .set(data)
      .where((j, { eq }) => eq(j.id, id));

    return { success: true };
  }

  /* =========================
     DELETE JOB
  ========================= */

  static async deleteJob(id: string, user: any) {
    const job = await this.getJobById(id);

    // 🔐 Ownership or admin
    if (job.userId !== user.id && user.role !== "admin") {
      throw new Error("Not authorized to delete");
    }

    await db
      .delete(jobs)
      .where((j, { eq }) => eq(j.id, id));

    return { success: true };
  }
}
