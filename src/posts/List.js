import React, {useCallback, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
// * hooks
import {useGetListsQuery} from '../hooks/postQueries';
import {setId} from '../store';

const List = ({navigation}) => {
  const dispatch = useDispatch();
  // * data fetch
  const {data: list, isSuccess: listStatus} = useGetListsQuery(undefined);

  // * event handlers
  const onPostClick = useCallback(
    newId => () => {
      dispatch(setId(newId));
      navigation.navigate('Detail');
    },
    [dispatch, navigation],
  );
  const onPostAdd = useCallback(() => {
    dispatch(setId(undefined));
    navigation.navigate('Detail');
  }, [dispatch, navigation]);
  // * render
  const renderItem = item => <ListItem {...item} onPostClick={onPostClick} />;

  return (
    <View style={styles.container}>
      {listStatus && list.length > 0 ? (
        <FlatList
          renderItem={renderItem}
          data={list}
          ListHeaderComponent={<ListHeader onAdd={onPostAdd} />}
          contentContainerStyle={styles.listContainer}
          keyExtractor={item => item.id}
        />
      ) : listStatus === 'loading' ? (
        <Text>Loading</Text>
      ) : (
        <Text>Nothing to show</Text>
      )}
      <SafeAreaView />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    width: '100%',
    height: '100%',
  },
  listContainer: {
    paddingHorizontal: 12,
  },
  itemContainer: {
    marginVertical: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: '#ea580c',
    borderRadius: 6,
  },
  title: {},
  author: {},
  listHeader: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addBtn: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: '#ea580c',
  },
  addBtnText: {
    color: '#fff',
  },
});

const ListHeader = ({onAdd}) => {
  return (
    <View style={styles.listHeader}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onAdd}
        style={styles.addBtn}>
        <Text style={styles.addBtnText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const ListItem = ({item, onPostClick}) => {
  return (
    <TouchableOpacity
      onPress={onPostClick(item.id)}
      activeOpacity={0.8}
      style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
    </TouchableOpacity>
  );
};
