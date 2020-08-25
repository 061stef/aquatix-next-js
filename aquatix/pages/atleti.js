import React from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import atletiStyle from '../components/atleti.module.css'

export const getServerSideProps = async (ctx) => {
    const res = await fetch('https://aquatix.it/wp-json/api/v2/nuotatori');
    const data = await res.json();
    return {
        props: { data }
    }
}
class Atleti extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: ''
        }
    }
    onChangeHadler(e) {
        let nomescelto = e.target.value.toLowerCase();
        this.setState({
            input: nomescelto,
            showing: true
        })
    }
    async findAthlete(fin){
        const athlete = await fetch('https://aquatix.it/wp-json/api/v2/nuotatori/single?fincode='+fin);
        const single = await athlete.json()
        console.log("single", single);
        console.log("porco dio")
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
            </Layout>
        )
    }
}

export default Atleti