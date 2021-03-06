import React from 'react';

import _ from 'lodash';
import Layout from '@coursemaker/gatsby-theme-coursemaker/src/components/layout';
import Section from '@coursemaker/gatsby-theme-coursemaker/src/components/section';
import Breadcrumbs from '@coursemaker/gatsby-theme-coursemaker/src/components/course-breadcrumbs';

const Curriculum = ({ pageContext = {} }) => {
    console.log(pageContext);
    const { school } = pageContext;
    const { course } = pageContext;
    const allCourseLectures = pageContext?.allCourseLectures;
    const { author_display } = course;
    let schoolThemeStyle = school?.schoolThemeStyle;
    if (!schoolThemeStyle) {
        schoolThemeStyle = {
            primaryColor: 'blue',
            secondaryColor: 'blue',
        };
    }

    return (
        <Layout schoolThemeStyle={schoolThemeStyle} pageContext={pageContext}>
            <section className="pt-5">
                <div className="container mx-auto">
                    <Breadcrumbs schoolThemeStyle={schoolThemeStyle} school={school} course={course} />
                </div>
            </section>

            <section id="course" className="pt-12 pb-12 lg:py-20 lg:pb-32">
                <div className="container mx-auto">
                    <div className="mx-auto inner lg:w-8/12">
                        <h1 className="leading-tight">{course.title}</h1>
                        <div className="mb-4 text-2xl font-light text-gray-600">{course.subtitle}</div>
                        <div className="text-lg font-semibold">{author_display?.title}</div>

                        <h2 className="mt-12 mb-6 leading-tight">Curriculum</h2>
                        <div className="curriculum-list space-y-10">
                            {course?.sections.length > 0 ? (
                                course?.sections.map((section, index) => (
                                    <Section
                                        data={section}
                                        size="big"
                                        key={section.id}
                                        allLectures={allCourseLectures}
                                        slug={course.slug}
                                        isCollapse
                                        schoolThemeStyle={schoolThemeStyle}
                                    />
                                ))
                            ) : (
                                <p>No sections yet</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Curriculum;
