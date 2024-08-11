import axios from 'axios';
import config from '../../../config.json';

let apiPriority = [
    `${config.url1}/candlyn/`,
    `${config.url2}/candlyn/`,
    // `${config.url3}/candlyn/`
];

const postWithFallback = async (endpoint, data) => {
    for (let i = 0; i < apiPriority.length; i++) {
        const url = apiPriority[i] + endpoint;
        try {
            const result = await axios.post(url, data, { timeout: 2500 });
            return result;
        } catch (error) {
            console.log(`Failed to fetch from ${url}: `, error.message);
            // Move the failed URL to the end of the priority list
            apiPriority.push(apiPriority.splice(i, 1)[0]);
            i--; // Adjust index to account for the moved element
        }
    }
    throw new Error("All API requests failed");
};

export default postWithFallback;
// await postWithFallback("response", { prompt });