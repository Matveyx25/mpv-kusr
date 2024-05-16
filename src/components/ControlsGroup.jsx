import React from 'react'
import { get10value } from '../helpers/get10value';

export const ControlsGroup = ({data, onChange, title, step}) => {
	return (
		<>
			<div className="baseFlex">
				<div className="baseTitle">{title}</div>
				<table>
					<tbody>
						<tr>
							{data.map((el, index) => {
								return (
									<td key={'label-' + title + '_' + index}>
										<span>{data.length - index - 1}</span>
									</td>
								);
							})}
						</tr>
						<tr>
							{data.map((el, index) => {
								const isActive = data[index] === 1;

								return (
									<td key={'button-' + title + '_' + index}>
										<button
											disabled={step != 0}
											className={isActive ? "active" : ""}
											onClick={() => {
												onChange((prev) => {
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
					</tbody>
				</table>
			</div>
			{get10value(data)}
		</>
	)
}
