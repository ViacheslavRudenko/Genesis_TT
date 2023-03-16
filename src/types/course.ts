export type CourseVideoPreviewTypes = {
    id: string;
    title: string;
    videoLink: string;
};

export type MetaTypes = {
    slug: string;
    skills: string[];
    courseVideoPreview: CourseVideoPreviewTypes;
};

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
};


