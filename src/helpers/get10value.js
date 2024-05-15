export const get10value = (data) => {
	let sum = 0;
	let res = 0;
	let list = data.map(el => +el)

	// Преобразование двоичного числа в десятичное
	for (let i = list.length - 1; i >= 0; i--) {
			if (+list[i] === 1) {
					sum += Math.pow(2, i);
			}
	}

	// Учитываем переполнение для чисел больше максимального значения списка
	sum %= Math.pow(2, list.length);

	// Преобразование результата в десятичное число с плавающей точкой
	for (let i = list.length - 2; i >= 0; i--) {
			res += sum / Math.pow(2, i) * Math.pow(2, i - list.length);
			sum %= Math.pow(2, i);
	}

	// Возвращаем результат с округлением до 4 знаков после запятой
	return (list[0] === 1? -1 * res : res).toFixed(4);
};