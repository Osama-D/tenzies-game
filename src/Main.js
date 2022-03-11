import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function Main() {
  const [dice, setDice] = React.useState(allnewDice());

  const [tenzies, settenzies] = React.useState(false);

  React.useEffect(function () {
    const firstN = dice[0].value;
    const alldies = dice.every((die) => die.value === firstN);
    const allDiespositive = dice.every((die) => die.isHeld === true);
    if (alldies && allDiespositive) {
      settenzies(true);
    }
  });

  function Rolldice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : genrateNewDie();
        })
      );
    } else {
      settenzies(false);
      setDice(allnewDice());
    }
  }

  function genrateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function HoldDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function allnewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(genrateNewDie());
    }
    return newDice;
  }

  const diceElements = dice.map((die) => (
    <Die
      HoldDice={() => HoldDice(die.id)}
      isHeld={die.isHeld}
      key={die.id}
      value={die.value}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <div>
        <h1>Tenzies</h1>
        <p>
          Roll untill all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="Die-container">{diceElements}</div>
        <button onClick={Rolldice}>
          {tenzies ? "Gongrats, Start Again" : "Roll"}
        </button>
      </div>
    </main>
  );
}
