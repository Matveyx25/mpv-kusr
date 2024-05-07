import React, { useEffect, useState } from 'react';
import './App.scss'; 

export default function App() {
	const [currentCmd, setCurrentCmd] = useState(0)
	const [isStopped, setIsStopped] = useState(true)
	const [Alist, setAlist] = useState(Array(16).fill(0))
	const [Blist, setBlist] = useState(Array(17).fill(0))
	const [counters, setCounters] = useState([0,0,0,0])
	
	const [AResList, setAResList] = useState(Array(32).fill(0))
	const [BResList, setBResList] = useState(Array(16).fill(0))
	const [CResList, setCResList] = useState(Array(32).fill(0))

	const nextStep = () => {
		if (isStopped) {
			setIsStopped(false)
			setCurrentCmd(currentCmd + 1);
		}
	}

	const cmd = {
		y0() {
			return null
		},
		y1() {
			setCurrentCmd(2)
		},
		y2() {
			if(Alist.includes(1)){
				setCurrentCmd(3)
			}else{
				setCurrentCmd(4)
			}
		},
		y3() {
			if(Blist.includes(1)){
				setCurrentCmd(5)
			}else{
				setCurrentCmd(4)
			}
		},
		y4() {
			setCResList(Array(32).fill(0))
			//TODO переход в конец программы
		},
		y5() {
			setCResList(Array(32).fill(0))
			setCounters([1,1,1,1])
			setAResList(prev => {
				let newArr = prev
				newArr[32] = Alist[15]
				newArr[31] = Alist[15]
				for (let i = 0; i < 15; i++) {
					newArr[i] = Alist[i]
				}
				for (let i = 15; i < 30; i++) {
					newArr[i] = 0
				}
				return newArr
			})
			setIsStopped(true)
		},
		y6() {
			if(Alist[15] === 1){
				setCurrentCmd(7)
			}else{
				setCurrentCmd(8)
			}
		},
		y7() {
			setAResList(prev => {
				let newArr = prev
				for (let i = 15; i < 30; i++) {
					newArr[i] = newArr[i] === 1 ? 0 : 1
				}
				return newArr
			})
			setIsStopped(true)
		},
		y8() {
			if(Blist[0] === 1){
				setCurrentCmd(9)
			}else{
				setCurrentCmd(10)
			}
		},
		y9() {
			//c = c + !(Am) + 1
			setIsStopped(true)
		}
	}

	const get10value = (list) => {
		let sum = 0
		let res = 0

		for (let i = list.length; i >= 1; i--) {
			if(list[i] === 1){
				sum = sum + Math.pow(2, list.length - 1 - i)
			}
		}

		sum = sum % Math.pow(2, list.length)

		for (let i = list.length - 1; i >= 1; i--) {
			res += sum / Math.pow(2, i) * Math.pow(2, i - list.length)
			sum = sum % Math.pow(2, i)
		}
	
		return (list[0] === 1 ? -1 * res : res).toFixed(4)
	}

	useEffect(() => {
    if (currentCmd >= 0 && currentCmd < Object.keys(cmd).length) {
      cmd[`y${currentCmd}`]();
    }
  }, [currentCmd]);

  return (
    <div className='wrapper'>
			<div className="schemeWrapper">
				<img src="/images/22.jpg" alt="" />
			</div>
			<div className="infoWrapper">
				<div className="baseInfo">
					<div className="infoTitle">
						Исходные данные
					</div>
					<div className="baseFlex">
						<div className="baseTitle">
							A
						</div>
						<table>
							<tr>
								{Alist.map((el, index) => {
									return (
										<td><span>{Alist.length - index - 1}</span></td>
									)
								})}
							</tr>
							<tr>
								{Alist.map((el, index) => {
									const isActive = Alist[index] === 1

									return (
										<td><button className={isActive ? 'active' : ''} onClick={() => {
											setAlist((prev) => {
												let newArr = [...prev]
												newArr[index] = isActive ? 0 : 1
												return newArr
											})
										}}>{el}</button></td>
									)
								})}
							</tr>
						</table>
					</div>
					{get10value(Alist)}
					<div className="baseFlex">
						<div className="baseTitle">
							B
						</div>
						<table>
							<tr>
								{Blist.map((el, index) => {
									return (
										<td><span>{Blist.length - index - 1}</span></td>
									)
								})}
							</tr>
							<tr>
								{Blist.map((el, index) => {
									const isActive = Blist[index] === 1

									return (
										<td><button className={isActive ? 'active' : ''} onClick={() => {
											setBlist((prev) => {
												let newArr = [...prev]
												newArr[index] = isActive ? 0 : 1
												return newArr
											})
										}}>{el}</button></td>
									)
								})}
							</tr>
						</table>
					</div>
					{get10value(Blist)}
				</div>
				<div className="baseInfo">
					<div className="infoTitle">
						Результаты вычислений
					</div>
					<div className="baseFlex">
						<div className="baseTitle">
							A
						</div>
						<table>
							<tr>
								{AResList.map((el, index) => {
									return (
										<td><span>{AResList.length - index - 1}</span></td>
									)
								})}
							</tr>
							<tr>
								{AResList.map((el, index) => {
									const isActive = AResList[AResList.length - index - 1] === 1

									return (
										<td><span className={isActive ? 'active' : ''}>{AResList[AResList.length - index - 1]}</span></td>
									)
								})}
							</tr>
						</table>
					</div>
					<div className="baseFlex">
						<div className="baseTitle">
							B
						</div>
						<table>
							<tr>
								{BResList.map((el, index) => {
									return (
										<td><span>{BResList.length - index - 1}</span></td>
									)
								})}
							</tr>
							<tr>
								{BResList.map((el, index) => {
									const isActive = BResList[BResList.length - index - 1] === 1

									return (
										<td><span className={isActive ? 'active' : ''}>{BResList[BResList.length - index - 1]}</span></td>
									)
								})}
							</tr>
						</table>
					</div>
					<div className="baseFlex">
						<div className="baseTitle">
							C
						</div>
						<table>
							<tr>
								{CResList.map((el, index) => {
									return (
										<td><span>{CResList.length - index - 1}</span></td>
									)
								})}
							</tr>
							<tr>
								{CResList.map((el, index) => {
									const isActive = CResList[CResList.length - index - 1] === 1

									return (
										<td><span className={isActive ? 'active' : ''}>{CResList[CResList.length - index - 1]}</span></td>
									)
								})}
							</tr>
						</table>
					</div>
				</div>
				<div className="btns">
					y{currentCmd}
					<button onClick={() => nextStep()}>Старт</button>
					<button disabled={!isStopped} onClick={() => nextStep()}>Такт</button>
					<button>Авто</button>
					<button>Сброс</button>
				</div>
			</div>
    </div>
  );
}