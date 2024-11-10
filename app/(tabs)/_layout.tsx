import { View, Text, Image, ImageSourcePropType } from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'
import { tabScreens } from '@/constants'

const TabIcon = ({ icon, color, name, focused }: { icon: ImageSourcePropType, color: string, name: string, focused: boolean }) => {
    return (
        <View className=' items-center '>
            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className='w-6 h-6'
            />
            <Text className={`${focused} ? ' font-psemibold' : ' font-pregular' text-xs`} style={{ color: `${color}` }}>
                {name}
            </Text>
        </View>
    )
}
const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle: {
                        backgroundColor: '#161622',
                        borderTopWidth: 1,
                        borderTopColor: '#232533',
                        height: 84
                    }
                }}
            >
                {tabScreens.map((tab) => (
                    <Tabs.Screen
                        key={tab.name}
                        name={tab.name}
                        options={{
                            title: tab.title,
                            headerShown: false,
                            tabBarIcon: ({ color, focused }) => (
                                <TabIcon
                                    icon={tab.icon}
                                    color={color}
                                    name={tab.title}
                                    focused={focused}
                                />
                            ),
                        }}
                    />
                ))}
            </Tabs>
        </>
    )
}

export default TabsLayout