import Head from 'next/head'
import React, { Component } from "react";
import Layout, { siteTitle } from '../components/layout'
import styleHome from '../styles/Home.module.css'
import Link from 'next/link'


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
    let tuttegare = this.props.data.gare.slice(0, 12)
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
                <a><li>{item.title}</li></a>
              ))}
            </ul>
          </div>
          <div className={styleHome.lateralContent}>
            <div className={styleHome.boxNews}></div>
            <div className={styleHome.boxNews}></div>
          </div>
        </div>
        <div className={styleHome.boxAppAquatix}>
          <h3 className={styleHome.boxAppTitle}>RESTA SEMPRE AGGIORNATO CON L'APP DI AquatiX</h3>
          <div className={styleHome.storeAppContainer}>
            <img src="https://e7.pngegg.com/pngimages/402/719/png-clipart-google-play-google-logo-mobile-app-app-store-play-store-label-text.png"></img>
            <img src="https://cdn.imgbin.com/3/17/0/imgbin-android-google-play-iphone-app-store-android-F2x3SRsgSPtkAMP93LEAkbtVg.jpg"></img>
          </div>
        </div>
      </Layout>
    )
  }

}

export default Home