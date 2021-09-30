import "./CustomImage.scss";
// const images = [
// 	'https://picsum.photos/400/300/?image=926',
// 	'https://picsum.photos/400/300/?image=925',
// 	'https://picsum.photos/400/300/?image=924',
// 	'https://picsum.photos/400/300/?image=923',
// 	'https://picsum.photos/400/300/?image=922',
// 	'https://picsum.photos/400/300/?image=921',
// ];

import React from "react";

// /*!
//   Copyright (c) 2017 Jed Watson.
//   Licensed under the MIT License (MIT), see
//   http://jedwatson.github.io/classnames
// */
var hasOwn = {}.hasOwnProperty;

const classNames = (...args) => {
  var classes = [];

  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      var inner = classNames.apply(null, arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === "object") {
      for (var key in arg) {
        if (Object.hasOwnProperty.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(" ");
};

// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <Carousel images={images} />
//         <p className="flavor-text">React carousel</p>
//       </div>
//     );
//   }
// }

export default class Carousel extends React.Component {
  constructor() {
    super();

    this.state = {
      currentIndex: 0,
      isTransitioning: false,
      goingLeft: false,
    };
  }

  componentDidMount() {
    window.addEventListener("keyup", this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.onKeyUp);
  }

  onKeyUp = (e) => {
    if (e.keyCode) {
      if (e.keyCode === 39) {
        this.showNextSet();
      } else if (e.keyCode === 37) {
        this.showPrevSet();
      }
    }
  };

  render() {
    const { images } = this.props;
    // console.log(images);

    const { currentIndex, isTransitioning, goingLeft } = this.state;

    return (
      <div className="carousel__wrapper">
        <div className="carousel__container">
          {images.map((img, index) => {
            let className = "carousel__image";
            if (index === currentIndex) className += " active";

            return (
              <img
                src={img.downloadPath}
                className={className}
                key={`img-${index}`}
              />
            );
          })}
        </div>
        <div className="carousel__controls">
          <button className="carousel__button" onClick={this.showPrevSet}>
            <i className="fa fa-arrow-left"></i>
          </button>
          <button className="carousel__button" onClick={this.showNextSet}>
            <i className="fa fa-arrow-right"></i>
          </button>
        </div>
      </div>
    );
  }

  showPrevSet = () => {
    const currentIndex =
      (this.state.currentIndex - 1 + this.props.images.length) %
      this.props.images.length;
    this.setState({ currentIndex });
  };

  showNextSet = () => {
    const currentIndex =
      (this.state.currentIndex + 1) % this.props.images.length;
    this.setState({ currentIndex });
  };
}

// ReactDOM.render(<App />, document.getElementById("app"));
