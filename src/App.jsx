import React, { useEffect, useState } from "react";
import "./App.scss";
import { get10value } from "./helpers/get10value";
import { ResultGroup } from './components/ResultGroup';

export default function App() {
  const [Alist, setAlist] = useState(Array(16).fill(0));
  const [Blist, setBlist] = useState(Array(16).fill(0));
  const [a, setA] = useState(1);
  const [counters, setCounters] = useState([0, 0, 0, 0]);

  const [AResList, setAResList] = useState(Array(32).fill(0));
  const [BResList, setBResList] = useState(Array(16).fill(0));
  const [CResList, setCResList] = useState(Array(32).fill(0));

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

    const x1 = () => {
			setBResList(Blist)
      return true
    }
    const x2 = () => {
      return !Alist.includes(1);
    }
    const x3 = () => {
      return !Blist.includes(1);
    }
    const x4 = () => {
      return Alist[Alist.length - 1 - 15] === 1;
    }
    const x5 = () => {
      return BResList[BResList.length - 1] === 1;
    }
    const x6 = () => {
      const b0 = BResList[BResList.length - 1] === 1; // B(0)
      const b1 = BResList[BResList.length - 1 - 1] === 1; // B(1)

      const result = b0 !== b1;
      return result;
    }
    const x7 = () => {
      return BResList[BResList.length - 1 - 1] === 1;
    }
    const x8 = () => {
      return !counters.includes(1);
    }
    const x9 = () => {
      return CResList[CResList.length - 31 - 1] === 1;
    }
    const x10 = () => {
      return CResList[CResList.length - 14 - 1] === 1;
    }
		const y0 = () => {

		}
    const y1 = () => {
      return updateListFromBinaryValue(0x00000000, CResList);
    }
    const y2 = () => {
      return [1, 1, 1, 1];
    }
    const y3 = () => {
			let A = [...Alist]
      let Am = [...AResList];

      Am[Am.length - 32] = A[0];
      Am[Am.length - 31] = A[0];

      return Am;
    }
		const y4 = (arr) => {
			let Am = parseInt(AResList.join(''), 2) & 0xC0007FFF;
			return updateListFromBinaryValue(Am, arr);
		}
    const y5 = (arr) => {
      let A = parseInt(Alist.join(""), 2) & 0x7fff;
      let Am = parseInt(AResList.join(""), 2) & 0x7fff;

      Am |= A;

      return updateListFromBinaryValue(Am, arr);
    }

    const y6 = () => {
			debugger
      let Am = parseInt(AResList.join(""), 2); // Convert AResList to an integer
      let invertedAm = ~Am;
      let mask = 0x3FFFE000; // 00011111111111111111111100000000 in binary

      let invertedUpper15BitsAm = invertedAm & mask;
    	Am = Am & 0x7FFF; // 00000000000000001111111111111111 in binary
    	Am = Am | invertedUpper15BitsAm;

      setAResList(updateListFromBinaryValue(Am, AResList));
    }
    const y7 = () => {
      // C:=C+A̅M̅+1
			let Am = parseInt(AResList.join(""), 2); // Convert AResList to an integer
      let invertedAm = ~Am;
      let invertedAmPlusOne = invertedAm + 1;
      let C = parseInt(CResList.join(""), 2) + invertedAmPlusOne;
      setCResList((C >>> 0).toString(2).padStart(32, '0').split(''));
    }
    const y8 = () => {
      // AM:=L1(AM.0)
      let shiftedAm = (parseInt(AResList.join(""), 2) << 1) >>> 0;
      setAResList((shiftedAm >>> 0).toString(2).padStart(32, '0').split(''));
    }
    const y9 = () => {
      let Bm = parseInt(BResList.join(""), 2) >>> 1;
      setBResList((Bm >>> 0).toString(2).padStart(16, '0').split(''));
    }
    const y10 = () => {
			let CR = parseInt(counters.join(""), 2) - 1;
			setCounters((CR >>> 0).toString(2).padStart(4, '0').split(''))
    }
    const y11 = () => {
      // C:=C+AM
      let result = parseInt(CResList.join(""), 2) + parseInt(AResList.join(""), 2);
      setCResList(updateListFromBinaryValue(result, CResList));
    }
    const y12 = () => {
      // C(29:0)=C̅(29:0) + 1
      let complementedLower30Bits = ~parseInt(CResList.join(""), 2) & 0x3fffffff;
      let result = complementedLower30Bits + 1;
      let C = (parseInt(CResList.join(""), 2) & 0xc0000000) | result;
      setCResList(updateListFromBinaryValue(C, CResList));

    }
    const y13 = () => {
      // C(30:16) = C̅(29:15) + 1
      let invertedLower15BitsC = ~parseInt(CResList.join(""), 2) & 0xffff8000;
      let incrementedValue = invertedLower15BitsC + 1;
      let C =
        (parseInt(CResList.join(""), 2) & 0x00007fff) |
        (incrementedValue << 15);
      setCResList(updateListFromBinaryValue(C, CResList));
    }
    const y14 = () => {
      // C(30:16) = C̅(30:16) + 1
      let complementedBits = ~parseInt(CResList.join(""), 2) & 0x3fff8000;
      let result = complementedBits + 1;
      let C = (parseInt(CResList.join(""), 2) & 0xc0007fff) | result;
      setCResList(updateListFromBinaryValue(C, CResList));
    }

  function runMP() {
    switch (a) {
      case 1:
        if (x1()) {
          if (x2()) {
            y1();
            setA(8);
          } else {
            if (x3()) {
              y1();
              setA(8);
            } else {
							let cnt = [...counters]
							let Am = [...AResList]
							let C = [...CResList]
              C = y1();
              cnt = y2();
              Am = y3();
              Am = y4(Am);
              Am = y5(Am);
							debugger
							setCResList(C)
							setCounters(cnt)
							setAResList(Am)
              setA(2);
            }
          }
        } else {
          setA(1);
        }
        break;

      case 2:
        if (x4()) {
          y6();
          setA(3);
        } else {
          setA(3);
        }
        break;

      case 3:
        if (x5()) {
          y7();
          y8();
          setA(4);
        } else {
          y8();
          setA(4);
        }
        break;

      case 4:
        if (x6()) {
          if (x7()) {
            y7();
            y8();
            y9();
            y10();
            setA(5);
          } else {
            y11();
            y8();
            y9();
            y10();
            setA(5);
          }
        } else {
          y8();
          y9();
          y10();
          setA(5);
        }
        break;

      case 5:
        if (x8()) {
          if (x9()) {
            y12();
            setA(6);
          } else {
            setA(6);
          }
        } else {
          setA(4);
        }
        break;

      case 6:
        if (x10()) {
          y13();
          setA(7);
        } else {
          setA(7);
        }
        break;

      case 7:
        setA(8);
        break;

      case 8:
        y0();
        setA(1);
        alert("success");
        break;

      default:
        break;
    }
  }

  return (
    <div className="wrapper">
      <div className="schemeWrapper">
        <img src="/images/22.jpg" alt="" />
      </div>
      <div className="infoWrapper">
        <div className="baseInfo">
          <div className="infoTitle">Исходные данные</div>
          <div className="baseFlex">
            <div className="baseTitle">A</div>
            <table>
              <tr>
                {Alist.map((el, index) => {
                  return (
                    <td>
                      <span>{Alist.length - index - 1}</span>
                    </td>
                  );
                })}
              </tr>
              <tr>
                {Alist.map((el, index) => {
                  const isActive = Alist[index] === 1;

                  return (
                    <td>
                      <button
                        className={isActive ? "active" : ""}
                        onClick={() => {
                          setAlist((prev) => {
                            let newArr = [...prev];
                            newArr[index] = isActive ? 0 : 1;
                            return newArr;
                          });
                        }}
                      >
                        {el}
                      </button>
                    </td>
                  );
                })}
              </tr>
            </table>
          </div>
          {get10value(Alist)}
          <div className="baseFlex">
            <div className="baseTitle">B</div>
            <table>
              <tr>
                {Blist.map((el, index) => {
                  return (
                    <td>
                      <span>{Blist.length - index - 1}</span>
                    </td>
                  );
                })}
              </tr>
              <tr>
                {Blist.map((el, index) => {
                  const isActive = Blist[index] === 1;

                  return (
                    <td>
                      <button
                        className={isActive ? "active" : ""}
                        onClick={() => {
                          setBlist((prev) => {
                            let newArr = [...prev];
                            newArr[index] = isActive ? 0 : 1;
                            return newArr;
                          });
                        }}
                      >
                        {el}
                      </button>
                    </td>
                  );
                })}
              </tr>
            </table>
          </div>
          {get10value(Blist)}
        </div>
        <div className="resInfo">
          <div className="infoTitle">Результаты вычислений</div>
          <ResultGroup data={AResList} title={'A'}/>
          <ResultGroup data={BResList} title={'B'}/>
          <ResultGroup data={CResList} title={'C'}/>
          <ResultGroup data={counters} title={'СЧ'}/>
        </div>
        <div className="btns">
          Команда: {a - 1}
          <button onClick={() => runMP()}>Старт</button>
          <button>
            Такт
          </button>
          <button>Авто</button>
          <button>Сброс</button>
        </div>
      </div>
    </div>
  );
}