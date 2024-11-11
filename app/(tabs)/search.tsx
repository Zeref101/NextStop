import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, ActivityIndicator, Modal, Button } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import axios from 'axios';
import images from '@/constants/images';
import CustomButton from '@/components/CustomButton';
import { BestTimeToVisit, ErrorResponse, FoodResponse, PlaceInfo, PlacesResponse, ViewState } from '@/types';
import Options from '@/components/Options';
import { fetchFoodData } from '@/lib/foodService';
import { fetchBestTimeData } from '@/lib/bestTime';
import { fetchPlaceData } from '@/lib/place';
import { useAuth } from '@/context/AuthProvider';
import { savePlace } from '@/lib/appwrite';

const Search = () => {
    const [query, setQuery] = React.useState("");
    const [isFocused, setIsFocused] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [results, setResults] = React.useState<any[]>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedResult, setSelectedResult] = React.useState<any>(null);
    const [state, setState] = React.useState<ViewState>(ViewState.Places);
    const [foodResponse, setFoodResponse] = React.useState<FoodResponse | ErrorResponse>();
    const [bestTime, setBestTime] = React.useState<BestTimeToVisit | ErrorResponse>()
    const [showFullText, setShowFullText] = React.useState(false);
    const [selectedFood, setSelectedFood] = React.useState<any>();
    const [foodModalVisible, setFoodModalVisible] = React.useState(false);
    const [menuVisibleIndex, setMenuVisibleIndex] = React.useState<number | null>(null);
    const { user } = useAuth();

    const handleSearch = async () => {
        if (query !== searchQuery) {
            setSearchQuery(query);
        }

        // Clear previous results and reset loading/error states
        setIsLoading(true);
        setError(null);

        try {
            let response;
            console.log("Fetching results for query:", query);

            if (query !== "" && state === ViewState.Places) {
                response = await fetchPlaceData(query);
                console.log("Fetch successful for Places:", response);
                if ('places_info' in response) {
                    setResults(response.places_info || []);
                } else {
                    setError('Failed to fetch results');
                }
            } else if (query !== "" && state === ViewState.Food) {
                response = await fetchFoodData(query);
                console.log("Fetch successful for Food:", response);
                setFoodResponse(response);
            } else if (query !== "" && state === ViewState.BestTime) {
                response = await fetchBestTimeData(query);
                console.log("Fetch successful for BestTime:", response);
                setBestTime(response)
            }
        } catch (err) {
            setError('Failed to fetch results');
            console.error("Fetch error:", err);
        } finally {
            setIsLoading(false);
            console.log("Fetch operation completed");
        }
    };


    const openModal = (result: any) => {
        setSelectedResult(result);
        setModalVisible(true);
    }

    const openFoodModal = (result: any) => {
        setSelectedFood(result);
        setFoodModalVisible(true);
    }
    const closeFoodModal = () => {
        setSelectedResult(null);
        setFoodModalVisible(false);
    }

    const closeModal = () => {
        setModalVisible(false);
        setSelectedResult(null);
    }
    const handleStateChange = async (newState: ViewState) => {
        setState(newState);

    };

    const handleSavePlace = async (placeInfo: any) => {
        if (placeInfo && user?.accountId) {
            const placeData = {
                title: placeInfo.title,
                img_url: placeInfo.img_url,
                description: placeInfo.description,
            };
            try {
                await savePlace(placeData, user.accountId);
                console.log("Place saved successfully!");
                setMenuVisibleIndex(null);
            } catch (error) {
                console.error("Error saving place:", error);
            }
        }
    };

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView>
                <View className='flex-1 justify-center gap-4 p-4 mt-4'>
                    <View className='flex-row justify-between'>
                        <View className='flex-1 gap-2'>
                            <Text className='text-base font-pregular text-white'>Search Results</Text>
                            <Text className='font-psemibold text-[22px] text-white'>{query}</Text>
                        </View>
                        <Image
                            source={require("../../assets/images/logo-small-3.png")}
                        />
                    </View>
                    <View>
                        <View className={`flex flex-row justify-between items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 ${isFocused ? "border-secondary" : "border-black-200"}`}>
                            <TextInput
                                className='text-base mt-0.5 text-white flex-1 font-pregular'
                                placeholder='Search for a place'
                                placeholderTextColor={'#7b7b8b'}
                                value={query}
                                onChange={(e) => setQuery(e.nativeEvent.text)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                            <TouchableOpacity onPress={handleSearch} >
                                <Image
                                    source={icons.search}
                                    className='w-6 h-6'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Options handleStateChange={handleStateChange} state={state} />
                {isLoading ? (
                    <ActivityIndicator size="large" color="#FF9C01" className=' mt-36' />
                ) : error ? (
                    <Text className='text-red-500'>{error}</Text>
                ) : Array.isArray(results) || Array.isArray(foodResponse) || Array.isArray(bestTime) ? (
                    <ScrollView>
                        {state === ViewState.Places ? results?.map((result, index) => (
                            <View className='mb-4 flex flex-col p-8 bg-[#1E1E2D] rounded-xl m-4' key={index}>
                                <View className=' flex-1 flex-row justify-between items-center'>
                                    <Text className='text-lg text-white font-psemibold'>{result.title}</Text>
                                    <TouchableOpacity onPress={() => { menuVisibleIndex === index ? setMenuVisibleIndex(null) : setMenuVisibleIndex(index) }}>

                                        <Image className='w-6 h-6' source={icons.menu} resizeMode='contain' />
                                    </TouchableOpacity>
                                </View>
                                {menuVisibleIndex === index && (
                                    <View className='absolute top-[60px] right-12 bg-black-200 rounded-xl w-24 z-10 p-4'>
                                        <TouchableOpacity onPress={() => handleSavePlace(result)}>
                                            <Text className="text-white">Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                <TouchableOpacity key={index} onPress={() => openModal(result)}>
                                    <Image source={{ uri: result.img_url }} className='w-full mt-4 h-[250px] ' resizeMode='cover' style={{ borderRadius: 15 }} />
                                </TouchableOpacity>
                            </View>
                        )) : null}
                        {state === ViewState.Food && foodResponse && 'food_info' in foodResponse && (
                            <>
                                <View className='flex flex-col justify-center items-center'>
                                    {/* Title Section */}
                                    <Text className='text-pretty font-pbold text-white text-[18px]'>Food of {query}</Text>

                                    {/* General Description Section */}
                                    <View className='rounded-xl bg-[#1E1E2D] p-4 m-4'>
                                        <Text
                                            className='text-white text-base font-pregular '
                                            numberOfLines={showFullText ? undefined : 10}
                                        >
                                            {foodResponse?.food_info.general_description}
                                        </Text>
                                        <TouchableOpacity onPress={() => setShowFullText(!showFullText)}>
                                            <Text className='text-secondary mt-2 font-pregular'>
                                                {showFullText ? "Show Less" : "Read More"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View className='w-full'>
                                        {foodResponse?.food_info.food_items.map((food, index) => {
                                            if (food?.title !== "Unknown Title" && food?.img_url !== null) {
                                                return (
                                                    <TouchableOpacity key={index} onPress={() => openFoodModal(food)}>
                                                        <View className='mb-4 flex flex-col p-8 bg-[#1E1E2D] rounded-xl m-4' key={index}>
                                                            <Text className='text-lg text-white font-psemibold'>{food?.title}</Text>

                                                            <Image
                                                                source={{ uri: food.img_url }}
                                                                className='w-full mt-4 h-[250px]'
                                                                resizeMode='cover'
                                                                style={{ borderRadius: 15 }}
                                                            />
                                                        </View>
                                                    </TouchableOpacity>

                                                );
                                            }
                                            return null;
                                        })}
                                    </View>



                                </View>
                            </>
                        )}
                        {state === ViewState.BestTime && bestTime && 'best_time_to_visit' in bestTime && (
                            <>
                                <View className='flex flex-col justify-center items-center'>
                                    <Text className='text-pretty font-pbold text-white text-[18px]'>Ideal Time to visit {query}</Text>

                                    <View className='rounded-xl bg-[#1E1E2D] p-4 m-4'>
                                        <Text
                                            className='text-white text-base font-pregular'
                                            numberOfLines={showFullText ? undefined : 10}
                                        >
                                            {bestTime?.best_time_to_visit}
                                        </Text>
                                        <TouchableOpacity onPress={() => setShowFullText(!showFullText)}>
                                            <Text className='text-secondary mt-2'>
                                                {showFullText ? "Show Less" : "Read More"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    {'monthly_weather' in bestTime && (
                                        <>
                                            <Text className='text-pretty font-pbold text-white text-[18px]'>Weather in {query}</Text>
                                            <View className="h-[50px] mx-8 flex-row justify-between rounded-xl border border-[#7b7b8b] mb-2 bg-[#2A2A3C]">
                                                <View className="flex-1 h-full justify-center items-center border-r-2 border-[#7b7b8b]">
                                                    <Text className="text-center text-base font-pmedium text-white">Month</Text>
                                                </View>
                                                <View className="flex-1 h-full justify-center items-center border-r-2 border-[#7b7b8b]">
                                                    <Text className="text-center text-base font-pmedium text-white">High</Text>
                                                </View>
                                                <View className="flex-1 h-full justify-center items-center">
                                                    <Text className="text-center text-base font-pmedium text-white">Low</Text>
                                                </View>
                                            </View>
                                            {bestTime?.monthly_weather.map((weather, index) => (
                                                <View key={index} className="h-[50px] mx-8 flex-row justify-between rounded-xl border border-[#7b7b8b] mb-2">
                                                    <View className="flex-1 h-full justify-center items-center border-r-2 border-[#7b7b8b]">
                                                        <Text className="text-center text-base font-pmedium text-white">{weather.month}</Text>
                                                    </View>
                                                    <View className="flex-1 h-full justify-center items-center border-r-2 border-[#7b7b8b]">
                                                        <Text className="text-center text-base font-pmedium text-white">{weather.high}°</Text>
                                                    </View>
                                                    <View className="flex-1 h-full justify-center items-center">
                                                        <Text className="text-center text-base font-pmedium text-white">{weather.low}°</Text>
                                                    </View>
                                                </View>
                                            ))}

                                        </>
                                    )}
                                </View>

                            </>
                        )}

                    </ScrollView>
                ) : (
                    <Image source={images.empty} className=' w-full' resizeMode='contain' />

                )}

                {selectedResult && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={closeModal}
                        className=' bg-[#1E1E2D]'
                    >
                        <View className='flex-1 justify-center items-center bg-primary opacity-85'>
                            <View className=' bg-[#1E1E2D] text-white p-8 rounded-xl w-3/4 border-2 border-secondary'>
                                <Text className='text-2xl font-psemibold text-white'>{selectedResult.title}</Text>
                                <Text className='mt-4 text-base font-pregular text-white'>{selectedResult.description}</Text>
                                <CustomButton title="Close" handlePress={closeModal} containerStyles=' m-4' />
                            </View>
                        </View>
                    </Modal>
                )}

                {/* FOOD MODAL */}
                {selectedFood && (
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={foodModalVisible}
                        onRequestClose={closeFoodModal}
                        className=' bg-[#1E1E2D]'
                    >
                        <View className='flex-1 justify-center items-center bg-primary opacity-85'>
                            <View className=' bg-[#1E1E2D] text-white p-8 rounded-xl w-3/4 border-2 border-secondary'>
                                <Text className='text-2xl font-psemibold text-white'>{selectedFood.title}</Text>
                                <Text className='mt-4 text-base font-pregular text-white'>{selectedFood.description}</Text>
                                <CustomButton title="Close" handlePress={closeFoodModal} containerStyles=' m-4' />
                            </View>
                        </View>
                    </Modal>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Search;