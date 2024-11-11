import { View, Text, ScrollView, Image, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchPlacesPropsData } from '@/lib/place';
import { PlaceData } from '@/types';
import LottieView from 'lottie-react-native'; // Import Lottie for celebration animation

const Home = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false); // State for refresh control
    const [upcomingPlaces, setUpcomingPlaces] = useState<PlaceData[]>([]);
    const [celebration, setCelebration] = useState(false); // State for triggering celebration

    const loadUpcomingPlaces = async () => {
        setIsLoading(true);
        const result = await fetchPlacesPropsData("november"); // use the desired month
        if (!("error" in result)) {
            setUpcomingPlaces(result.data.places_data);
        }
        setIsLoading(false);
    };

    // Load data on initial render
    useEffect(() => {
        loadUpcomingPlaces();
    }, []);

    // Refresh handler
    const handleRefresh = async () => {
        setRefreshing(true);
        await loadUpcomingPlaces();
        setRefreshing(false);
    };

    // Trigger celebration animation
    const handleQuoteClick = () => {
        setCelebration(true);
        setTimeout(() => setCelebration(false), 3000); // Stop celebration after 3 seconds
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            >
                <View className="flex-1 justify-center gap-4 p-4 mt-4">
                    <View className="flex-row justify-between">
                        <View className="flex-1 gap-2">
                            <Text className="text-base font-pregular text-white">Welcome Back</Text>
                            <Text className="font-psemibold text-[22px] text-white">{user?.username}</Text>
                        </View>
                        <Image source={require("../../assets/images/logo-small-3.png")} />
                    </View>

                    {/* Celebration Animation */}
                    {celebration && (
                        <LottieView
                            source={require('../../assets/celebration.json')}  // Replace with your file path
                            autoPlay
                            loop={false}
                            style={{
                                width: '100%',
                                height: 200,
                                position: 'absolute',
                                top: '30%',
                                zIndex: 10,
                                alignSelf: 'center',
                            }}
                        />
                    )}

                    {/* Quote Section */}
                    <TouchableOpacity onPress={handleQuoteClick}>
                        <View className='w-[80%] mx-8 bg-black-100 rounded-xl p-4 mt-7 border border-secondary-100'>
                            <Text className=' font-pbold text-[25px] text-center text-white'>Quote of the Day</Text>
                            <Text className=' font-pmedium text-base text-gray-100'>
                                Solo travel: The only way to get lost and find yourself at the same time.
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* Trending Places Section */}
                    <Text className="text-white font-psemibold text-[18px] mt-7">
                        Trending Places to visit
                    </Text>
                    {isLoading && (
                        <ActivityIndicator size="large" color="#FF9C01" />

                    )}
                    <ScrollView horizontal={true} className="flex-row ">
                        {upcomingPlaces.map((place, index) => (
                            <View key={index} className="w-80 p-2 bg-black-100 rounded-lg m-2 flex flex-col items-center justify-center">
                                <Image
                                    source={{ uri: place.image_url }}
                                    className="w-full h-48 rounded-lg"
                                    resizeMode="cover"
                                />
                                <Text className="text-white font-pregular mt-2">{place.title}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
