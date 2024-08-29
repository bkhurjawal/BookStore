import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type BoolDetailProps = {
  navigation: any;
  route: any;
};

const BookDetail: React.FC<BoolDetailProps> = ({navigation, route}) => {
  const {bookdetail} = route?.params;
  const {title, author, category, thumbnail, description} = bookdetail;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.author}>{author}</Text>
      <Image
        source={{uri: `${thumbnail}?random=${new Date().getTime()}`}}
        style={styles.bookImage}
      />
      <Text style={styles.category}>{category}</Text>
      <ScrollView style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </ScrollView>
    </View>
  );
};

export default BookDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  category: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  author: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginVertical: 10,
  },
  bookImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginVertical: 20,
    alignSelf: 'center',
  },
  descriptionContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});
