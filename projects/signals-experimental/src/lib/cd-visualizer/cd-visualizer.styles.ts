
export const CD_VISUALIZER_GLOBAL_STYLES = {
  key: 'CD_VISUALIZER_GLOBAL_STYLES',
  definition: `
    .cd-visualizer {
      box-sizing: border-box;
      display: block;
      position: relative;
      border: 2px dashed black;
      padding: 20px;
      margin: 30px 5px 15px 5px;
    }

    app-root.cd-visualizer {
      padding: 0px;
      margin: 0px;
      z-index: 6000;
    }

    app-root.cd-visualizer > .cdv-container {
      width: 250px;
      margin-top: 2px;
      margin-left: 2px;
      margin-bottom: 0px;
      position: fixed;
      z-index: 6000;
    }

    .cd-visualizer .cdv-container {
      width: 300px;
      height: 52px;
      clip-path: polygon(0 0, 100% 0, 94% 100%, 0 100%);
      position: relative;
      display: inline-block;
      margin-top: -18px;
      margin-left: -18px;
      margin-bottom: 15px;
    }

    .cd-visualizer .cdv-circle {
      height: 24px;
      width: 24px;
      display: block;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 20px;
      color: black;
      text-align: center;
      font-size: 10px;
      line-height: 24px;
      margin: 14px;
      float: left;
    }

    .cd-visualizer .cdv-title {
      float: left;
      padding: 7px;
      line-height: 18px;
      font-weight: 600;
      font-size: 12px;
      color: darkslategray;
    }

    .cd-visualizer .cdv-explode {
      animation: cdv-explode 1500ms 1;
    }

    @keyframes cdv-explode {
      0% {
        border-width: 12px;
        border-style: solid;
      }
      25% {
        box-shadow: #D98880 0 0 0 0;
        background-color: #A93226;
      }
      75% {
        box-shadow: #F2D7D5 0 0 0 12px;
        border: none;
      }
    }

    .cdv-circle-pink {
      background-color: pink;
      border-color: pink;
    }

    .cdv-container-pink {
      background-color: rgba(255, 192, 203, .5);
    }

    .cdv-border-pink {
      border-color: pink;
    }

    .cdv-circle-gold {
      background-color: #FFD700;
      border-color: #FFD700;
    }

    .cdv-container-gold {
      background-color: rgba(255, 215, 0, .5);
    }

    .cdv-border-gold {
      border-color: #FFD700;
    }

    .cdv-circle-orange {
      background-color: #FFA07A;
      border-color: #FFA07A;
    }

    .cdv-container-orange {
      background-color: rgba(255, 160, 122, .5);
    }

    .cdv-border-orange {
      border-color: #FFA07A;
    }

    .cdv-circle-green {
      background-color: #3CB371;
      border-color: #3CB371;
    }

    .cdv-container-green {
      background-color: rgba(60, 179, 113, .5);
    }

    .cdv-border-green {
      border-color: #3CB371;
    }

    .cdv-circle-blue {
      background-color: #B0C4DE;
      border-color: #B0C4DE;
    }

    .cdv-container-blue {
      background-color: rgba(176, 196, 222, .5);
    }

    .cdv-border-blue {
      border-color: #B0C4DE;
    }

    .cdv-circle-brown {
      background-color: #BC8F8F;
      border-color: #BC8F8F;
    }

    .cdv-container-brown {
      background-color: rgba(188, 143, 143, .5);
    }

    .cdv-border-brown {
      border-color: #BC8F8F;
    }

    .cdv-circle-gray {
      background-color: #C0C0C0;
      border-color: #C0C0C0;
    }

    .cdv-container-gray {
      background-color: rgba(192, 192, 192, .5);
    }

    .cdv-border-gray {
      border-color: #C0C0C0;
    }

    .cdv-circle-purple {
      background-color: #D8BFD8;
      border-color: #D8BFD8;
    }

    .cdv-container-purple {
      background-color: rgba(216, 191, 216, .5);
    }

    .cdv-border-purple {
      border-color: #D8BFD8;
    }
  `
};
