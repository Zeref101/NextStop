import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthProvider';
import icons from '@/constants/icons';
import { signOut } from '@/lib/appwrite';
import { Redirect } from 'expo-router';

const Profile = () => {
    const { user } = useAuth();
    const [loggedOut, setLoggedOut] = useState(false); // Track logout status

    const handleLogout = async () => {
        console.log("Logging out...");
        try {
            await signOut(); // Attempt to sign out
            setLoggedOut(true); // Set loggedOut to true on success
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    // Redirect to sign-in screen if logged out
    if (loggedOut) {
        return <Redirect href={'/sign-in'} />;
    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView>
                <View className='w-full h-[85vh] justify-start p-4'>
                    <View className='w-full flex flex-row justify-between'>
                        <Text className='text-white font-pmedium text-3xl'>
                            Profile
                        </Text>
                        <Pressable onPress={handleLogout}>
                            <Image source={icons.logout} className='w-6 h-6' resizeMode='contain' />
                        </Pressable>
                    </View>
                    <View className='w-full h-full flex justify-start items-center'>
                        <View className='w-[80%] p-4 bg-black-100 justify-start items-center mt-7 rounded-xl'>
                            <View className='flex flex-col justify-center items-center gap-2.5'>
                                <Image source={{ uri: user?.avatar }} className='w-24 h-24 rounded-xl border-2 border-secondary-100' resizeMode='contain' />
                                <Text className='text-white font-psemibold text-[20px]'>{user?.username}</Text>
                            </View>
                            <View className='w-full items-start m-2'>
                                <Text className='text-base font-pmedium text-secondary'>
                                    email: <Text className='text-base font-pmedium text-white'>{user?.email}</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
