import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { FormFieldProps } from '@/types'
import icons from '@/constants/icons';

const FormField = ({ title, value, placeholder, handleChangeText, otherstyles, keyboardType }: FormFieldProps) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);


    return (
        <View className={`space-y-2 ${otherstyles}`}>
            <Text className='text-base text-gray-100 font-pmedium'>
                {title}
            </Text>
            <View className={` w-full border border-black-200 h-16 bg-black-100 rounded-2xl items-center focus:border-secondary-100 flex-row ${isFocused ? "border-secondary" : ""}`}>
                <TextInput
                    className=' flex-1 text-white font-psemibold text-base w-full px-2 '
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={"#7b7b8b"}
                    onChangeText={handleChangeText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={title === "Password" && !showPassword}
                />

                {
                    title === "Password" && (
                        <TouchableOpacity onPress={() => {
                            setShowPassword(!showPassword);
                        }}>
                            <Image
                                source={showPassword === true ? icons.eyeHide : icons.eye}
                                className=' w-6 h-6'
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    )
                }

            </View>
        </View>
    )
}

export default FormField