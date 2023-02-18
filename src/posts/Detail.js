import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// * hooks
import {
  useAddPostMutation,
  useGetDetailQuery,
  useUpdatePostMutation,
} from '../hooks/postQueries';
import {idSelector, setId} from '../store';

const Detail = () => {
  const id = useSelector(idSelector);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (id) {
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  }, [id]);

  // * data fetch
  const {data: detail, isSuccess: detailStatus} = useGetDetailQuery(id ?? 0);
  useEffect(() => {
    if (detailStatus && detail) {
      setTitle(detail.title);
      setAuthor(detail.author);
      setBody(detail.detail);
    }
  }, [detail, detailStatus]);

  const [addPost, {isLoading: isAdding}] = useAddPostMutation();
  const [updatePost, {isLoading: isUpdating}] = useUpdatePostMutation();

  useEffect(() => {
    if (id) {
    } else {
    }
  }, [id]);

  // * event handler
  const onEditClick = useCallback(() => {
    setEditMode(old => !old);
  }, []);
  const onAddUpdate = useCallback(
    (newTitle, newAuthor, newBody) => {
      if (!newTitle || !newAuthor || !newBody) {
        return false;
      }

      if (!isAdding && !isUpdating) {
        if (id) {
          updatePost({
            id,
            title: newTitle,
            author: newAuthor,
            detail: newBody,
          }).then(_ => {
            setEditMode(false);
          });
        } else {
          addPost({
            title: newTitle,
            author: newAuthor,
            detail: newBody,
          }).then(result => {
            if (result?.data?.id) {
              dispatch(setId(result.data.id));
            }
          });
        }
      }
    },
    [id, addPost, updatePost, isAdding, isUpdating, dispatch],
  );

  return (
    <View style={styles.container}>
      {editMode || !detail ? (
        <>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              style={styles.textInput}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Author</Text>
            <TextInput
              value={author}
              onChangeText={setAuthor}
              style={styles.textInput}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Detail</Text>
            <TextInput
              value={body}
              onChangeText={setBody}
              style={styles.textInput}
            />
          </View>
          <View style={styles.addUpdateBtnContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onAddUpdate(title, author, body)}
              style={styles.addUpdateBtn}>
              <Text style={styles.addUpdateBtnText}>
                {id ? 'Update' : 'Create'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>{detail.title}</Text>
          <Text style={styles.author}>{detail.author}</Text>
          <Text style={styles.detail}>{detail.detail}</Text>
          <View style={styles.addUpdateBtnContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onEditClick}
              style={styles.addUpdateBtn}>
              <Text style={styles.addUpdateBtnText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <SafeAreaView />
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 20,
    backgroundColor: '#fefefe',
  },
  inputRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLabel: {
    width: 50,
  },
  textInput: {
    marginLeft: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flex: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f00',
  },
  addUpdateBtnContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addUpdateBtn: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: '#ea580c',
  },
  addUpdateBtnText: {
    color: '#fff',
  },
});
