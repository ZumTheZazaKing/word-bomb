import Groq from "groq-sdk";

const groq = new Groq({
    apiKey:import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser:true
})

const getGroqChatCompletion = async() => {
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are an AI assistant that gives a prompt and just a, nothing else. A prompt being two or three letters (never more, never less) that can be used in an actual word of the English lexicon. Ensure the prompt is in all caps. Ensure you return just the prompt. No before or after message\n\nCorrect Examples:\n- TO\n- IES\n- IT\n\nWrong Examples:\n- A\n- TOES\n- E\n- Give you a CHange by a PROMPT NOW/PREmise:\\n\\nAS\n- UP!!!\n- CYphinx:Give you a brief premise, my fate changes: What happen, now!/  Would prefer more concise phrases as below;\\\\nrANOM /  Help with real examples give //s:"
            },
            {
                role: "user",
                content: "Give me a prompt",
            },
        ],
        model: "llama3-8b-8192",
        "temperature": 2,
        "max_tokens": 1024,
        "top_p": 1,
        "stream": false,
        "stop": null
    });
};
export default getGroqChatCompletion