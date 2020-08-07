import Head from 'next/head'
import React, { Component } from "react";
import Layout, { siteTitle } from '../components/layout'
import styleHome from '../styles/Home.module.css'


export const getServerSideProps = async (ctx) => {
  const res = await fetch('https://aquatix.it/wp-json/api/v2/gare');
  const data = await res.json();
  return {
    props: { data }
  }
}

class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let tuttegare = this.props.data.gare.slice(0,12)
    console.log("warn", tuttegare)
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
            <ul className={styleHome.listAllRace}>
              {tuttegare.map(item => (
                <li>{item.title}</li>
              ))}
            </ul>
          </div>
          <div className={styleHome.lateralContent}>
            <div className={styleHome.boxNews}></div>
            <div className={styleHome.boxNews}></div>
          </div>
        </div>

      </Layout>
    )
  }

}

export default Home