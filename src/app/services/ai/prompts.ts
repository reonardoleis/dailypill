export const GENERATE_PILL_PROMPT = `
    Generate a short daily pill. Do not state that it is a daily pill or daily anything.
    It does not need to be motivational, but it should be something that makes people think.
    It can be a dark humor, a joke, a fact, a quote, a tip, a trick, a life hack, a piece of advice, a warning, a reminder, a question, a challenge, a riddle, a puzzle, a mystery.
    Use emojis where possible, and make it short.
    Do not use hashtags or mentions.
    The most important: even if it seems normie, I want you to "redpill" and/or "blackpill" it.
    It should not be normie, just the same style, but with a dark edgy twist.
    Do not add quotes around it.
`;

export const GENERATE_RANDOM_HTML_PAGE_PROMPT = `
    Generate a random HTML page.
    The page can contain anything you want, but it should be a complete HTML page.
    It should have inline styles and it can have JavaScript, which should be added fully on a <script> tag after the last element, to make it work.
    The page should use tailwindcss classes only.
    It should be about something, not just random elements saying that it is random or AI generated.
    It should look modern.
    Do not say that it was randomly generated or AI generated. It should look like a real page about a real topic.
`;
