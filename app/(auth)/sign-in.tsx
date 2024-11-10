import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signin } from '@/lib/appwrite'
import Toast from 'react-native-toast-message'
import { Redirect } from 'expo-router'

const SignIn = () => {
    const [form, setForm] = React.useState({
        email: '',
        password: ''
    })
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const submit = async () => {
        if (!form.email || !form.password) {
            Toast.show({
                type: "error",
                text1: 'Error',
                text2: 'Please fill in all fields',
                position: 'top',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30
            })
        } else {

            const session = await signin(form.email, form.password);
            const user = await getCurrentUser();

            if (user) {
                return <Redirect href={'/home'} />
            }
        }
    }
    return (
        <SafeAreaView className=' bg-primary h-full'>
            <ScrollView >
                <View className=' w-full justify-center min-h-[85vh] px-4 my-6'>
                    <View className=' flex justify-start flex-row gap-8'>
                        <Image
                            source={require("../../assets/images/logo-small-3.png")}
                            className=''
                        />
                        <Text className=' text-[#FFF] text-[25px] font-pbold font-bold'>NextStop</Text>
                    </View>
                    <Text className='text-white text-2xl text-semibold mt-10 font-psemibold'>
                        Log in to NextStop
                    </Text>
                    <FormField
                        title="Email"
                        value={form.email}
                        placeholder="Enter your Email"
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherstyles={"m-7"}
                        keyboardType="email-address"

                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        placeholder="Enter your Password"
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherstyles={"m-7"}
                    />

                    <CustomButton
                        title='Sign In'
                        handlePress={submit}
                        containerStyles='mt-7'
                        isLoading={isSubmitting}
                    />
                    <View className=' justify-center pt-5 flex-row gap-2'>
                        <Text className='text-lg text-gray-100 font-pregular'>
                            Don't have an account? {' '}
                            <Link href={"/sign-up"}>
                                <Text className='text-secondary-100'>
                                    Sign Up
                                </Text>
                            </Link>
                        </Text>
                    </View>
                </View>

            </ScrollView>
            <Toast />
        </SafeAreaView>
    )
}

export default SignIn