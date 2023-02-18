import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
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

  const [addPost, {isLoading: isAdding}] = useAddPostMutation();
  const [updatePost, {isLoading: isUpdating}] = useUpdatePostMutation();

  useEffect(() => {
    if (id) {
    } else {
    }
  }, [id]);

  // * fetch
  const {data: detail, status: detailStatus} = useGetDetailQuery(id ?? 0);
  useEffect(() => {
    if (detailStatus === 'fulfilled' && detail) {
    }
  }, [detail, detailStatus]);

  // * event handler
  const onAddClick = useCallback(() => {
    dispatch(setId(undefined));
  }, [dispatch]);
  const onEditClick = useCallback(() => {
    setEditMode(old => !old);
  }, []);
  const onAddUpdate = useCallback(
    (newTitle, newAuthor, newBody) => () => {
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

  return <View style={styles.container}></View>;
};

export default Detail;

const styles = StyleSheet.create({
  container: {},
});
