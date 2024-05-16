import React, { useCallback, useEffect, useState } from "react";
import "./App.scss";
import { get10value } from "./helpers/get10value";
import { ResultGroup } from './components/ResultGroup';
import { ControlsGroup } from "./components/ControlsGroup";

export default function App() {
  const [Alist, setAlist] = useState(Array(16).fill(0));
  const [Blist, setBlist] = useState(Array(16).fill(0));
  const [a, setA] = useState(0);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [isAuto, setIsAuto] = useState(false);

  const [AResList, setAResList] = useState(Array(32).fill(0));
  const [BResList, setBResList] = useState(Array(16).fill(0));
  const [CResList, setCResList] = useState(Array(32).fill(0));

	const [t, setT] = useState(0)
	const [y, setY] = useState([0])

  const updateListFromBinaryValue = (value, list) => {
    const binaryString = value.toString(2);
    const newArr = list;

    let i = newArr.length - 1;
    let j = binaryString.length - 1;

    while (i >= 0 && j >= 0) {
      newArr[i] = parseInt(binaryString[j]);
      i--;
      j--;
    }
    return newArr;
  };

    const x0 = () => {
			setBResList(Blist)
      return true
    }
    const x1 = () => {
      return !Alist.includes(1);
    }
    const x2 = () => {
      return !Blist.includes(1);
    }
    const x3 = () => {
      return Alist[Alist.length - 1 - 15] == 1;
    }
    const x4 = () => {
      return BResList[BResList.length - 1] == 1;
    }
    const x5 = () => {
      const b0 = BResList[BResList.length - 1] == 1; // B(0)
      const b1 = BResList[BResList.length - 1 - 1] == 1; // B(1)

      const result = b0 != b1;
      return result;
    }
    const x6 = () => {
      return BResList[BResList.length - 1 - 1] == 1;
    }
    const x7 = () => {
      return !counters.includes('1');
    }
    const x8 = () => {
      return CResList[CResList.length - 31 - 1] == 1;
    }
    const x9 = () => {
      return CResList[CResList.length - 14 - 1] == 1;
    }
    const y0 = () => {
      return updateListFromBinaryValue(0x00000000, CResList);
    }
    const y1 = () => {
      return [1, 1, 1, 1];
    }
    const y2 = () => {
			let A = [...Alist]
      let Am = [...AResList];

      Am[Am.length - 32] = A[0];
      Am[Am.length - 31] = A[0];

      return Am;
    }
		const y3 = (arr) => {
			let Am = parseInt(AResList.join(''), 2) & 0xC0007FFF;
			return updateListFromBinaryValue(Am, arr);
		}
    const y4 = (arr) => {
      let A = parseInt(Alist.join(""), 2) & 0x7fff;
      let Am = parseInt(AResList.join(""), 2) & 0x7fff;

      Am |= A;

      return updateListFromBinaryValue(Am, arr);
    }

    const y5 = () => {
      let Am = parseInt(AResList.join(""), 2); // Convert AResList to an integer
      let invertedAm = ~Am;
      let mask = 0x3FFFC000; // 00011111111111111111111100000000 in binary

      let invertedUpper15BitsAm = invertedAm & mask;
    	Am = Am & 0x7FFF; // 00000000000000001111111111111111 in binary
    	Am = Am | invertedUpper15BitsAm;

      setAResList(updateListFromBinaryValue(Am, AResList));
    }
    const y6 = () => {
      // C:=C+A̅M̅+1
			let Am = parseInt(AResList.join(""), 2); // Convert AResList to an integer
      let invertedAm = ~Am;
      let invertedAmPlusOne = invertedAm + 1;
      let C = parseInt(CResList.join(""), 2) + invertedAmPlusOne;
      setCResList((C >>> 0).toString(2).padStart(32, '0').split(''));
    }
    const y7 = () => {
      // AM:=L1(AM.0)
      let shiftedAm = (parseInt(AResList.join(""), 2) << 1);
      setAResList((shiftedAm >>> 0).toString(2).padStart(32, '0').split(''));
    }
    const y8 = () => {
      let Bm = parseInt(BResList.join(""), 2) >>> 1;
      setBResList((Bm >>> 0).toString(2).padStart(16, '0').split(''));
    }
    const y9 = () => {
			let CR = parseInt(counters.join(""), 2) - 1;
			setCounters((CR >>> 0).toString(2).padStart(4, '0').split(''))
    }
    const y10 = () => {
      // C:=C+AM
      let result = parseInt(CResList.join(""), 2) + parseInt(AResList.join(""), 2);
      setCResList(updateListFromBinaryValue(result, CResList));
    }
    const y11 = () => {
      // C(29:0)=C̅(29:0) + 1
			let C = parseInt(CResList.join(""), 2); // Convert AResList to an integer
      let invertedС = ~C;
      let mask = 0x3fffffff;

      let invertedUpper15BitsAm = invertedС & mask;

      setCResList(((invertedUpper15BitsAm + 1) >>> 0).toString(2).padStart(32, '0').split(''))
    }
		
    const y12 = () => {
      let invertedLower15BitsC = parseInt(CResList.join(""), 2) & 0x3fffC000;
      let result = invertedLower15BitsC + 1;
      let C =
        (parseInt(CResList.join(""), 2) & 0x00007fff) |
        (result << 15);
			setCResList((C >>> 0).toString(2).padStart(32, '0').split(''))
    }
    const y13 = () => {
      // C(30:16) = C̅(30:16) + 1
			let invertedLower15BitsC = ~parseInt(CResList.join(""), 2) & 0x3fffC000;
      let result = invertedLower15BitsC + 1;
      let C =
        (parseInt(CResList.join(""), 2) & 0x00007fff) |
       result;
			setCResList((C >>> 0).toString(2).padStart(32, '0').split(''))
    }

  function nextStep() {
    switch (a) {
      case 0:
        if (x0()) {
          if (x1()) {
            y0();
            setA(7);
          } else {
            if (x2()) {
              y0();
              setA(7);
            } else {
							let cnt = [...counters]
							let Am = [...AResList]
							let C = [...CResList]
              C = y0();
              cnt = y1();
              Am = y2();
              Am = y3(Am);
              Am = y4(Am);
							setCResList(C)
							setCounters(cnt)
							setAResList(Am)
              setA(1);
            }
          }
        } else {
          setA(0);
        }
        break;

      case 1:
        if (x3()) {
          y5();
          setA(2);
        } else {
          setA(2);
        }
        break;

      case 2:
        if (x4()) {
          y6();
          y7();
          setA(3);
        } else {
          y7();
          setA(3);
        }
        break;

      case 3:
        if (x5()) {
          if (x6()) {
            y6();
            y7();
            y8();
            y9();
            setA(4);
          } else {
            y10();
            y7();
            y8();
            y9();
            setA(4);
          }
        } else {
          y7();
          y8();
          y9();
          setA(4);
        }
        break;

      case 4:
        if (x7()) {
          if (x8()) {
            y11();
            setA(5);
          } else {
            setA(5);
          }
        } else {
          setA(3);
        }
        break;

      case 5:
        if (x9()) {
          y12();
          setA(6);
        } else {
          setA(6);
        }
        break;

      case 6:
				if(x8()) {
					y13()
					setA(7);
				}else{
					setA(7);
				}
        break;

      case 7:
				setIsAuto(false)
        alert("success");
        break;

      default:
        break;
    }
  }

	useEffect(() => {
		if(a !== 7 && isAuto){
			nextStep()
		}
	}, [a, isAuto])

	function clear() {
		setAResList((0x0000 >>> 0).toString(2).padStart(32, '0').split(''))
		setBResList((0x0000 >>> 0).toString(2).padStart(16, '0').split(''))
		setCResList((0x0000 >>> 0).toString(2).padStart(32, '0').split(''))
		setCounters((0x0 >>> 0).toString(2).padStart(4, '0').split(''))
		setAlist((0x0000 >>> 0).toString(2).padStart(16, '0').split(''))
		setBlist((0x0000 >>> 0).toString(2).padStart(16, '0').split(''))
		setA(0)
		setIsAuto(false)
	}

  return (
    <div className="wrapper">
      <div className="schemeWrapper">
				<div className="imgWrapper">
					<img src="/images/22.jpg" alt="" />
					<input type="checkbox" name="step" id="step1" checked={a === 0}/>
					<input type="checkbox" name="step" id="step2" checked={a === 1}/>
					<input type="checkbox" name="step" id="step3" checked={a === 2}/>
					<input type="checkbox" name="step" id="step4" checked={a === 3}/>
					<input type="checkbox" name="step" id="step5" checked={a === 4}/>
					<input type="checkbox" name="step" id="step6" checked={a === 5}/>
					<input type="checkbox" name="step" id="step7" checked={a === 6}/>
					<input type="checkbox" name="step" id="step8" checked={a === 7}/>
				</div>
      </div>
      <div className="infoWrapper">
				<div className="controlsWrapper">
					<div className="baseInfo">
						<div className="infoTitle">Исходные данные</div>
						<ControlsGroup step={a} title={'A'} data={Alist} onChange={setAlist}/>
						<ControlsGroup step={a} title={'B'} data={Blist} onChange={setBlist}/>
					</div>
					<div className="btns">
						Команда: {a}
						<button onClick={nextStep} disabled={a !== 0}>Старт</button>
						<button onClick={nextStep} disabled={a === 7}>
							Такт
						</button>
						<button onClick={() => setIsAuto(true)} disabled={a === 7 || isAuto}>Авто</button>
						<button onClick={clear} disabled={a === 0}>Сброс</button>
						{a === 7 && 
						<>
							результат: {get10value(CResList)}
						</>
						}
					</div>
				</div>
        <div className="resInfo">
          <div className="infoTitle">Результаты вычислений</div>
          <ResultGroup data={AResList} title={'A'}/>
          <ResultGroup data={BResList} title={'B'}/>
          <ResultGroup data={CResList} title={'C'}/>
          <ResultGroup data={counters} title={'СЧ'}/>
        </div>
      </div>
    </div>
  );
}

































