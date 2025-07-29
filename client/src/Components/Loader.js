import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loading-spinner">
        <div className="square square1" />
        <div className="square square2" />
        <div className="square square3" />
        <div className="square square4" />
        <div className="square square5" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loading-spinner {
    width: 156px; /* 3 * offset + square size */
    height: 104px; /* 2 * offset + square size */
    margin: 10px auto 30px;
    position: relative;
  }

  .square {
    position: absolute;
    width: 26px;
    height: 26px;
    background: darkorange;
    border-radius: 2px;
    animation: fadeIn 0.4s ease-out both;
  }

  .square1 {
    animation: moveSquare1 2.4s ease-in-out infinite,
      fadeIn 0.4s 0.1s ease-out both;
  }

  .square2 {
    animation: moveSquare2 2.4s ease-in-out infinite,
      fadeIn 0.4s 0.2s ease-out both;
  }

  .square3 {
    animation: moveSquare3 2.4s ease-in-out infinite,
      fadeIn 0.4s 0.3s ease-out both;
  }

  .square4 {
    animation: moveSquare4 2.4s ease-in-out infinite,
      fadeIn 0.4s 0.4s ease-out both;
  }

  .square5 {
    animation: moveSquare5 2.4s ease-in-out infinite,
      fadeIn 0.4s 0.5s ease-out both;
  }

  @keyframes moveSquare1 {
    0%,
    8.33%,
    100% {
      top: 0;
      left: 0;
    }
    50% {
      top: 26px;
    }
  }

  @keyframes moveSquare2 {
    0%,
    100% {
      top: 26px;
      left: 0;
    }
    25%,
    91.67% {
      top: 52px;
    }
    50% {
      top: 26px;
      left: 26px;
    }
    75% {
      top: 0;
    }
  }

  @keyframes moveSquare3 {
    0%,
    100% {
      top: 26px;
      left: 26px;
    }
    25%,
    75% {
      top: 0;
      left: 52px;
    }
    50% {
      top: 26px;
      left: 52px;
    }
  }

  @keyframes moveSquare4 {
    0%,
    33.33%,
    100% {
      top: 26px;
      left: 52px;
    }
    50% {
      top: 52px;
      left: 78px;
    }
  }

  @keyframes moveSquare5 {
    0%,
    50%,
    100% {
      top: 26px;
      left: 78px;
    }
    75% {
      top: 0;
      left: 52px;
    }
  }

  @keyframes fadeIn {
    0% {
      transform: scale(0.75);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export default Loader;
