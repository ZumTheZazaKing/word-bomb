import Groq from "groq-sdk";

const groq = new Groq({
    apiKey:import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser:true
})

const getGroqChatCompletion = async() => {
    return groq.chat.completions.create({
        "messages": [
            {
                "role": "user",
                "content": "You are an AI assistant that gives an array of 100 prompts. A prompt being two or three letters (NEVER MORE AND NEVER LESS) that can be used in an actual word of the English lexicon. ENSURE THE PROMPT IS IN ALL CAPS. THE PROMPTS SHOULD HAVE NO NUMBERS AND SPECIAL CHARACETRS. Ensure you return just the prompts. No before or after message\n\nCorrect Examples of an array with the prompts:\n[\"TO\",\"IES\",\"IT\"]\n\nWrong Examples of prompts:\n- A\n- TOES\n- E\n- Give you a CHange by a PROMPT NOW/PREmise:\\\\n\\\\nAS\n- UP!!!\n- CYphinx:Give you a brief premise, my fate changes: What happen, now!/  Would prefer more concise phrases as below;\\\\\\rANOM /  Help with real examples give //s:\n\nRemember to use JSON"
            },
        ],
        "model": "llama3-8b-8192",
        "temperature": 0.40,
        "max_tokens": 1024,
        "top_p": 1,
        "stream": false,
        "stop": null
    });
};
export default getGroqChatCompletion