export type CourseVideoPreviewTypes = {
    duration: number;
    link: string;
    previewImageLink: string;
};

export type MetaTypes = {
    slug: string;
    skills: string[];
    courseVideoPreview: CourseVideoPreviewTypes;
};

export type LessonTypes = {
    duration: number;
    id: string;
    link: string;
    meta: null;
    order: number;
    previewImageLink: string;
    status: string;
    title: string;
    type: string;
}
export type CourseTypes = {
    containsLockedLessons: boolean;
    description: string;
    duration: number;
    id: string;
    launchDate: string;
    lessonsCount: number;
    meta: MetaTypes;
    previewImageLink: string;
    rating: number;
    status: string;
    tags: string[];
    title: string;
    lessons: LessonTypes[];
};


