import React, { useRef } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { uploadTweetImagesForCache } from '../../../redux/actions/tweet.actions';
// Components
import Box from '@material-ui/core/Box';
import NewTweetAction from './NewTweetAction';

export default function NewTweetActionContainer() {
  const fileInputEl = useRef(null);
  const dispatch = useDispatch();

  function handleFileUpload(event) {
    event.stopPropagation();
    const files = event.target.files;
    var fileList = [];
    for (let i = 0; i < files.length; i++) {
      fileList.push(files[i]);
    }
    dispatch(uploadTweetImagesForCache(fileList));
  }

  function onImageUploadClick() {
    fileInputEl.current.click();
  }
  return (
    <Box display="flex" alignItems="center" marginTop="5px" marginLeft="-10px">
      <NewTweetAction
        actionComponentType="imageUpload"
        fileInputEl={fileInputEl}
        handleFileUpload={handleFileUpload}
        onImageUploadClick={onImageUploadClick}
      />
      <NewTweetAction actionComponentType="schedule" />
    </Box>
  );
}
