import React from 'react'
import { ImageList, ImageListItem } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { journalData } from '../../features/journalSlice/journalSlice';

const ImageGallery: React.FC = () => {
  const { activeNote } = useAppSelector(journalData)
  return (
    <ImageList sx={{width: '100%', height: 500}} cols={4} rowHeight={'auto'}>
    { activeNote!.imageURLs.map((image, idx) => (
      <ImageListItem key={activeNote?.id + `${idx}`}>
        <img
          src={`${image}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt={activeNote?.title}
          loading="lazy"
        />
      </ImageListItem>
    ))}
    </ImageList>
  )
}

export default ImageGallery