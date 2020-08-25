import React from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import gareStyles from '../components/gare.module.css'

export const getServerSideProps = async (ctx) => {
    const res = await fetch('https://aquatix.it/wp-json/api/v2/gare');
    const data = await res.json();
    return {
        props: { data }
    }
}

class Gare extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <Head></Head>
                <h2 className={gareStyles.titlepage}>GARE</h2>
                <div className={gareStyles.containerGare}>

                </div>
            </Layout>
        )
    }
}

export default Gare;