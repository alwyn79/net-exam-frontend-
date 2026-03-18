// const rawBaseUrl = import.meta.env.VITE_API_URL
// const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

// const TOKEN_KEY = 'net_exam_token';
// const GUEST_EMAIL_KEY = 'net_exam_guest_email';
// const GUEST_PASSWORD_KEY = 'net_exam_guest_password';

// function getToken() {
//     return localStorage.getItem(TOKEN_KEY);
// }

// function setToken(token) {
//     localStorage.setItem(TOKEN_KEY, token);
// }

// function getOrCreateGuestCredentials() {
//     let email = localStorage.getItem(GUEST_EMAIL_KEY);
//     let password = localStorage.getItem(GUEST_PASSWORD_KEY);

//     if (!email || !password) {
//         const id = crypto.randomUUID();
//         email = `guest_${id}@example.com`;
//         password = `Guest!${id}`;
//         localStorage.setItem(GUEST_EMAIL_KEY, email);
//         localStorage.setItem(GUEST_PASSWORD_KEY, password);
//     }

//     return { email, password, name: 'Guest User' };
// }

// async function readJsonOrThrow(res) {
//     const text = await res.text();
//     const data = text ? JSON.parse(text) : null;

//     if (!res.ok) {
//         const message =
//             (data && (data.error || data.message)) ||
//             `Request failed with status ${res.status}`;
//         throw new Error(message);
//     }
//     return data;
// }

// async function login(email, password) {
//     const res = await fetch(`${API_BASE_URL}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//     });
//     return await readJsonOrThrow(res);
// }

// async function register(name, email, password) {
//     const res = await fetch(`${API_BASE_URL}/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password })
//     });
//     return await readJsonOrThrow(res);
// }

// async function ensureToken() {
//     const existing = getToken();
//     if (existing) return existing;

//     const { name, email, password } = getOrCreateGuestCredentials();

//     try {
//         const data = await register(name, email, password);
//         if (!data?.token) throw new Error('Token missing in register response');
//         setToken(data.token);
//         return data.token;
//     } catch (e) {
//         // If user already exists (or register fails), try login with same creds.
//         const data = await login(email, password);
//         if (!data?.token) throw new Error('Token missing in login response');
//         setToken(data.token);
//         return data.token;
//     }
// }

// export const fetchQuestions = async () => {
//     const token = await ensureToken();
//     const res = await fetch(`${API_BASE_URL}/questions`, {
//         headers: { Authorization: `Bearer ${token}` }
//     });
//     return await readJsonOrThrow(res);
// };

// export const submitExamData = async (answers, totalQuestions) => {
//     const token = await ensureToken();
//     const res = await fetch(`${API_BASE_URL}/questions/submit`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ answers, totalQuestions })
//     });

//     const data = await readJsonOrThrow(res);

//     // Normalize backend result shape to what the UI expects.
//     return {
//         totalQuestions: data.totalQuestions ?? totalQuestions,
//         attemptedQuestions: data.attempted ?? data.attemptedQuestions ?? 0,
//         correctAnswers: data.correct ?? data.correctAnswers ?? 0,
//         wrongAnswers: data.wrong ?? data.wrongAnswers ?? 0,
//         finalScore: data.score ?? data.finalScore ?? 0
//     };
// };
const API = import.meta.env.VITE_API_URL

// ✅ GET QUESTIONS
export const fetchQuestions = async () => {
    const res = await fetch(`${API}/questions`);

    if (!res.ok) {
        throw new Error("Failed to fetch questions");
    }

    return res.json();
};

// ✅ SUBMIT EXAM
export const submitExamData = async (answers, questions) => {
    const res = await fetch(`${API}/questions/submit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            answers,
            questions
        })
    });

    if (!res.ok) {
        throw new Error("Submit failed");
    }

    return res.json();
};