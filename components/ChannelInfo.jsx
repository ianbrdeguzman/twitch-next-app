import styles from '../styles/ChannelInfo.module.css';
import ReactPlayer from 'react-player';
import numeral from 'numeral';
import moment from 'moment';

const ChannelInfo = ({ info, videos }) => {
    const {
        broadcaster_id,
        broadcaster_language,
        broadcaster_login,
        broadcaster_name,
        game_id,
        game_name,
        title,
    } = info;

    console.log(videos);

    return (
        <div className={styles.info}>
            <div className={styles.info__description}>
                <p>
                    Broad Caster ID: <span>{broadcaster_id}</span>
                </p>
                <p>
                    Broad Caster Language: <span>{broadcaster_language}</span>
                </p>
                <p>
                    Broad Caster Login: <span>{broadcaster_login}</span>
                </p>
                <p>
                    Broad Caster Name: <span>{broadcaster_name}</span>
                </p>
                <p>
                    Game ID: <span>{game_id}</span>
                </p>
                <p>
                    Game Name: <span>{game_name}</span>
                </p>
                <p>
                    Title: <span>{title}</span>
                </p>
            </div>
            <ul className={styles.info__videos}>
                {videos.map(
                    ({
                        id,
                        url,
                        title,
                        description,
                        view_count,
                        published_at,
                        thumbnail_url,
                    }) => {
                        const thumbnail = thumbnail_url.replace(
                            '%{width}x%{height}',
                            '300x150'
                        );
                        return (
                            <li key={id} className={styles.info__videos__item}>
                                <div
                                    className={
                                        styles.info__videos__item__player
                                    }
                                >
                                    <ReactPlayer
                                        url={url}
                                        width='100%'
                                        height='100%'
                                        playing={false}
                                        muted={true}
                                        light={thumbnail}
                                    />
                                </div>
                                <div
                                    className={
                                        styles.info__videos__item__description
                                    }
                                >
                                    <p
                                        className={
                                            styles.info__videos__item__description__title
                                        }
                                    >
                                        {title}
                                    </p>
                                    <p
                                        className={
                                            styles.info__videos__item__description__description
                                        }
                                    >
                                        {description}
                                    </p>
                                    <p>{moment(published_at).format('ll')}</p>
                                    <p>
                                        {numeral(view_count).format('0,0a')}{' '}
                                        views
                                    </p>
                                </div>
                            </li>
                        );
                    }
                )}
            </ul>
        </div>
    );
};

export default ChannelInfo;
