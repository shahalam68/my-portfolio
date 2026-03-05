import fetch from 'node-fetch';

async function testApi() {
    try {
        const response = await fetch('http://localhost:3001/api/skills');
        const data = await response.json();
        console.log('Skills from API:', data.map(s => s.name));
    } catch (error) {
        console.error('Error fetching skills:', error.message);
    }
}

testApi();
