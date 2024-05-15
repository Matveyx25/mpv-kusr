import React from 'react'

export const ResultGroup = ({data, title}) => {
	return (
		<div className="baseFlex">
			<div className="baseTitle">{title}</div>
			<table>
				<tbody>
					<tr>
						{data.map((el, index) => {
							return (
								<td key={'result-label-' + title + '_' + index}>
									<span>{data.length - index - 1}</span>
								</td>
							);
						})}
					</tr>
					<tr>
						{data.map((el, index) => {
							const isActive = el === 1;

							return (
								<td key={'result-value-' + title + '_' + index}>
									<span className={isActive ? "active" : ""}>{el}</span>
								</td>
							);
						})}
					</tr>
				</tbody>
			</table>
		</div>
	)
}
