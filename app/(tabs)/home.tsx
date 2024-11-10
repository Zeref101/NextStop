import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/AuthProvider'

const Home = () => {
    const { user } = useAuth();

    return (
        <View>
            <Text>Hello {user?.username}</Text>
        </View>
    )
}

export default Home