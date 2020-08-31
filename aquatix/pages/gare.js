import React from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import gareStyles from '../components/gare.module.css'
import axios from 'axios';


export const getServerSideProps = async (ctx) => {
    const res = await fetch('https://aquatix.it/wp-json/api/v2/gare');
    const data = await res.json();
    return {
        props: { data }
    }
}

export default class Gare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            showmodal: false,
            fetchUser: '',
            html: ''
        }
    }

    onChangeDate(e) {
        console.log(e.target.value)
        this.setState({
            date: e.target.value + 'T00:00:00.000Z'
        })
    }
    clearData() {
        this.setState({
            date: null
        })
    }

    openModal(e) {
        let idGara = e.target.getAttribute('data-id');
        axios.get('https://aquatix.it/wp-json/api/v2/gara?id=' + idGara)
            .then((response) => {
                this.setState({
                    fetchUser: response.data.results
                });
                console.log("fetchUser", this.state.fetchUser);
                const returnedHtml = Object.keys(this.state.fetchUser);
                const finalHtml = returnedHtml.map(challenge => {
                    return <p>{challenge}</p>
                });


                console.log(returnedHtml)
                this.setState({
                    showmodal: !this.state.showmodal,
                    html: <>{finalHtml}</>
                })
            })
            .catch((error) => {
                console.log(error);
            });

    }
    closeModal() {
        this.setState({
            showmodal: !this.state.showmodal
        })
    }

    render() {
        let gare;
        if (this.state.date !== null) {
            gare = this.props.data.gare.filter((garasingola) => {
                return garasingola.dates.includes(this.state.date)
            })
        } else {
            gare = this.props.data.gare;
        }

        return (
            <Layout>
                <Head></Head>
                <h2 className={gareStyles.titlepage}>GARE</h2>
                <input type="date" className={gareStyles.inputDate} onChange={this.onChangeDate.bind(this)}></input>
                <div onClick={this.clearData.bind(this)} className={gareStyles.clearDataButton}>Reset data</div>
                <div className={gareStyles.containerGare}>
                    {gare.map(gara => (
                        <div className={gareStyles.boxGara} onClick={this.openModal.bind(this)} data-id={gara.id}>
                            <div className={gareStyles.bannerGara} data-id={gara.id}>{gara.place}</div>
                            <p data-id={gara.id}>{gara.title}</p>
                        </div>
                    ))}
                </div>
                <div id="myModal" className={gareStyles.modal} style={{ display: this.state.showmodal ? 'block' : 'none' }}>


                    <div className={gareStyles.modalContent}>
                        <span className={gareStyles.close} onClick={this.closeModal.bind(this)}>&times;</span>
                        {this.state.html}
                    </div>

                </div>
            </Layout>
        )
    }
}

 