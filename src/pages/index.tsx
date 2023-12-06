import { useState, useEffect } from "react";

type Choice = "rock" | "paper" | "scissors";

const choices: Choice[] = ["rock", "paper", "scissors"];



export default function Home() {
    const [userChoice, setUserChoice] = useState<Choice | null>(null);
    const [cpuChoice, setCpuChoice] = useState<Choice | null>(null);
    const [userPoint, setUserPoint] = useState<number>(0);
    const [cputotalWins, setCpuTotalWins] = useState<number>(0);
    const [usertotalWins, setUserTotalWins] = useState<number>(0);
    const [cpuPoint, setCpuPoint] = useState<number>(0);
    const [winner, setWinner] = useState<string | null>(null);
    const [countdown, setCountdown] = useState<number>(10);
    const [isPaused, setIsPaused] = useState<boolean>(false);
  
    const handleUserChoice = (choice: Choice) => {
      setUserChoice(choice);
      setCountdown(10);
  
      const cpuRandoms = Math.floor(Math.random() * 3);
      setCpuChoice(choices[cpuRandoms]);
  
      anotherFunction(choice, cpuRandoms);
    };
  
    const resetGame = () => {
      setUserChoice(null);
      setCpuChoice(null);
  
      if (userPoint > cpuPoint) {
        setWinner("You");
        setUserTotalWins((prevUserTotalWins) =>
          prevUserTotalWins + 1 === 3
            ? (alert("You successfully defeated the CPU"), window.location.reload(), 0)
            : prevUserTotalWins + 1
        );
      } else if (userPoint < cpuPoint) {
        setWinner("CPU");
        setCpuTotalWins((prevCpuTotalWins) =>
          prevCpuTotalWins + 1 === 3
            ? (alert("You have been defeated by the CPU"), window.location.reload(), 0)
            : prevCpuTotalWins + 1
        );
      } else {
        setWinner("Tie");
      }
    };
  
    useEffect(() => {
      let countdownInterval: NodeJS.Timeout;
      if (!isPaused) {
        countdownInterval = setInterval(() => {
          setCountdown((prevCountdown) => (prevCountdown === 1 ? 10 : prevCountdown - 1));
        }, 1000);
      }
  
      return () => {
        clearInterval(countdownInterval);
      };
    }, [countdown, isPaused, resetGame]);
  
    useEffect(() => {
      if (userPoint === 5 || cpuPoint === 5 || countdown === 0) {
        resetGame();
      }
    }, [userPoint, cpuPoint, countdown]);

    const anotherFunction = (userChoice: Choice, cpuChoice: number) => {
      console.log("Another function:", userChoice, cpuChoice);
    
      if (userChoice === choices[cpuChoice]) {
        setWinner("Tie");
      } else if (
        (userChoice === "rock" && cpuChoice === 1) ||
        (userChoice === "scissors" && cpuChoice === 0) ||
        (userChoice === "paper" && cpuChoice === 2)
      ) {
        setUserPoint(userPoint + 1);
        setWinner("You won");
      } else {
        setCpuPoint(cpuPoint + 1);
        setWinner("Cpu won");
      }
    };

  const handlePauseResume = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  return (
    <div className="h-screen">
          <div className="cd absolute bottom-5 left-5">Countdown: {countdown}</div>
      <div className="absolute top-5 pointetc pointetc">
        <div><div className="Upoint">{userPoint}</div><div className="playertext">You</div></div>
        <div className="">
        <div className="winner">
          <div className="textofwinner">
            <span>{winner ? `${winner}!` : "Roshambo"}</span>
          </div>
        </div>
        <button className="button" onClick={handlePauseResume}><div className="textbutton">{isPaused ? "Resume" : "Pause"}</div></button>
        </div>
      <div><div className="Upoint">{cpuPoint}</div><div className="playertext">Cpu</div></div>
      </div>
      <div className="container">
        <div className="backuser absolute bottom-5">
          <h1 className="userScore"></h1>
          <ul className="flex gap-4">
          <li
            className={`${userChoice !== "scissors" && "opacity-30"} ${
              userChoice === null && "opacity-100"
            }`}
            onClick={() => {
              handleUserChoice("scissors");
            }}
          >
            <div className="imageholder"><img src="https://media.discordapp.net/attachments/980819973125570600/1181886821567836220/image.png?ex=6582b0e0&is=65703be0&hm=233570a4ff91175f4d8661b24c7eff2c556458dfd3c784aabc5354cd24a74991&=&format=webp&quality=lossless&width=784&height=804"></img></div>
          </li>
          <li
            className={`${userChoice !== "rock" && "opacity-30"} ${
              userChoice === null && "opacity-100"
            }`}
            onClick={() => {
              handleUserChoice("rock");
            }}
          >
            <div className="imageholder"><img src="https://media.discordapp.net/attachments/980819973125570600/1181886783676493894/image.png?ex=6582b0d7&is=65703bd7&hm=843a93955be6582efbf0f7fbe485ad9e0fe024b9bdd7a0e6f47ad748968857ac&=&format=webp&quality=lossless&width=784&height=804"></img></div>
          </li>
          <li
            className={`${userChoice !== "paper" && "opacity-30"} ${
              userChoice === null && "opacity-100"
            }`}
            onClick={() => {
              handleUserChoice("paper");
            }}
          >
            <div className="imageholder"><img src="https://media.discordapp.net/attachments/980819973125570600/1181886723924443268/image.png?ex=6582b0c9&is=65703bc9&hm=144ec0f72c39817cd574643da3ba5326aaec72caab57b73edfd7636aba12eb48&=&format=webp&quality=lossless&width=780&height=840"></img></div>
          </li>
          </ul>
        </div>
        {/* <div className="backcpu">
          <ul className="flex gap-4">
          <li
            className={`${cpuChoice !== "scissors" && "opacity-30"} ${
              cpuChoice === null && "opacity-100"
            }`}
          >
            <div className="imageholder"><img src="https://media.discordapp.net/attachments/980819973125570600/1181886821567836220/image.png?ex=6582b0e0&is=65703be0&hm=233570a4ff91175f4d8661b24c7eff2c556458dfd3c784aabc5354cd24a74991&=&format=webp&quality=lossless&width=784&height=804"></img></div>
            
          </li>
          <li
            className={`${cpuChoice !== "rock" && "opacity-30"} ${
              cpuChoice === null && "opacity-100"
            }`}
          >
            <div className="imageholder"><img src="https://media.discordapp.net/attachments/980819973125570600/1181886783676493894/image.png?ex=6582b0d7&is=65703bd7&hm=843a93955be6582efbf0f7fbe485ad9e0fe024b9bdd7a0e6f47ad748968857ac&=&format=webp&quality=lossless&width=784&height=804"></img></div>
          </li>
          <li
            className={`${cpuChoice !== "paper" && "opacity-30"} ${
              cpuChoice === null && "opacity-100"
            }`}
          >
            <div className="imageholder"><img src="https://media.discordapp.net/attachments/980819973125570600/1181886723924443268/image.png?ex=6582b0c9&is=65703bc9&hm=144ec0f72c39817cd574643da3ba5326aaec72caab57b73edfd7636aba12eb48&=&format=webp&quality=lossless&width=780&height=840"></img></div>
          </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
