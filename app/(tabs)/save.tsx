import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthProvider';
import { getSavedPlaces } from '@/lib/appwrite';
import images from '@/constants/images';

// Define the Place type that corresponds to the document structure in Appwrite
interface Place {
    $id: string;
    title: string;
    description: string;
    img_url?: string; // Optional if you want to include image URL
}

// Define the user type returned by your useAuth hook
interface User {
    accountId: string;
}

// Update the return type of useAuth to include the expected user structure
const Save: React.FC = () => {
    const [savedPlaces, setSavedPlaces] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showFullText, setShowFullText] = React.useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Get the user data from useAuth
    const { user } = useAuth() as { user: User | null }; // Cast to the expected shape

    // Fetch saved places on component mount or when user changes
    useEffect(() => {
        const fetchSavedPlaces = async () => {
            if (user?.accountId) {
                try {
                    const places = await getSavedPlaces(user.accountId);
                    setSavedPlaces(places);
                } catch (error) {
                    console.error("Error fetching saved places:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchSavedPlaces();
    }, [user, isRefreshing]);

    const loadUpcomingPlaces = async () => {
        if (user?.accountId) {
            try {
                const places = await getSavedPlaces(user.accountId);
                console.log(places)
                setSavedPlaces(places);
            } catch (error) {
                console.error("Error fetching saved places:", error);
            } finally {
                setLoading(false);
            }
        }
    }
    const handleRefresh = async () => {
        setIsRefreshing(true);
        await loadUpcomingPlaces();
        setIsRefreshing(false);
    };
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
            }>
                <View className="p-4">
                    <Text className="text-3xl text-white font-semibold mb-4">Saved Places</Text>
                    {loading ? (
                        <ActivityIndicator size="large" color="#FF9C01" />
                    ) : (savedPlaces.length > 0 &&
                        savedPlaces.map((place) => (
                            <View key={place.$id} className="mb-4 p-4 bg-[#1E1E2D] rounded-xl">
                                <Text className="text-white font-bold text-lg">{place.title}</Text>
                                <Image source={{ uri: place.image_url }} className=' w-full h-52 rounded-xl m-2.5' resizeMode='cover' />
                                <Text
                                    className='text-white text-base font-pregular'
                                    numberOfLines={showFullText ? undefined : 5}
                                >
                                    {place.description}
                                </Text>
                                <TouchableOpacity onPress={() => setShowFullText(!showFullText)}>
                                    <Text className='text-secondary mt-2 font-pregular'>
                                        {showFullText ? "Show Less" : "Read More"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))

                    )}
                    {savedPlaces.length === 0 && (
                        <Image source={images.empty} className=' w-full' resizeMode='contain' />

                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Save;
