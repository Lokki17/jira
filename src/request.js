import axios from 'axios';
export const request = async (url, params = {}) => {
		const { data } = await axios(url, params)
		return data
}
