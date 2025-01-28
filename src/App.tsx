import React, { useState, useRef, Dispatch, SetStateAction } from 'react'
import './App.css'

function App() {
  const [fortuneResult, setResult]: [string, Dispatch<SetStateAction<string>>] = useState("おみくじ押してね");
  const [isDisabled, setIsDisabled]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [isLoading, setIsLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

  const resultRef = useRef<HTMLHeadingElement>(null);

  const LIMIT: number = 99;
  const imgBulldozer: string = "src/img/bulldozer.png";
  const imgOmikuji: string = "src/img/omikuji.png";

  const determineFortune: (n: number) => string = (omikujiNumber: number) => {
    /*
      1%: 睾丸
      5%: 大吉, 大凶
      10%: 吉, 凶
      15%: 中吉
      other: 小吉
      */
    switch (true) {
      case 0 < omikujiNumber && omikujiNumber <= 1: return "睾丸";
      case 1 < omikujiNumber && omikujiNumber <= 6: return "大吉"
      case 6 < omikujiNumber && omikujiNumber <= 11: return "大凶"
      case 11 < omikujiNumber && omikujiNumber <= 21: return "吉"
      case 21 < omikujiNumber && omikujiNumber <= 31: return "凶"
      case 31 < omikujiNumber && omikujiNumber <= 46: return "中吉"
      default: return "小吉";
    }
  };

  const getOmikuji: () => void = () => {
    if (isDisabled) {
      shareResult();
      return;
    }

    const randomNumber: number = Math.floor(Math.random() * LIMIT) + 1;

    setResult("おみくじ、轢いてるよ！");
    setIsLoading(true);
    setIsDisabled(true);

    setTimeout(() => {
      const fortune: string = determineFortune(randomNumber);
      setResult(fortune);
      setIsLoading(false);
      resultRef.current?.classList.add("rainbow");
    }, 2000);
  };

  const shareResult = () => {
    const url = encodeURIComponent("gomikuji.pages.dev");
    const text = encodeURIComponent(`今日の運勢は${fortuneResult}でした！\n`);
    window.open(`https://twitter.com/share?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
  }

  const imageStyle: React.CSSProperties = {
    display: isLoading ? "block" : "none",
  };

  return (
    <div className='bodys'>
      <img src={imgBulldozer} alt="ブルドーザーの画像" className='image bulldozer' style={imageStyle} />
      <img src={imgOmikuji} alt="おみくじの画像" className='image' onClick={getOmikuji}/>
      <div className='divv'>
        <h1>ごみくじ</h1>
        <h3 className="read-the-docs">
          大吉 吉 中吉 小吉 凶 大凶 睾丸が出るよ！
        </h3>
      </div>
      <h1 className='result' ref={resultRef}>{ fortuneResult }</h1>
    </div>
  )
}

export default App