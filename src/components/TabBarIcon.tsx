    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';

    type TabBarIconProps = {
    focused: boolean;
    title: string;
    };

    export default function TabBarIcon({ focused, title }: TabBarIconProps) {
    return (
        <View style={styles.container}>
        <View style={[
            styles.icon,
            focused && styles.iconFocused
        ]} />
        <Text style={[
            styles.text,
            focused && styles.textFocused
        ]}>
            {title}
        </Text>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    icon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#ccc',
        marginBottom: 4,
    },
    iconFocused: {
        backgroundColor: '#007AFF',
    },
    text: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    textFocused: {
        color: '#007AFF',
        fontWeight: '600',
    },
    });