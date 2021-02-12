import React from 'react';
import ReactMarkdown from 'react-markdown';

import Layout from '@coursemaker/gatsby-theme-coursemaker/src/components/layout';

const Privacy = ({ pageContext }) => {
    const { school } = pageContext;
    const privacyDefault = `Custom Text (todo)`
    let privacyPolicy = privacyDefault;
    let schoolThemeStyle = pageContext.school?.schoolThemeStyle;
    if (!schoolThemeStyle) {
        schoolThemeStyle = {
            primaryColor: 'blue',
            secondaryColor: 'blue',
        };
    }

    return (
        <Layout pageContext={pageContext} schoolThemeStyle={schoolThemeStyle}>
            <section className="bg-indigo-100 section-header">
                <div className="container mx-auto lg:w-7/12">
                    <div className="py-8 md:py-12">
                        <h2>Privacy Policy</h2>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container mx-auto lg:w-7/12">
                    <article className="leading-relaxed space-y-5">
                        <ReactMarkdown source={privacyPolicy} />
                    </article>
                </div>
            </section>
        </Layout>
    );
};

export default Privacy;
