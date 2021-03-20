import React, { useEffect, useState } from 'react';
import { Link, navigate } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Markdown from '@coursemaker/gatsby-theme-coursemaker/src/helpers/StrapiMarkdown/Markdown';
import LayoutLecture from '@coursemaker/gatsby-theme-coursemaker/src/components/layout-lecture';
import Breadcrumbs from '@coursemaker/gatsby-theme-coursemaker/src/components/course-breadcrumbs';
import Video from '@coursemaker/gatsby-theme-coursemaker/src/components/video';
import { isAuthenticated, login, getProfile } from '@coursemaker/gatsby-theme-coursemaker/src/auth/auth';
import { bakeLocalStorage, readLocalStorage } from '@coursemaker/gatsby-theme-coursemaker/src/helpers/storage';
import Button from "@coursemaker/gatsby-theme-coursemaker/src/components/button";


const LectureTemplate = ({ pageContext = {} }) => {
    const [certificateUrl, setCertificateUrl] = useState(null)

    let profile = getProfile()
    let fullName;

    useEffect(() => {
        if (!isAuthenticated()) {
            login();
            return <p>Redirecting to login...</p>;
        } else {
            try {
                if ('https://youthforourplanet.letsreinvent.org/user_metadata' in profile){
                    // user just logged in
                    fullName = profile['https://youthforourplanet.letsreinvent.org/user_metadata']['full_name']
                    localStorage.setItem('fullName', fullName);
                } else {
                    // user previously logged in or not authenticated
                    fullName = localStorage.getItem("fullName");
                }
            } catch(err) {
                console.error(err)
            }
        }
    });

    const currentCourse = pageContext.course;
    const { lecture } = pageContext;
    const lectureTitle = lecture?.title
    let lectureNameLower = null;
    if (lectureTitle){
        lectureNameLower = lectureTitle.toLowerCase()
    }

    let schoolThemeStyle = pageContext.school?.schoolThemeStyle;
    if (!schoolThemeStyle) {
        schoolThemeStyle = {
            primaryColor: 'blue',
            secondaryColor: 'blue',
        };
    }

    const allLectures = pageContext?.allLectures;
    const nextLecture = pageContext?.nextLecture;
    const previousLecture = pageContext?.previousLecture;

    let nextLectureSlug = '../curriculum';
    if (nextLecture && nextLecture.hasOwnProperty('order') && nextLecture.order !== null) {
        nextLectureSlug = `${nextLecture.id}${nextLecture.order}`;
    } else if (nextLecture && !nextLecture?.order) {
        nextLectureSlug = `${nextLecture.id}`;
    }

    let previousLectureSlug = '../curriculum';
    if (previousLecture && previousLecture.hasOwnProperty('order') && previousLecture.order !== null) {
        previousLectureSlug = `${previousLecture.id}${previousLecture.order}`;
    } else if (previousLecture && !previousLecture?.order) {
        previousLectureSlug = `${previousLecture.id}`;
    }

    let lecture_body;
    if (lecture.body)
        // local source
        lecture_body = <MDXRenderer>{lecture.body}</MDXRenderer>;
    // strapi
    else lecture_body = <Markdown source={lecture.body_markdown} />;

    const addLectureToComplete = async (lecture) => {
        const state = readLocalStorage(currentCourse.slug);
        const newState = {
            items: [...((state && state?.items) || [])],
        };

        const exists = newState?.items?.some((item) => item?.id === lecture?.id);

        if (exists) newState.items = newState?.items.map((item) => (item?.id === lecture?.id ? { ...item } : item));
        else newState.items = [...newState.items, { id: lecture?.id }];

        bakeLocalStorage(currentCourse.slug, newState);
    };

    const getSectionTitleFromLecture = () => {
        // default
        let sectionName = 'Youth For Our Planet';
        let sections = currentCourse?.sections;
        if (sections.length){
            sections.map(aSection => {
                let sectionLectures = aSection?.lectures
                if (sectionLectures){
                    sectionLectures.map(aLecture => {
                        if (aLecture.id === lecture.id){
                            sectionName = aSection?.title;
                            sectionName = sectionName.split(':')[1]
                        }
                    })
                }
            })
        }
        return sectionName;
    }

    // TODO: check if last lecture in section
    const handleSubmit = (event) => {
        event.preventDefault();
        let sectionName = getSectionTitleFromLecture();
        let baseUrl = 'https://api.coursemaker.io/api/v1'
        let fullUrl = `${baseUrl}/completion-certificates/certificate/?student_name=${fullName}&section_name=${sectionName}`
        setCertificateUrl(fullUrl)
    }

    return (
        <LayoutLecture
            schoolThemeStyle={schoolThemeStyle}
            pageContext={pageContext}
            lecture={lecture}
            lectureList={allLectures}
            totalLectures={allLectures.length}
            currentCourse={currentCourse}
        >
            {/* video */}
            {<Video videoID={lecture?.video_id} />}

            {/* course header */}
            <div className="pt-5 border-b border-gray-300">
                <div className="container lg:max-w-full">
                    <Breadcrumbs
                        school={pageContext.school}
                        course={currentCourse}
                        lecture={lecture}
                        schoolThemeStyle={schoolThemeStyle}
                    />
                    <div className="items-end justify-between pt-4 pb-6 lg:flex">
                        <div>
                            <h2 className="leading-tight">{lecture.title}</h2>
                        </div>

                        {/* .controls */}
                        <div className="flex mt-5 controls space-x-6 lg:mt-0">
                            <Link to={`../${previousLectureSlug}`} className="btn btn-gray">
                                Previous
                            </Link>
                            <Link
                                onClick={async () => {
                                    await addLectureToComplete(nextLecture);
                                }}
                                to={`../${nextLectureSlug}`}
                                className={`btn bg-${schoolThemeStyle?.primaryColor}-500 text-white`}
                            >
                                Next
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* course content */}
            <div className="w-full py-12 mx-auto lg:py-16 lg:w-9/12">
                <div className="container">
                    <div className="font-light leading-relaxed text-gray-700 description space-y-4 lg:w-11/12">
                        {lecture_body}
                    </div>
                </div>
            </div>

            {lectureNameLower === 'reflection' && (
                <div className="w-full py-12 mx-auto lg:py-16 lg:w-9/12">
                    <div className="container">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="pb-2">
                                <input type="checkbox" name="send_newsletter" id="send_newsletter" />
                                <label for="send_newsletter">   I have completed the module</label>
                            </div>
                            <div>
                                <input type="submit" className={`btn text-white bg-orange-500 btn`}Submit/>
                            </div>
                        </form>
                        {certificateUrl && (
                            <Link className={`text-blue-700`} to={certificateUrl}>-> Download Completion Certificate</Link>
                        )}
                    </div>
                </div>
            )}
        </LayoutLecture>
    );
};

export default LectureTemplate;
