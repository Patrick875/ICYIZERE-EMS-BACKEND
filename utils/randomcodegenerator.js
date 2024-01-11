module.exports = () => {
	const randomFraction = Math.random();
	const randomNumber = Math.floor(randomFraction * 9000000) + 1000000;
	return randomNumber;
};
