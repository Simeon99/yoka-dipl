import React from "react";

import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";

import "./WithScrollbar.css";
import "./carousel.styles.scss"
import 'react-multi-carousel/lib/styles.css'

// const images = ['img/home-page/sugg-flat-sh.png', 'img/home-page/sugg-oyster-kitc.png', 'img/home-page/sugg-bark-sb.png']
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

class WithScrollbar extends React.Component {

  constructor(props) {
    super(props)
  }

  state = { additionalTransfrom: 0 };
  render() {
    const CustomSlider = ({ carouselState }) => {
      let value = 0;
      let carouselItemWidth = 0;
      if (this.Carousel) {
        carouselItemWidth = this.Carousel.state.itemWidth;
        const maxTranslateX = Math.round(
          // so that we don't over-slide
          carouselItemWidth *
          (this.Carousel.state.totalItems -
            this.Carousel.state.slidesToShow) +
          150
        );
        value = maxTranslateX / 100; // calculate the unit of transform for the slider
      }
      const { transform } = carouselState;
      return (
        <div className="custom-slider">
          <input
            type="range"
            value={Math.round(Math.abs(transform) / value)}
            defaultValue={0}
            max={
              (carouselItemWidth *
                (carouselState.totalItems - carouselState.slidesToShow) +
                (this.state.additionalTransfrom === 150 ? 0 : 150)) /
              value
            }
            onChange={e => {
              if (this.Carousel.isAnimationAllowed) {
                this.Carousel.isAnimationAllowed = false;
              }
              const nextTransform = e.target.value * value;
              const nextSlide = Math.round(nextTransform / carouselItemWidth);
              if (
                e.target.value == 0 &&
                this.state.additionalTransfrom === 150
              ) {
                this.Carousel.isAnimationAllowed = true;
                this.setState({ additionalTransfrom: 0 });
              }
              this.Carousel.setState({
                transform: -nextTransform, // padding 20px and 5 items.
                currentSlide: nextSlide
              });
            }}
            className="custom-slider__input"
          />
        </div>
      );
    };
    return (
      <Carousel
        ssr={false}
        ref={el => (this.Carousel = el)}
        partialVisbile={false}
        customButtonGroup={<CustomSlider />}
        itemClass="slider-image-item"
        responsive={responsive}
        containerClass="carousel-container-with-scrollbar"
        additionalTransfrom={0 * 5}
        autoPlay={false}
        focusOnSelect={true}
        // removeArrowOnDeviceType={'mobile'}
        // deviceType={'mobile'}
        beforeChange={nextSlide => {
          if (nextSlide !== 0 && this.state.additionalTransfrom !== 150) {
            this.setState({ additionalTransfrom: 150 });
          }
          if (nextSlide === 0 && this.state.additionalTransfrom === 150) {
            this.setState({ additionalTransfrom: 0 });
          }
        }}
      >

        {this.props.images.map((item, i) => (
          <Link  to={item.route}>
            <div key={i} className="image-container increase-size">
              <img
                alt="no img"
                draggable={false}
                style={{ width: "100%", cursor: "pointer" }}
                src={item.url}
              />
            </div>
          </Link>
        ))
        }


      </Carousel>
    );
  }
}

export default WithScrollbar;
