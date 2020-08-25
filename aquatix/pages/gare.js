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
        this.state = {
            date: null
        }
    }

    onChangeDate(e) {
        console.log(e.target.value)
        this.setState({
            date: e.target.value+'T00:00:00.000Z'
        })
    }
    clearData(){
        this.setState({
            date: null
        })
    }

    render() {
        let gare;
        if (this.state.date !== null) {
            gare = this.props.data.gare.filter((garasingola) => {
                return garasingola.dates.includes(this.state.date)
            })
        }else{
            gare =  this.props.data.gare;
        }

        console.log("warn", this.props.data)
        return (
            <Layout>
                <Head></Head>
                <h2 className={gareStyles.titlepage}>GARE</h2>
                <input type="date" className={gareStyles.inputDate} onChange={this.onChangeDate.bind(this)}></input>
                <div onClick={this.clearData.bind(this)}>Clear data</div>
                <div className={gareStyles.containerGare}>
                    {gare.map(gara => (
                        <div className={gareStyles.boxGara}>
                            <div className={gareStyles.bannerGara}>{gara.place}</div>
                            <p>{gara.title}</p>
                            <p>{gara.dates}</p>
                        </div>
                    ))}
                </div>
            </Layout>
        )
    }
}

export default Gare;