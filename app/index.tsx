import React from 'react';
import { Text, View, Pressable, StyleSheet, ScrollView, Image, StatusBar } from 'react-native';
import { router, Redirect } from 'expo-router';
import "../global.css"
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import CustomButton from '@/components/CustomButton';

const Index = () => {
    return (
        <SafeAreaView className=' bg-primary h-full'>
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className=' w-full justify-start items-center h-[85vh] px-4 mt-4 gap-8'>
                    <View className=' flex items-center justify-center flex-row gap-8'>
                        <Image
                            source={images.logoSmall}
                            className=''
                        />
                        <Text className=' text-[#FFF] text-[30px] font-pbold font-bold'>NextStop</Text>
                    </View>
                    <Image
                        source={images.cards}
                        className=' max-w-[380px] w-full h-[300px]'
                        resizeMode='contain'
                    />
                    <View className='relative mt-5'>
                        <Text className='text-3xl text-white font-bold text-center'>
                            Discover Endless adventures with {" "}
                            <Text className='text-secondary-200'>NextStop</Text>
                        </Text>
                        <Image
                            source={images.path}
                            className=' w-[100px] h-[15px] absolute -bottom-4 right-24'
                            resizeMode='contain'
                        />
                    </View>
                    <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
                        Where exploration meets authenticity: uncover hidden gems with NextStop
                    </Text>
                    <CustomButton
                        title={"Continue with Email"}
                        handlePress={() => { router.push('/sign-in') }}
                        containerStyles={"mt-7 w-full"}
                    />
                </View>
            </ScrollView>
            <StatusBar backgroundColor={"#161622"} barStyle={"light-content"} />
        </SafeAreaView>
    );
};


export default Index;