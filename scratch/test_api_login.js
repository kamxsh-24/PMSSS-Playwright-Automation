async function testApi() {
  const loginRes = await fetch('https://prime-minister-special-scholarship-portal.onrender.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'kamesh@gmail.com', password: 'Kamesh@123' })
  });
  console.log('Login status:', loginRes.status);
  const text = await loginRes.text();
  console.log('Login raw text:', text.substring(0, 300));
}

testApi();
