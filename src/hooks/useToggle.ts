import { useState } from 'react';

type useToggleData = [value: boolean, onOpen: () => void, onClose: () => void];

export const useToggle = (initialValue: boolean): useToggleData => {
    const [value, setValue] = useState(initialValue);

    const onOpen = () => setValue(true);

    const onClose = () => setValue(false);

    return [value, onOpen, onClose];
};
