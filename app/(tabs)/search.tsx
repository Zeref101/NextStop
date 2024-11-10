import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, ActivityIndicator, Modal, Button } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthProvider';
import icons from '@/constants/icons';
import axios from 'axios';
import { IP_ADDR } from '@env';
import images from '@/constants/images';
import CustomButton from '@/components/CustomButton';
import { ErrorResponse, FoodResponse, ViewState } from '@/types';
import Options from '@/components/Options';
import { fetchFoodData } from '@/lib/foodService';
import { fetchBestTimeData } from '@/lib/bestTime';

const Search = () => {
    const [query, setQuery] = React.useState("");
    const [isFocused, setIsFocused] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [results, setResults] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedResult, setSelectedResult] = React.useState<any>(null);
    const [state, setState] = React.useState<ViewState>(ViewState.Places);
    const [foodResponse, setFoodResponse] = React.useState<FoodResponse | ErrorResponse>();

    const handleSearch = async () => {
        console.log(state)
        if (query !== searchQuery) {
            setSearchQuery(query);
        }
        if (query !== "" && state === "Food") {
            console.log(query)
            const response = await fetchFoodData(query);
            console.log(response);

        }
        if (query !== "" && state === "BestTime") {
            console.log(query)
            const response = await fetchBestTimeData(query);
            console.log(response);

        }

    }

    const openModal = (result: any) => {
        setSelectedResult(result);
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
        setSelectedResult(null);
    }
    const handleStateChange = async (newState: ViewState) => {
        setState(newState);

    };

    // React.useEffect(() => {
    //     if (searchQuery === "") return;

    //     console.log("useEffect triggered with searchQuery:", searchQuery);

    //     const fetchResults = async () => {
    //         setIsLoading(true);
    //         setError(null);

    //         try {
    //             console.log("Fetching results for query:", searchQuery);
    //             const response = await axios.get(`http://${IP_ADDR}/places/${searchQuery}`);
    //             console.log("Fetch successful, response data:", response.data);
    //             setResults(response.data.places_info);
    //         } catch (err) {
    //             setError('Failed to fetch results');
    //             console.error("Fetch error:", err);
    //         } finally {
    //             setIsLoading(false);
    //             console.log("Fetch operation completed");
    //         }
    //     };

    //     fetchResults();
    // }, [searchQuery]);

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
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : error ? (
                    <Text className='text-red-500'>{error}</Text>
                ) : results.length > 0 ? (
                    <ScrollView>
                        {results.map((result, index) => (
                            <TouchableOpacity key={index} onPress={() => openModal(result)}>
                                <View className='mb-4 flex flex-col p-8 bg-[#1E1E2D] rounded-xl m-4'>
                                    <View className=' flex-1 flex-row justify-between items-center'>
                                        <Text className='text-lg text-white font-psemibold'>{result.title}</Text>
                                        <Image className='w-6 h-6' source={icons.menu} resizeMode='contain' />
                                    </View>
                                    <Image source={{ uri: result.img_url }} className='w-full mt-4 h-[250px] ' resizeMode='cover' style={{ borderRadius: 15 }} />
                                </View>
                            </TouchableOpacity>
                        ))}
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

            </ScrollView>
        </SafeAreaView>
    )
}

export default Search;