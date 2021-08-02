import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Form.module.css';

const Form = ({ token, setChannel, setChannelInfo }) => {
    const [input, setInput] = useState('');

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.get(
            `https://api.twitch.tv/helix/search/channels?query=${input}`,
            {
                headers: {
                    'Client-ID': process.env.NEXT_PUBLIC_CLIENT_ID,
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setChannel(data.data);
        setInput('');
        setChannelInfo(null);
    };

    return (
        <form className={styles.form} onSubmit={handleOnSubmit}>
            <input
                type='text'
                name='search'
                id='search'
                placeholder='Search Channels'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={styles.form__input}
            />
        </form>
    );
};

export default Form;
