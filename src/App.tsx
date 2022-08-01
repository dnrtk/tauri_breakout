import React from 'react';
import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const FIELD_WIDTH = 500;
const FIELD_HEIGHT = 600;

const BALL_RADIUS = 10;

function sleep(milliseconds: any) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function App() {
  const [ballPos, setBallPos] = useState({"x":250, "y":400});

  const draw = () => {
    // Canvas取得
    const canvasElem = document.getElementById("my_canvas") as HTMLCanvasElement;
    const ctx = canvasElem && canvasElem.getContext("2d");
    if (!canvasElem || !ctx) return

    // 画面全消去
    ctx.clearRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);

    // 描画(フィールド)
    ctx.beginPath();
    ctx.rect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);
    ctx.fillStyle = "#FAFAFA";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.stroke();

    // 描画(ボール)
    ctx.beginPath();
    ctx.arc(ballPos.x, ballPos.y, BALL_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255,0,0,0.8)"
    ctx.fill();

    // 次回描画までの待ち時間
    sleep(10);

    // 座標更新
    //TODO: Rust側で座標計算して返す様に変更
    setBallPos({"x":ballPos.x+1, "y":ballPos.y+2});
  }
  useEffect(draw, [ballPos]);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <canvas id="my_canvas" width={FIELD_WIDTH} height={FIELD_HEIGHT}></canvas>
    </div>
  );
}




export default App;
