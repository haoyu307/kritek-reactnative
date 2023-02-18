import React, {useCallback} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
// * hooks
import {useGetListsQuery} from '../hooks/postQueries';
import {setId} from '../store';

const List = ({navigation}) => {
  const dispatch = useDispatch();
  const onPostClick = useCallback(
    newId => () => {
      dispatch(setId(newId));
      navigation.navigate('Detail');
    },
    [dispatch, navigation],
  );

  const {data: list, status: listStatus} = useGetListsQuery(undefined);

  const renderItem = item => <ListItem {...item} onPostClick={onPostClick} />;

  return (
    <View style={styles.container}>
      {listStatus === 'fulfilled' && list ? (
        <FlatList
          renderItem={renderItem}
          data={list}
          keyExtractor={item => item.id}
        />
      ) : listStatus === 'loading' ? (
        <Text>Loading</Text>
      ) : (
        <Text>Nothing to show</Text>
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {},
  itemContainer: {},
  title: {},
  author: {},
});

const ListItem = item => {
  return (
    <TouchableOpacity
      onPress={item.onPostClick(item.id)}
      activeOpacity={0.8}
      style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
    </TouchableOpacity>
  );
};
