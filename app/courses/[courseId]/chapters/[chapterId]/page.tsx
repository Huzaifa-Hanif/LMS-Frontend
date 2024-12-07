"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Axios from "@/app/utils/axiosInstance";
import { VideoPlayer } from "./_components/video-player";
import { Banner } from "@/components/banner";
import { CourseProgressButton } from "./_components/course-progress-button";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File } from "lucide-react";
import { URL } from "@/app/constants/apiEndpoints";

// type Params = {
//   courseId: string;
//   chapterId: string;
// };

// const ChapterIdPage = ({ params }: { params: Params }) => {
//   const { courseId, chapterId } = params;

type Params = Promise<{ courseId: string; chapterId: string }>;

const ChapterIdPage = (props: { params: Params }) => {
  // const { courseId } =React.use(params);
  let params = use(props.params);
  const courseId = params.courseId;
  const chapterId = params.chapterId;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `${URL.GET_CHAPTER_COURSE_ID + courseId}&chapterId=${chapterId}`
        );
        // console.log(response, "39393939");
        if (response.data.error) {
          setError(response.data.error);
          return;
        }
        setData(response.data);
      } catch (err) {
        setError("Error fetching data" + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, chapterId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = data;

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={chapterId}
            title={chapter.title}
            courseId={courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={chapterId}
                courseId={courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton courseId={courseId} price={course.price!} />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
