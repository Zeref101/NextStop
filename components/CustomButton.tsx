import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            disabled={isLoading}
            onPress={handlePress}
            className={` bg-secondary rounded-xl min-h-[62px] justify-center items-center p-2 ${containerStyles} ${isLoading ? "opacity-50" : ""}`
            }>
            <Text className={`text-primary font-psemibold text-lg font-bold ${textStyles}`}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton