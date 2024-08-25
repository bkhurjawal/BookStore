import {RouteProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
  TextStyle,
  ViewStyle,
} from 'react-native';

// Define the types for route and navigation props

interface FilterScreenProps {
  navigation: any;
  route: any;
}

const FilterScreen: React.FC<FilterScreenProps> = ({navigation, route}) => {
  const {filter} = route?.params;
  console.log('filter', filter);
  const getLabelStyle = (isActive: boolean): TextStyle => ({
    color: isActive ? 'white' : 'black',
  });
  const getButtonStyle = (isActive: boolean): ViewStyle => ({
    backgroundColor: isActive ? 'black' : 'white',
  });

  return (
    <View style={{flex: 1, marginTop: 50}}>
      <TouchableOpacity
        style={{flexDirection: 'row-reverse', margin: 10}}
        onPress={() => navigation.goBack()}>
        <Text style={{fontSize: 25, fontWeight: '600', color: 'white'}}>X</Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center',

          marginHorizontal: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 20, color: 'white', fontWeight: '500'}}>
              Filter By:
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={[styles.button, getButtonStyle(filter === 'category')]}
              onPress={() =>
                navigation.navigate({
                  name: 'BookList',
                  params: {filter: 'category'},
                  merge: true,
                })
              }>
              <Text
                style={[styles.label, getLabelStyle(filter === 'category')]}>
                Category
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, getButtonStyle(filter === 'title')]}
              onPress={() =>
                navigation.navigate({
                  name: 'BookList',
                  params: {filter: 'title'},
                  merge: true,
                })
              }>
              <Text style={[styles.label, getLabelStyle(filter === 'title')]}>
                Title
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, getButtonStyle(filter === 'none')]}
              onPress={() =>
                navigation.navigate({
                  name: 'BookList',
                  params: {filter: 'none'},
                  merge: true,
                })
              }>
              <Text style={[styles.label, getLabelStyle(filter === 'none')]}>
                None
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    backgroundColor: 'white',
  },
});

export default FilterScreen;
