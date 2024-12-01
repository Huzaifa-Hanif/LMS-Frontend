const isNest = process.env.NEXT_PUBLIC_API_BACKEND === "true";

export const URL = {
  REGISTER_USER: isNest ? "/auth/register" : "/api/auth/register",
  CREATE_COURSE: isNest ? "/courses/" : "/api/courses/",
  GET_COURSES: isNest ? "/courses" : "/api/courses/",
  UPDATE_COURSE: isNest ? "/courses/" : "/api/courses/",
  GET_CHAPTER: isNest ? "/chapters/" : "/api/courses/",
  UPLOAD: "/upload",
  PUBLISH: "/publish",
  UN_PUBLISH: "/unpublish",
  CHAPTERS: isNest ? "/chapters/" : "/chapters/",
  REORDER: "reorder",
  CATEGORIES_AND_COURSES: isNest
    ? "categories-and-courses"
    : "/api/categories-and-courses",
  LOGIN_USER: "/auth/login",
  COURSE_UNIQUE: isNest ? "/courses/courseUnique/" : "/api/courseUnique/",
  COURSE_WITH_PROGRESS: isNest
    ? "/courses/course-with-progress/"
    : "/api/course/",

  PURCHASES: isNest ? "/purchases/?courseId" : "/api/purchases/?courseId",
  GET_CHAPTER_COURSE_ID: isNest
    ? "/chapters/get-chapter/?courseId="
    : "/api/get-chapter/?courseId=",

  CREATE_CHAT: isNest ? "/chats" : "/api/chats",
  UPDATE_CHAT: isNest ? "/chats" : "/api/chats",
  DELETE_CHAT: isNest ? "/chats" : "/api/chats",
  GET_CHATS: isNest ? "/chats?userId=" : "/api/chats?userId=",
  // GET_COURSES: "/courses",
  // CREATE_COURSE: "/courses/",
  // UPDATE_COURSE_NEST: "/courses/",
  // UPLOAD: "/upload",
};
