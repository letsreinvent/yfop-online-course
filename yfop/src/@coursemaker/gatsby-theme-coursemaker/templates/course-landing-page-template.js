import React from 'react';

import { jsx } from 'theme-ui';
import Layout from '@coursemaker/gatsby-theme-coursemaker/src/components/layout';
import Section from '@coursemaker/gatsby-theme-coursemaker/src/components/section';
import Author from '@coursemaker/gatsby-theme-coursemaker/src/components/author';
import LandingVideo from '../components/landing_page/landing-video';
import LandingImage from '@coursemaker/gatsby-theme-coursemaker/src/components/image_landing';
import OverviewSection from '@coursemaker/gatsby-theme-coursemaker/src/components/landing_page/overview-section';
import TestimonialsSection from '@coursemaker/gatsby-theme-coursemaker/src/components/landing_page/testimonials-section';
import FAQSection from '@coursemaker/gatsby-theme-coursemaker/src/components/landing_page/faqs-section';
import ContactSection from '@coursemaker/gatsby-theme-coursemaker/src/components/landing_page/contact-section';
import Icon from '@coursemaker/gatsby-theme-coursemaker/src/components/icon';
import svg from '@coursemaker/gatsby-theme-coursemaker/src/images/icons/icon-courses.svg';
import CTA from '@coursemaker/gatsby-theme-coursemaker/src/components/cta';
import Button from "@coursemaker/gatsby-theme-coursemaker/src/components/button";
import { getProfile, login } from '@coursemaker/gatsby-theme-coursemaker/src/auth/auth';

const CourseLandingPage = ({ pageContext = {} }) => {
    const user = getProfile()
    console.log(user)
    const { school } = pageContext;
    const { course } = pageContext;
    const allCourseLectures = pageContext?.allCourseLectures;
    const landingPage = course?.landing_page;
    let schoolThemeStyle = school?.schoolThemeStyle;
    if (!schoolThemeStyle) {
        schoolThemeStyle = {
            primaryColor: 'blue',
            secondaryColor: 'blue',
        };
    }

    // Section 1 - Intro
    const title = course?.title;
    const subtitle = course?.subtitle;
    let initialCTA = landingPage?.initialCTA;
    if (!initialCTA) {
        initialCTA = {
            text: 'Purchase Course',
            color: 'blue',
            link: 'curriculum',
            textColor: 'white',
        };
    }

    // Section 2 - Media
    const videoID = landingPage?.video_id;
    const imageID = landingPage?.image;

    // Section 3 - Overview

    // Section 4 - Curriculum

    // Section 5 - Testimonials

    // Section 6 - Author(s)
    let { author_display } = course;
    if (author_display){
        // TODO: harmonize strapi so that it returns a list of authors also
        if (!author_display.length){
            author_display = [author_display]
        }
    }
    console.log(pageContext)

    // Section 6 - FAQ

    // Section 7 - CTA
    const closingCTA = landingPage?.closingCTA;
    if (!initialCTA) {
        initialCTA = {
            text: 'Purchase Course',
            color: 'orange',
            link: 'checkout',
            textColor: 'white',
        };
    }

    // Section 8 - Contact

    return (
        <Layout schoolThemeStyle={schoolThemeStyle} pageContext={pageContext}>
            <section className="py-16 md:py-20">
                <div className="container">
                    {landingPage?.image && (
                        <div className="flex-wrap items-center md:flex">
                            <div className="text-center border-gray-300 md:w-1/2 md:border-r left-side lg:pr-20 md:pr-16 md:text-left">
                                <h1 className="mb-4 leading-tight md:mb-6">{title}</h1>
                                <h3 className="mb-4 font-sans font-light opacity-50">{subtitle}</h3>
                                <p className="mx-auto mb-6 text-xl font-light leading-relaxed text-gray-700 md:mb-10 lg:text-xl lg:w-7/12 xl:w-6/12" />

                                <CTA cta={initialCTA} priceInfo={course?.price_info} />
                            </div>
                            {/* left-side */}

                            <div className="mt-10 md:w-1/2 right-side md:mt-0">
                                {landingPage?.image && <LandingImage landing={landingPage?.image} />}
                            </div>
                            {/* right-side  */}
                        </div>
                    )}
                    {!landingPage?.image && (
                        <div>
                            <h1 className="mb-4 text-center">{title}</h1>
                            <h3 className="mb-4 text-center">{subtitle}</h3>
                            <p className="mx-auto text-center mb-6 text-xl font-light leading-relaxed text-gray-700 md:mb-10 lg:text-xl lg:w-7/12 xl:w-6/12" />
                            {initialCTA?.color && (
                                <div className="text-center">
                                    <CTA cta={initialCTA} priceInfo={course?.price_info} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {<LandingVideo videoID={videoID} />}

            {<OverviewSection schoolThemeStyle={schoolThemeStyle} landingPage={landingPage} />}

            <section id="course" className="py-16 bg-gray-200 md:py-24">
                <div className="container mx-auto">
                    <div className="mx-auto inner lg:w-8/12">
                        <div className="mb-12 text-center">
                            <Icon color={schoolThemeStyle.primaryColor} source={svg} />
                            <h2>Curriculum</h2>
                        </div>
                        <div className="curriculum-list space-y-6">
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

            {<TestimonialsSection schoolThemeStyle={schoolThemeStyle} landingPage={landingPage} />}

            {<FAQSection schoolThemeStyle={schoolThemeStyle} landingPage={landingPage} />}

            <h3 className="text-center">In Collaboration With</h3>

            {author_display && author_display.length > 0 && (
                author_display.map((author, index) => (
                    <Author schoolThemeStyle={schoolThemeStyle} author_display={author} />
                ))
            )}

            {closingCTA && (
                <section id="cta" className="py-8 text-center text-white bg-gray-900 lg:py-24">
                    <div className="container">
                        <div className="mx-auto inner lg:w-6/12">
                            <div className="mt-8 btn-wrapper">
                                <Button
                                    text="Get Started"
                                    to="./curriculum"
                                    to={closingCTA?.link}
                                    color="orange"
                                    text_color={closingCTA?.textColor}
                                    variant="primary_orange"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {<ContactSection schoolThemeStyle={schoolThemeStyle} landingPage={landingPage} />}
        </Layout>
    );
};

export default CourseLandingPage;
