import React from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import atletiStyle from '../components/atleti.module.css'
import axios from 'axios';

export const getServerSideProps = async (ctx) => {
    const res = await fetch('https://aquatix.it/wp-json/api/v2/nuotatori');
    const data = await res.json();
    return {
        props: { data: data }
    }
}
class Atleti extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            showmodal: false,
            fetchUser: '',
            html: '',
            showLoader: true,
            accordion: false
        }
    }
    onChangeHadler(e) {
        let nomescelto = e.target.value.toLowerCase();
        this.setState({
            input: nomescelto,
            showing: true
        })
    }
    toggleAccordion(){
        let pannello = document.querySelectorAll('.panel');
        for (let index = 0; index < pannello.length; index++) {
            const element = pannello[index];
            if(element.style.display == 'none'){
                element.style.display = 'block'
            }else{
                element.style.display = 'none'
            }
            
            
        }
    }
    findAthlete(fin) {
        this.setState({
            showmodal: !this.state.showmodal,
        })
        axios.get('https://aquatix.it/wp-json/api/v2/nuotatori/single?fincode=' + fin)
            .then((response) => {
                this.setState({
                    fetchUser: response.data
                });
                console.log("fetchUser", this.state.fetchUser);
                let name = this.state.fetchUser.fullname;
                let profileimg = this.state.fetchUser.image;
                let team = this.state.fetchUser.team;
                let year = this.state.fetchUser.year;
                let results = this.state.fetchUser.data.results;
                const record = results.map(risultati => {
                    return <p class="panel" style={{ display: "none" }}>{risultati.battery} {risultati.time}</p>
                })
                this.setState({
                    html: <> <p className={atletiStyle.nomeAthlete}>{name}</p>
                        <img src={profileimg} className={atletiStyle.imgProfile}></img>
                        <p>{team}</p>
                        <p>{year}</p>
                        <div onClick={this.toggleAccordion.bind(this)} className={atletiStyle.accordion}>Tutti i record</div>
                        {record} </>,
                        showLoader: false
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    closeModal() {
        this.setState({
            showmodal: !this.state.showmodal,
            showLoader: true,
            html: ''
        })
    }

    render() {
        let tuttigliAtleti = this.props.data.filter((contact) => {
            return contact.fullname.toLowerCase().indexOf(this.state.input) !== -1;
        });

        return (
            <Layout>
                <Head></Head>
                <h2 className={atletiStyle.titlepage}>ATLETI</h2>
                <input value={this.state.input} type="text" onChange={this.onChangeHadler.bind(this)} className={atletiStyle.inputSearch} placeholder="Cerca nuotatore" />
                <div className={atletiStyle.containerAtleti}  >
                    {tuttigliAtleti.map(atleta => (
                        <div className={atletiStyle.boxAtleta} data-fincode={atleta.fincode} onClick={this.findAthlete.bind(this, atleta.fincode)} >
                            <img src={atleta.image}></img>
                            <div className={atletiStyle.boxNomeAtleta}>{atleta.first_name} {atleta.last_name}</div>
                        </div>
                    ))}
                </div>
                <div id="myModal" className={atletiStyle.modal} style={{ display: this.state.showmodal ? 'block' : 'none' }}>


                    <div className={atletiStyle.modalContent}>
                        <span className={atletiStyle.close} onClick={this.closeModal.bind(this)}>&times;</span>
                        <div className={atletiStyle.loader} style={{ display: this.state.showLoader ? 'block' : 'none'}}></div>
                        {this.state.html}
                    </div>

                </div>
            </Layout>
        )
    }
}

export default Atleti