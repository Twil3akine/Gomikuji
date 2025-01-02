import React, { useState, useRef, Dispatch, SetStateAction } from 'react'
import './App.css'

function App() {
  const [fortuneResult, setResult]: [string, Dispatch<SetStateAction<string>>] = useState("結果がここに出るよ！");
  const [buttonText, setButtonText]: [string, Dispatch<SetStateAction<string>>] = useState("おみくじをひく");
  const [isDisabled, setIsDisabled]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [isLoading, setIsLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

  const resultRef = useRef<HTMLHeadingElement>(null);

  const LIMIT: number = 99;
  const imgBulldozer: string = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjRboCZxIDNvaTnwrKcTbo29MSYOwteU_AGemW_IsvATrx_Vu328dVyYNqdNHQqwdFRFLlsPFTwQq49eiFrG69ghHV9NTU4XWpl05GZDVX3eha7RKsHinK3oAcdl4_FflyVCz7avMJQIZ-4/s400/kouji_bulldozer_dozer_shovel.png";
  const imgOmikuji: string = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmg2kn9DyMES8p81iw0-civQjYw0bIDleQAH8gOAp_mv75OnJaeBgcv6vsVIRNnHT-BTuDfmmQ4X8bgRi3U6tQdG-m5C0nYzWahyDp4vyYTPs7BvcsAZVIhzkHt-scsWxKhE3B3JMs_Y8/s400/syougatsu2_omijikuji2.png";

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
    const randomNumber: number = Math.floor(Math.random() * LIMIT) + 1;

    setResult("おみくじ、轢いてるよ！");
    setIsLoading(true);
    setIsDisabled(true);

    setTimeout(() => {
      const fortune: string = determineFortune(randomNumber);
      setResult(fortune);
      setIsLoading(false);
      setButtonText("共有する");
      resultRef.current?.classList.add("rainbow");
    }, 2000);
  };

  const shareResult = () => {
    const url = encodeURIComponent("japani-zu-omikuji.pages.dev");
    const text = encodeURIComponent(`今日の運勢は${fortuneResult}でした！\n`);
    window.open(`https://twitter.com/share?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
  }

  const buttonStyle: React.CSSProperties = {
    cursor: isLoading ? "wait" : "pointer",
  };

  const imageStyle: React.CSSProperties = {
    display: isLoading ? "block" : "none",
  };

  return (
    <div className='bodys'>
      <img src={imgBulldozer} alt="ブルドーザーの画像" className='image bulldozer' style={imageStyle} />
      <img src={imgOmikuji} alt="おみくじの画像" className='image omikuji'/>
      <div className='divv'>
        <h1>じゃぱにーず おみくじ</h1>
        <h3 className="read-the-docs">
          大吉 吉 中吉 小吉 凶 大凶 睾丸が出るよ！
        </h3>
      </div>
      <div className="card">
        <button onClick={isDisabled ? shareResult : getOmikuji} disabled={isLoading} style={buttonStyle} >
          {buttonText}
        </button>
      </div>
      <h1 className='result' ref={resultRef}>{ fortuneResult }</h1>
    </div>
  )
}

export default App