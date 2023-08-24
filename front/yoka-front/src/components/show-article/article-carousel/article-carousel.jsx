import React, { useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
// import ImageGallery from 'react-image-gallery';
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from "react-icons/hi";
import "./article-carousel.scss";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";

const ArticleCarousel = ({ article, images }) => {

  const [isPageNarrow, setIsPageNarrow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPageNarrow(window.innerWidth < 850); // Adjust the threshold width as needed
    };

    handleResize(); // Check initial width

    window.addEventListener('resize', handleResize); // Update width on window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up event listener
    };
  }, []);

  const articleImages = images.map((image) => {
    return {
      original: image.mediaLink,
      thumbnail: image.mediaLink,
    };
  });

  function _renderCustomControls() {
    return (
      <a
        href=""
        className="image-gallery-custom-action"
        onClick={this._customAction.bind(this)}
      />
    );
  }
  const onClicl = () => {
    console.log("test");
  };
  const renderLeftNava = (onClick, disabled) => (
    <LeftNav onClick={onClick} disabled={disabled} />
  );
  
  const renderRightNav = (onClick, disabled) => (
    <RightNav onClick={onClick} disabled={disabled} />
  )
  // const _renderCustomControls = ()=> <a className='image-gallery-custom-action' onClick={()=>{console.log("AAAAAAAAAA")}}>aaaaa</a>

  return (
    <div className="img-galery">
      <ReactImageGallery
        showFullscreenButton={false}
        showPlayButton={false}
        originalHeight={50}
        originalWidth={1}
        isRTL={false}
        thumbnailPosition={isPageNarrow ? "bottom" : "right"}
        items={articleImages}
        onClick={onClicl}
        renderLeftNav={renderLeftNava}
        renderRightNav={renderRightNav}
        showThumbnails={isPageNarrow ? false : true}
      />
      {isPageNarrow}
    </div>
  );
};

export default ArticleCarousel;
