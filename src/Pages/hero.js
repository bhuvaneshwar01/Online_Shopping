import React from 'react';

import classes from './Hero.module.css'
import MainNavigation from '../Components/MainNavigation/MainNavigation';
import Head from '../Components/head/head';

const hero = () => {
    return (
        <section className={classes.head1}>
            <div >
            <Head />
        </div>
        <MainNavigation />
        </section>
    );
};

export default hero;