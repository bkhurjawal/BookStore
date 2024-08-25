import * as React from 'react';
import { Text, View } from 'react-native';

interface TestScreenProps {
}

const TestScreen: React.FC<TestScreenProps> = (props) => {
    return (
    <View>
        <Text> Test Screen</Text>
    </View>)
};

export default TestScreen
