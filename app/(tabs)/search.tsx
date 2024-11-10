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
    const [selectedFood, setSelectedFood] = React.useState<any>()
    const [foodModalVisible, setFoodModalVisible] = React.useState(false)

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
        setModalVisible(false);
    }

    const closeModal = () => {
        setModalVisible(false);
        setSelectedResult(null);
    }
    const handleStateChange = async (newState: ViewState) => {
        setState(newState);

    };

    React.useEffect(() => {
        if (searchQuery === "") return;

        console.log("useEffect triggered with searchQuery:", searchQuery);

        const fetchResults = async () => {
            setIsLoading(true);
            setError(null);

            try {
                console.log("Fetching results for query:", searchQuery);
                const response = await axios.get(`http://54.210.58.161/places/${searchQuery}`);
                console.log("Fetch successful, response data:", response.data);
                setResults(response.data.places_info);
            } catch (err) {
                setError('Failed to fetch results');
                console.error("Fetch error:", err);
            } finally {
                setIsLoading(false);
                console.log("Fetch operation completed");
            }
        };

        fetchResults();
    }, [searchQuery]);

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
                <Text>{state}</Text>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : error ? (
                    <Text className='text-red-500'>{error}</Text>
                ) : Array.isArray(results) || Array.isArray(foodResponse) || Array.isArray(bestTime) ? (
                    <ScrollView>
                        {state === ViewState.Places ? results?.map((result, index) => (
                            <TouchableOpacity key={index} onPress={() => openModal(result)}>
                                <View className='mb-4 flex flex-col p-8 bg-[#1E1E2D] rounded-xl m-4'>
                                    <View className=' flex-1 flex-row justify-between items-center'>
                                        <Text className='text-lg text-white font-psemibold'>{result.title}</Text>
                                        <Image className='w-6 h-6' source={icons.menu} resizeMode='contain' />
                                    </View>
                                    <Image source={{ uri: result.img_url }} className='w-full mt-4 h-[250px] ' resizeMode='cover' style={{ borderRadius: 15 }} />
                                </View>
                            </TouchableOpacity>
                        )) : null}
                        {state === ViewState.Food && foodResponse && 'food_info' in foodResponse && (
                            <>
                                <View className='flex flex-col justify-center items-center'>
                                    {/* Title Section */}
                                    <Text className='text-pretty font-pbold text-white text-[18px]'>Food of {query}</Text>

                                    {/* General Description Section */}
                                    <View className='rounded-xl bg-[#1E1E2D] p-4 m-4'>
                                        <Text
                                            className='text-white text-base font-pregular'
                                            numberOfLines={showFullText ? undefined : 10}
                                        >
                                            {foodResponse?.food_info.general_description}
                                        </Text>
                                        <TouchableOpacity onPress={() => setShowFullText(!showFullText)}>
                                            <Text className='text-secondary mt-2'>
                                                {showFullText ? "Show Less" : "Read More"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View className='w-full'>
                                        {foodResponse?.food_info.food_items.map((food, index) => {
                                            if (food?.title !== "Unknown Title" && food?.img_url !== null) {
                                                return (
                                                    <TouchableOpacity key={index} onPress={() => openFoodModal(food)}>
                                                        <View className='mb-4 flex flex-col p-8 bg-[#1E1E2D] rounded-xl m-4'>
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
                        animationType="slide"
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