function to_registerpage() {
    window.location.href = "../logincheck.html";
}

function to_feedbackpage() {
    window.location.href = "feedback/feedback.html";
}

function to_dashboardpage() {
    window.location.href = "dashboard/dashboard.html"; 
}

function to_cheatsheet() {
    window.location.href = "cheatsheets/intro.html";
}

function to_languagepage() {
    window.location.href = "languages/cpage.html";
}

function to_resourcespage() {
    window.location.href = "../resources/CSEresource.html";
}
function closeM() {
    document.querySelector('.mobiles-options').style.left = "-280px";
}

function openM() {
    document.querySelector('.mobiles-options').style.left = "0px";
}

const canvas = document.getElementById('dots-bg');
const ctx = canvas.getContext('2d');
let dots = [];
const DOTS_COUNT = 60;
const DOT_RADIUS = 2;
const SPEED = 0.3;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function initDots() {
    dots = [];
    for (let i = 0; i < DOTS_COUNT; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * SPEED,
            dy: (Math.random() - 0.5) * SPEED
        });
    }
}
initDots();

function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let dot of dots) {
        dot.x += dot.dx;
        dot.y += dot.dy;
        if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
    requestAnimationFrame(animateDots);
}
animateDots();

const aiModalBackdrop = document.getElementById('ai-assistant-modal-backdrop');
const aiPromptInput = document.getElementById('ai-assistant-prompt');
const aiResponseDiv = document.getElementById('ai-assistant-response');
const aiActionButton = document.querySelector('.ai-assistant-action-button');

function openAIAssistantModal() {
    aiModalBackdrop.style.display = 'flex';
}

function closeAIAssistantModal() {
    aiModalBackdrop.style.display = 'none';
}

async function callGeminiAPI() {
    const userPrompt = aiPromptInput.value.trim();
    if (!userPrompt) {
        aiResponseDiv.innerHTML = "Please enter a question or topic to get a response.";
        return;
    }

    aiResponseDiv.innerHTML = '<div class="loader"></div>';
    aiActionButton.disabled = true;

    const prompt = `You are an AI assistant for a technical education platform. Provide a helpful, clear, and concise response to the user's query. Format your response using Markdown for readability. The query is: ${userPrompt}`;

    let chatHistory = [];
    chatHistory.push({
        role: "user",
        parts: [{
            text: prompt
        }]
    });

    const payload = {
        contents: chatHistory
    };
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    const maxRetries = 5;
    let retryCount = 0;
    let success = false;
    let text = "An error occurred. Please try again.";

    try {
        while (retryCount < maxRetries && !success) {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`API request failed with status ${response.status}:`, errorData);
                throw new Error(`HTTP error! status: ${response.status} - ${JSON.stringify(errorData)}`);
            }

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                text = result.candidates[0].content.parts[0].text;
                success = true;
            } else {
                throw new Error("Unexpected API response structure.");
            }
        }
    } catch (error) {
        console.error("Failed to call Gemini API:", error);
        text = `An error occurred while fetching the response. Details: ${error.message}`;
    } finally {
        aiResponseDiv.innerHTML = success ? text : `An error occurred after ${maxRetries} retries. Please check the browser console for details.`;
        aiActionButton.disabled = false;
    }
}