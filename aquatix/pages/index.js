import Head from 'next/head'
import React, { Component } from "react";
import Layout, { siteTitle } from '../components/layout'
import styleHome from '../styles/Home.module.css'


class Home extends Component {
  render() {
    return (
      <Layout>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <div className={styleHome.containerGareNews}>
          <div className={styleHome.lateralContent}>
            <div className={styleHome.boxNews}></div>
            <div className={styleHome.boxNews}></div>
          </div>
          <div className={styleHome.centerBoxNews}>
            <div className={styleHome.ultimegareTitle}>ULTIME GARE</div>
          </div>
          <div className={styleHome.lateralContent}>
          <div className={styleHome.boxNews}>Ciao</div>
          <div className={styleHome.boxNews}></div>
          </div>
        </div>
        
      </Layout>
    )
  }

}

export default Home