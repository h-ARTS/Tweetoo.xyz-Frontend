import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/CloseTwoTone';
import BackIcon from '@material-ui/icons/ArrowBackIosRounded';
import ForwardIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../ui/Modal';

const useStyles = makeStyles({
  imageContainer: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  imageFocusable: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0,
    height: '100%',
    width: '100%',
    zIndex: -1
  },
  image: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: props => `url(http://localhost:6500/${props.image})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  navigateButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  backButton: {
    marginLeft: 10
  },
  forwardButton: {
    marginRight: 10
  }
});
export default function useImagePreview(paths) {
  const [index, setIndex] = useState(0);
  const classes = useStyles({ image: paths[index].url });
  const [showModal, setShowModal] = useState(false);
  const [naturalWidth, setNaturalWidth] = useState(0);
  const [naturalHeight, setNaturalHeight] = useState(0);

  const handleClose = event => {
    event.stopPropagation();
    if (event.target.dataset.area === 'image') return;
    setShowModal(false);
  };

  const togglePreview = id => {
    setShowModal(!showModal);
    setIndex(+id);
  };

  const navigateImage = event => {
    event.stopPropagation();
    const navType = event.target.dataset.id;
    return navType === 'back' ? setIndex(index - 1) : setIndex(index + 1);
  };

  const onImageLoad = event => {
    const image = event.target;
    setNaturalWidth(image.naturalWidth);
    setNaturalHeight(image.naturalHeight);
  };

  const PreviewModal = () => (
    <Modal onClick={handleClose}>
      <Box
        className={classes.imageContainer}
        width={naturalWidth}
        height={naturalHeight}
      >
        <Box className={classes.image} data-area="image" />
        <img
          onLoad={onImageLoad}
          className={classes.imageFocusable}
          src={`http://localhost:6500/${paths[index].url}`}
          alt=""
        />
      </Box>
      <Box className={classes.navigateButtons}>
        <IconButton
          onClick={navigateImage}
          color="primary"
          className={classes.backButton}
          data-id="back"
          disabled={index === 0}
          disableRipple
        >
          <BackIcon data-id="back" />
        </IconButton>
        <IconButton
          onClick={navigateImage}
          color="primary"
          className={classes.forwardButton}
          data-id="next"
          disabled={index === paths.length - 1}
          disableRipple
        >
          <ForwardIcon data-id="next" />
        </IconButton>
      </Box>
      <IconButton
        className={classes.closeButton}
        onClick={handleClose}
        color="primary"
      >
        <CloseIcon />
      </IconButton>
    </Modal>
  );

  return [showModal, togglePreview, PreviewModal];
}
