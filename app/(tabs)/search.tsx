import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthProvider';
import icons from '@/constants/icons';
import axios from 'axios';
import images from '@/constants/images';

const Search = () => {
    const [query, setQuery] = React.useState("");
    const [isFocused, setIsFocused] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");  // State for query passed to SearchResults
    const [results, setResults] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const { user } = useAuth();

    const handleSearch = () => {
        if (query !== searchQuery) {
            setSearchQuery(query);  // Set the query to searchQuery when search icon is clicked
        }
    }

    // useEffect hook to fetch results whenever searchQuery changes
    React.useEffect(() => {
        if (searchQuery === "") return; // Prevent API call if searchQuery is empty

        console.log("useEffect triggered with searchQuery:", searchQuery);

        const fetchResults = async () => {
            setIsLoading(true); // Set loading state to true before starting the fetch
            setError(null); // Clear any previous errors

            try {
                console.log("Fetching results for query:", searchQuery);
                // Make an HTTP GET request using axios
                const response = await axios.get(`http://44.203.99.91/places/${searchQuery}`);
                console.log("Fetch successful, response data:", response.data);
                setResults(response.data.places_info); // Set the results state with the fetched data
            } catch (err) {
                setError('Failed to fetch results'); // Set error state if the fetch fails
                console.error("Fetch error:", err); // Log the error to the console
            } finally {
                setIsLoading(false); // Set loading state to false after the fetch completes
                console.log("Fetch operation completed");
            }
        };

        fetchResults(); // Call the fetchResults function
    }, [searchQuery]); // Dependency array to re-run the effect when searchQuery changes

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

                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : error ? (
                    <Text className='text-red-500'>{error}</Text>
                ) : results.length > 0 ? (
                    <ScrollView>
                        {results.map((result, index) => (
                            <View key={index} className='mb-4 flex flex-col p-8 bg-[#1E1E2D] rounded-xl m-4'>
                                <View className=' flex-1 flex-row justify-between items-center'>
                                    <Text className='text-lg text-white font-psemibold'>{result.title}</Text>
                                    <Image className='w-6 h-6' source={icons.menu} resizeMode='contain' />
                                </View>


                                <Image source={{ uri: result.img_url }} className='w-full mt-4 h-[250px] ' resizeMode='cover' style={{ borderRadius: 15 }} />


                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    <Image source={images.empty} className=' w-full' resizeMode='contain' />
                )}

            </ScrollView>
        </SafeAreaView>
    )
}

export default Search;