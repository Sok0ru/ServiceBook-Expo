    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';

    type TabBarIconProps = {
    focused: boolean;
    title: string;
    iconName: keyof typeof Ionicons.glyphMap;
    };

    export default function TabBarIcon({ focused, title, iconName }: TabBarIconProps) {
    return (
        <View style={styles.container}>
        <Ionicons 
            name={iconName} 
            size={24} 
            color={focused ? '#007AFF' : '#666'} 
        />
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
    text: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
        marginTop: 4,
    },
    textFocused: {
        color: '#007AFF',
        fontWeight: '600',
    },
    });