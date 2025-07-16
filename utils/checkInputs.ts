const checkInputs = (input: {}) => {
    const arr = Object.entries(input);
    for (let item of arr) {
        if (!item[1]) {
            return [`${item[0]} is missing`];
        }
    }
};

export default checkInputs;
