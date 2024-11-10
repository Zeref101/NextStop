import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ViewState } from '@/types'

const Options = ({ handleStateChange, state }: { handleStateChange: (newState: ViewState) => void, state: string }) => {
    return (
        <View className={`h-[50px] mx-8  flex-row justify-between rounded-xl border border-[#7b7b8b]`}>
            <TouchableOpacity onPress={() => handleStateChange(ViewState.Places)} className="flex-1 h-full justify-center items-center border-r-2 border-[#7b7b8b]">
                <Text className={`text-center text-base  font-pmedium ${state === ViewState.Places ? "text-secondary" : "text-white"}`}>Places</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStateChange(ViewState.Food)} className="flex-1 h-full justify-center items-center border-r-2 border-[#7b7b8b]">
                <Text className={`text-center text-base font-pmedium ${state === ViewState.Food ? "text-secondary" : "text-white"}`}>Food</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStateChange(ViewState.BestTime)} className="flex-1 h-full justify-center items-center">
                <Text className={`text-center text-base font-pmedium ${state === ViewState.BestTime ? "text-secondary" : "text-white"}`}>Best Time</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Options