export const loadData = (key) => {
    try {
        let data = localStorage.getItem(key);
        return JSON.parse(data);
    } catch (error) {
        return undefined;
    }
};

export const saveData = (key, data) => {
    data = JSON.stringify(data);
    localStorage.setItem(key, data);
};

export const removeData = (key) => {
    localStorage.removeItem(key);
};
