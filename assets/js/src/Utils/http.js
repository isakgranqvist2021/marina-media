const serverAddr = 'http://localhost:8080/api';

async function GET(url) {
    try {
        const response = await fetch(serverAddr + url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        return await response.json();
    } catch (err) {
        return Promise.resolve(err);
    }
}

async function POST(url, body, headers = { 'Content-Type': 'application/json' }) {
    try {
        const response = await fetch(serverAddr + url, {
            method: 'POST',
            body: body,
            headers: headers
        });

        console.log(response.status);

        return await response.json();
    } catch (err) {
        console.log('error');
        console.log(err);
        return Promise.reject(err);
    }
}


export default { GET, POST, serverAddr };