import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';

interface SearchResultsProps {
    query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
    const [results, setResults] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchResults = async () => {
            setIsLoading(true);
            setError(null);
            try {
                if (query !== "") {
                    const response = await fetch(`http://44.203.99.91/places/delhi/`);
                    const data = await response.json();
                    setResults(data);
                }
            } catch (err) {
                setError('Failed to fetch results');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <View className='flex-1 p-4'>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text className='text-red-500'>{error}</Text>
            ) : results.length > 0 ? (
                <ScrollView>
                    {results.map((result, index) => (
                        <View key={index} className='mb-4'>
                            <Text className='text-lg text-white font-psemibold'>{result.name}</Text>
                            <Text className='text-sm text-gray-500 font-pregular'>{result.description}</Text>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <Text className='text-white'>No results found</Text>
            )}
        </View>
    );
};

export default SearchResults;