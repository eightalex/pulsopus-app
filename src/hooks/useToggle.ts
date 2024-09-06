import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';

export const useToggle = (
    defaultValue?: boolean
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
    const [value, setValue] = useState(Boolean(defaultValue));

    const toggle = useCallback(() => {
        setValue(prev => !prev);
    }, []);

    return [value, toggle, setValue];
};