export const get10value = (data) => {
	// Пропускаем первый бит и преобразуем остальную часть в строку
	let binaryString = data.slice(1).join('');
    
	// Преобразуем строку в десятичное число
	let result = parseInt(binaryString, 2);
	
	// Делим результат на степень двойки, равную размеру пропущенной части
	result /= Math.pow(2, data.length - 1);
	
	// Возвращаем итоговое десятичное число с учетом знак
	return (+data[0] === 1 ? (result === 0? result : -result) : result).toFixed(4);
};