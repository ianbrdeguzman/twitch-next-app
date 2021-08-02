import styles from '../styles/Channels.module.css';
import axios from 'axios';

const Channels = ({ token, channels, setChannelInfo, setChannelVideos }) => {
    const handleOnClick = async (id) => {
        const { data: info } = await axios.get(
            `https://api.twitch.tv/helix/channels?broadcaster_id=${id}`,
            {
                headers: {
                    'Client-ID': process.env.NEXT_PUBLIC_CLIENT_ID,
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const { data: videos } = await axios.get(
            `https://api.twitch.tv/helix/videos?user_id=${id}`,
            {
                headers: {
                    'Client-ID': process.env.NEXT_PUBLIC_CLIENT_ID,
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setChannelInfo(info.data[0]);
        setChannelVideos(videos.data);
    };

    return (
        <ul className={styles.channels}>
            {channels.map(
                ({
                    id,
                    display_name,
                    game_name,
                    thumbnail_url,
                    title,
                    is_live,
                }) => {
                    return (
                        <li
                            key={id}
                            className={styles.channel__item}
                            onClick={() => handleOnClick(id)}
                        >
                            <img
                                src={thumbnail_url}
                                alt={display_name}
                                className={styles.channel__image}
                            />
                            <div className={styles.channel__info}>
                                <p className={styles.channel__info__name}>
                                    {display_name}
                                </p>
                                <p>Playing {game_name}</p>
                                <p className={styles.channel__info__title}>
                                    {title}
                                </p>
                                {is_live && (
                                    <p className={styles.channel__info__live}>
                                        Is Live
                                    </p>
                                )}
                            </div>
                        </li>
                    );
                }
            )}
        </ul>
    );
};

export default Channels;
