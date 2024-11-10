import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ViewState } from '@/types'

const Options = ({ handleStateChange, state }: { handleStateChange: (newState: ViewState) => void, state: string }) => {
    return (
        <View className={`h-[50px] mx-8  flex-row justify-between rounded-xl border border-[#7b7b8b]`}>
            <TouchableOpacity onPress={() => handleStateChange(ViewState.Places)} className="flex-1 h-full justify-center items-center border-r-2 border-[#7b7b8b]">
                <Text className={`text-center text-base text-white font-pmedium ${state === ViewState.Places ? "text-secondary" : ""}`}>Places</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStateChange(ViewState.Food)} className="flex-1 h-full justify-center items-center border-r-2 border-[#7b7b8b]">
                <Text className={`text-center text-base text-white font-pmedium ${state === ViewState.Food ? "text-secondary" : ""}`}>Food</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStateChange(ViewState.BestTime)} className="flex-1 h-full justify-center items-center">
                <Text className={`text-center text-base text-white font-pmedium ${state === ViewState.BestTime ? "text-secondary" : ""}`}>Best Time</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Options