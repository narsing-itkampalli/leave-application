function formDataToJson(formData) {
    const obj = {};
    for (const [key, value] of formData.entries()) {
        // If the key already exists, convert to array or append to it
        if (obj[key]) {
            if (!Array.isArray(obj[key])) {
                obj[key] = [obj[key]];
            }
            obj[key].push(value);
        } else {
            obj[key] = value;
        }
    }
    return JSON.stringify(obj);
}