    import { useState, useRef } from 'react';
    import { TextInput } from 'react-native';

    export const useCodeInput = (length = 6) => {
    const [code, setCode] = useState(Array(length).fill(''));
    const refs = useRef<TextInput[]>([]);

    const onChange = (text: string, index: number) => {
        if (/^\d?$/.test(text)) {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
        if (text && index < length - 1) refs.current[index + 1]?.focus();
        }
    };

    const onKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
        refs.current[index - 1]?.focus();
        }
    };

    return { code, refs, onChange, onKeyPress, isComplete: code.every((c) => c !== '') };
    };