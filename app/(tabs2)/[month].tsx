import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const january = () => {
    const { month } = useLocalSearchParams()

    return (
        <SafeAreaView className=' bg-primary w-full h-full'>

        </SafeAreaView>
    )
}

export default january