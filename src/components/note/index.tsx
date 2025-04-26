import { Alert } from 'antd';
import { useNoteStore } from '../../store/note';
import { useEffect } from 'react';

export const Note: React.FC = () => {
    const { message, type, cleanMessage } = useNoteStore();

    useEffect(() => {
        if (!!message?.length) {
            setTimeout(() => {
                cleanMessage();
            }, 3000);
        }
    }, [message]);

    return (
        !!message?.length ?
            <Alert
                message=""
                description={message}
                type={type}
                closable
                onClose={() => cleanMessage}
            /> : null
    )
};
