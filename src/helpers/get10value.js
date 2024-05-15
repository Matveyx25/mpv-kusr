export const get10value = (list) => {
	let sum = 0
	let res = 0

	for (let i = list.length; i >= 1; i--) {
		if(list[i] === 1){
			sum = sum + Math.pow(2, list.length - 1 - i)
		}
	}

	sum = sum % Math.pow(2, list.length)

	for (let i = list.length - 2; i >= 1; i--) {
		res += sum / Math.pow(2, i) * Math.pow(2, i - list.length)
		sum = sum % Math.pow(2, i)
	}

	return (list[0] === 1 ? -1 * res : res).toFixed(4)
}