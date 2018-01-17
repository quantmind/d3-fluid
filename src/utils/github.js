export default {
    url (context) {
        if (context.github) return `https://github.com/${context.github}`;
    }
};
