import React from 'react'

export const ResultGroup = ({data, title}) => {
	return (
		<div className="baseFlex">
			<div className="baseTitle">{title}</div>
			<table>
				<tr>
					{data.map((el, index) => {
						return (
							<td>
								<span>{data.length - index - 1}</span>
							</td>
						);
					})}
				</tr>
				<tr>
					{data.map((el, index) => {
						const isActive = el === 1;

						return (
							<td>
								<span className={isActive ? "active" : ""}>{el}</span>
							</td>
						);
					})}
				</tr>
			</table>
		</div>
	)
}
