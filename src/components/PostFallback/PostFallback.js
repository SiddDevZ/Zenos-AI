import axios from 'axios';
import config from '../../../config.json';

const postWithFallback = async (endpoint, data) => {
    const urls = [
        `${config.url1}/candlyn/${endpoint}`,
        `${config.url2}/candlyn/${endpoint}`,
        // `${config.url3}/candlyn/${endpoint}`
    ];
    for (const url of urls) {
        try {
            const result = await axios.post(url, data, { timeout: 2500 });
            return result;
        } catch (error) {
            console.log(`Failed to fetch from ${url}: `, error.message);
        }
    }
    throw new Error("All API requests failed");
};

export default postWithFallback;
// await postWithFallback("response", { prompt });