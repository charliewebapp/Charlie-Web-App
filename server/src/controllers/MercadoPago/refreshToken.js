const axios = require('axios');

const refreshToken = async () => {
    const url = 'https://api.mercadopago.com/oauth/token';

    const data = {
        'client_secret': 'your-client-secret',
        'client_id': 'your-client-id',
        'refresh_token': 'refresh-token',
        'grant_type': 'refresh_token'
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

refreshToken();
