import React, {memo} from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {category, navigationConstants, none, title} from '../utils/constants';
import {getButtonStyle} from '../utils/utilFunctions';

// Define the types for route and navigation props

interface FilterScreenProps {
  navigation: any;
  route: any;
}

const FilterScreen: React.FC<FilterScreenProps> = ({navigation, route}) => {
  const {filter} = route?.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButtonContainer}
        onPress={() => navigation.goBack()}>
        <Text style={styles.closeButton}>X</Text>
      </TouchableOpacity>
      <View style={styles.filterAlignment}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.filterByContainer}>
            <Text style={styles.filterByText}>Filter By:</Text>
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
                  name: navigationConstants.BookList,
                  params: {filter: category},
                  merge: true,
                })
              }>
              <Text style={[styles.label]}>Category</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, getButtonStyle(filter === title)]}
              onPress={() =>
                navigation.navigate({
                  name: navigationConstants.BookList,
                  params: {filter: title},
                  merge: true,
                })
              }>
              <Text style={[styles.label]}>Title</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, getButtonStyle(filter === none)]}
              onPress={() =>
                navigation.navigate({
                  name: navigationConstants.BookList,
                  params: {filter: none},
                  merge: true,
                })
              }>
              <Text style={[styles.label]}>None</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterByContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  filterByText: {fontSize: 20, color: 'white', fontWeight: '500'},
  container: {flex: 1, marginTop: 50},
  closeButtonContainer: {flexDirection: 'row-reverse', margin: 10},
  closeButton: {fontSize: 25, fontWeight: '600', color: 'white'},
  filterAlignment: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  button: {
    padding: 10,
    backgroundColor: 'white',
  },
});

export default memo(FilterScreen);
