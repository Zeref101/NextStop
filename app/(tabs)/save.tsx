import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const save = () => {
    return (
        <SafeAreaView className=' bg-primary h-full'>
            <ScrollView>
                <View>
                    <Text>
                        Saved Places
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default save