import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'
import { createUser } from '@/lib/appwrite'
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message'


const SignUp = () => {
    const [form, setForm] = React.useState({
        username: '',
        email: '',
        password: ''
    })
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
    const submit = async () => {
        if (!form.username || !form.email || !form.password) {
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
            setIsSubmitting(true);
            try {
                await createUser({ email: form.email, password: form.password, username: form.username });

                Toast.show({
                    type: 'success',
                    text1: 'User Created',
                    text2: 'Your account has been created successfully!',
                    position: 'top',
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 30,
                });
                setForm({
                    username: '',
                    email: '',
                    password: ''
                });

            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'User Creation Failed',
                    text2: 'There was an issue creating your account. Please try again.',
                    position: 'top',
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 30,
                });
                console.error(error);
            } finally {
                setTimeout(() => {
                    setIsSubmitting(false);

                }, 2000);
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
                        Sign Up in NextStop
                    </Text>
                    <FormField
                        title="Username"
                        value={form.username}
                        placeholder="Enter a Username"
                        handleChangeText={(e) => setForm({ ...form, username: e })}
                        otherstyles={"m-8"}

                    />
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
                        title='Sign Up'
                        handlePress={submit}
                        containerStyles='mt-7'
                        isLoading={isSubmitting}
                    />
                    <View className=' justify-center pt-5 flex-row gap-2'>
                        <Text className='text-lg text-gray-100 font-pregular'>
                            Already have an account? {' '}
                            <Link href={"/sign-in"}>
                                <Text className='text-secondary-100'>
                                    Sign In
                                </Text>
                            </Link>
                        </Text>
                    </View>
                </View>

            </ScrollView>
            <Spinner
                visible={isSubmitting}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <Toast />
        </SafeAreaView>
    )
}

export default SignUp