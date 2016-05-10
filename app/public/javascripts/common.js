module.exports = {
    formInfoMapping: {
        fullName: {
            isRequired: true
        },
        passWord: {
            isRequired: true
        },
        stuID: {
            isRequired: true
        }
    },
    transformIntoCamelCase: (string) => {
        return $.camelCase(string);
    }
}
