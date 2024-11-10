import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/AuthProvider'
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import SearchInput from '@/components/SearchInput';

const Home = () => {
    const { user } = useAuth();

    return (
        <SafeAreaView className=' bg-primary h-full'>
            <ScrollView>
                <View className='flex-1 justify-center gap-4 p-4 mt-4'>
                    <View className=' flex-row justify-between'>
                        <View className=' flex-1 gap-2'>
                            <Text className='text-base font-pregular text-white'>Welcome Back</Text>
                            <Text className=' font-psemibold text-[22px] text-white'>{user?.username}</Text>
                        </View>
                        <Image
                            source={require("../../assets/images/logo-small-3.png")}
                        />
                    </View>
                    <View>
                        <SearchInput />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home