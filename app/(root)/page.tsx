import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import {
  getCurrentUser,
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/authAction";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const user = await getCurrentUser();
  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview ready with AI-Powered Practice</h2>
          <p className="text-lg">
            Practice on real Interview questions and get instant feedback
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
          className="max-sm:hidden "
        />
      </section>
      <section className="flex flex-col gap-2 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You have not taken any interviews yet</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-2 mt-8">
        <h2>Take an interview</h2>
        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>
              No available interviews at the moment, maybe you should create
              some
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
