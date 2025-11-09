    import React from 'react';
    import { View, Image, StyleSheet } from 'react-native';

    type AuthIconProps = {
    size?: number;
    };

    export default function AuthIcon({ size = 100 }: AuthIconProps) {
    return (
        <View style={styles.container}>
        <Image 
            source={require('../assets/icons/auth-icon.png')}
            style={{
            width: size,
            height: size,
            }}
            resizeMode="contain"
        />
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 40,
    },
    });