import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
    return (
        <SafeAreaView className=' bg-primary h-full'>
            <ScrollView>
                <View>
                    <Text>
                        Profile
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile