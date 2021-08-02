import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { useState } from 'react';
import Form from '../components/Form';
import Channels from '../components/Channels';
import ChannelInfo from '../components/ChannelInfo';

export const getStaticProps = async () => {
    const { data } = await axios.post(
        `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`
    );

    return {
        props: { token: data.access_token },
    };
};

const Home = ({ token }) => {
    const [channels, setChannel] = useState([]);
    const [channelInfo, setChannelInfo] = useState(null);
    const [channelVideos, setChannelVideos] = useState([]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Dbilia</title>
            </Head>
            <main className={styles.app}>
                <Form
                    token={token}
                    setChannel={setChannel}
                    setChannelInfo={setChannelInfo}
                />
                <Channels
                    token={token}
                    channels={channels}
                    setChannelInfo={setChannelInfo}
                    setChannelVideos={setChannelVideos}
                />
                {channelInfo && (
                    <ChannelInfo info={channelInfo} videos={channelVideos} />
                )}
            </main>
        </div>
    );
};

export default Home;
