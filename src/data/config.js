
const host_url = window.location.origin;
const mainUrl = {
    localhost: 'http://localhost/fiberon-backend/public',
    dev: 'https://2023fiberonvirtualexperience.thetunagroup.com', // 'https://fiberon.thetunagroup.com',https://fiberon2022.thetunagroup.com
    production:'https://veadmin.fiberondecking.com',
    meet_url_dev:'https://fiberonmeet.thetunagroup.com/tuna.meet.api.js',
    meet_url_production:'https://vemeet.fiberondecking.com/tuna.meet.api.js',
    host_url: host_url,
    voice_url: 'https://fiberonvoice.thetunagroup.com'
}


export const baseUrl = process.env.REACT_APP_API_BASE_URL;
export const prodUrl = process.env.REACT_APP_API_BASE_URL;
export const voiceUrl = process.env.REACT_APP_API_VOICE_URL;
export const chatServer = process.env.REACT_APP_API_CHAT_URL;

// export const baseUrl = mainUrl.dev;
// export const prodUrl = mainUrl.production;
// export const voiceUrl = mainUrl.voice_url;
// export const chatServer = 'https://fiberonmeet2022.thetunagroup.com/tuna.meet.api.js';