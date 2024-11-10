import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'
import { AuthProvider } from '@/context/AuthProvider'

const RootLayout = () => {
    return (
        <>
            <AuthProvider>
                <Stack>
                    <Stack.Screen name='index' options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </AuthProvider>
        </>
    )
}

export default RootLayout