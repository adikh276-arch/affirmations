
import fs from 'fs';
import path from 'path';

const GOOGLE_TRANSLATE_API_KEY = "AIzaSyDgyWwwmHOROsPZclCm-LGzZs_uoYNhVDk";

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'pt', name: 'Português' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'ko', name: '한국어' },
    { code: 'ru', name: 'Русский' },
    { code: 'it', name: 'Italiano' },
    { code: 'pl', name: 'Polski' },
    { code: 'th', name: 'ไทย' },
    { code: 'tl', name: 'Filipino' },
];

const sourceStrings = {
    common: {
        title: "Affirmations — A Gentle Companion",
        beforeYouBegin: "Before You Begin",
        introText1: "If you feel comfortable, you may choose to stand in front of a mirror while reading these affirmations.",
        introText2: "You might gently look at yourself and say each line out loud, slowly and clearly. Hearing your own voice can make the words feel more personal and grounding.",
        noRightWay: "There's no right way to do this.",
        takeTime: "Take your time.",
        breatheNaturally: "Breathe naturally.",
        noRush: "There is no need to rush or force any feeling.",
        meaningfulMoment: "Even if the words don't feel fully true right now, allowing this moment of intention can still be meaningful.",
        readyToBegin: "Whenever you feel ready, you may begin ✨",
        begin: "Begin",
        howFeeling: "How Are You Feeling Right Now?",
        noExplanation: "You don't have to explain or analyse anything.",
        justNotice: "Just notice what feels closest to your experience in this moment.",
        chooseOne: "Choose one feeling to begin — you can always come back.",
        readAgain: "Read Again",
        chooseAnother: "Choose Another Feeling",
    },
    feelings: {
        lonely: {
            label: "When you feel lonely and sad",
            affirmations: [
                "I am not alone, even when it feels that way.",
                "My feelings deserve care and gentleness.",
                "This moment will not last forever.",
                "I am allowed to need connection.",
                "I can offer myself warmth right now.",
            ]
        },
        terrified: {
            label: "When you feel terrified",
            affirmations: [
                "I am safe in this moment.",
                "Fear is a feeling, not a prediction.",
                "I can take this one breath at a time.",
                "I don't have to solve everything right now.",
                "I am stronger than this moment.",
            ]
        },
        insignificant: {
            label: "When you feel insignificant",
            affirmations: [
                "Small moments still count.",
                "I don't need to prove my value.",
                "I am allowed to take up space.",
                "My existence matters.",
                "I am enough as I am.",
            ]
        },
        overwhelmed: {
            label: "When you feel overwhelmed",
            affirmations: [
                "I don't have to do everything at once.",
                "One small step is enough.",
                "It's okay to pause.",
                "I am allowed to rest.",
                "This will become manageable again.",
            ]
        },
        hopeless: {
            label: "When you feel hopeless",
            affirmations: [
                "I don't need answers today.",
                "Change is still possible.",
                "I've survived difficult days before.",
                "I can stay here for now.",
                "Something gentle can still unfold.",
            ]
        },
        conflicted: {
            label: "When you feel conflicted",
            affirmations: [
                "It's okay to feel more than one thing at once.",
                "I don't need clarity immediately.",
                "Confusion does not mean failure.",
                "I can give myself time.",
                "I trust myself to figure this out.",
            ]
        },
        "self-critical": {
            label: "When you are very self-critical",
            affirmations: [
                "I can speak to myself with kindness.",
                "I don't need to punish myself to grow.",
                "Mistakes don't define who I am.",
                "I am learning, not failing.",
                "Growth does not require cruelty.",
            ]
        },
        "out-of-place": {
            label: "When you feel socially out of place",
            affirmations: [
                "I'm allowed to be quiet or different.",
                "I don't have to match anyone else's energy.",
                "I belong as I am.",
                "I can take up space gently.",
                "I am not doing this wrong.",
            ]
        },
        unsafe: {
            label: "When you feel unsafe around strangers",
            affirmations: [
                "I can move at my own pace.",
                "I am allowed to protect my boundaries.",
                "I can stay grounded in my body.",
                "I am allowed to leave situations.",
                "I can keep myself safe.",
            ]
        },
        pressured: {
            label: "When you feel pressured at work",
            affirmations: [
                "My worth is not my productivity.",
                "I don't need to prove myself constantly.",
                "Doing my best is enough today.",
                "One task at a time is okay.",
                "I am more than my role.",
            ]
        },
        "face-the-day": {
            label: "When you don't want to face the day",
            affirmations: [
                "I can take today in small pieces.",
                "Getting through is enough.",
                "I don't need motivation to begin.",
                "Showing up gently still counts.",
                "This day doesn't define me.",
            ]
        },
        future: {
            label: "When you worry about your future",
            affirmations: [
                "I can come back to the present.",
                "I will handle things as they come.",
                "I don't need certainty today.",
                "I am capable of adapting.",
                "I can trust myself a little more.",
            ]
        },
        stuck: {
            label: "When you feel stuck in a problem",
            affirmations: [
                "Being stuck doesn't mean I'm broken.",
                "I can pause without giving up.",
                "I don't need immediate solutions.",
                "I am allowed to feel unsure.",
                "I'm still moving, even slowly.",
            ]
        },
        compare: {
            label: "When you compare yourself",
            affirmations: [
                "My journey is my own.",
                "I don't need to compete to be worthy.",
                "I am allowed to grow at my pace.",
                "Someone else's success doesn't erase mine.",
                "I am not behind.",
            ]
        },
        "give-up": {
            label: "When you want to give up",
            affirmations: [
                "I don't have to decide anything right now.",
                "This feeling will pass.",
                "I've survived more than I realise.",
                "I can stay one more moment.",
                "I am still here — and that matters.",
            ]
        }
    }
};

async function translateText(text: string, targetLang: string) {
    if (targetLang === 'en') return text;

    const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            q: text,
            target: targetLang,
            format: 'text'
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json() as any;
    if (data.error) {
        console.error(`Error translating to ${targetLang}:`, data.error.message);
        return text;
    }
    return data.data.translations[0].translatedText;
}

async function generate() {
    for (const lang of languages) {
        console.log(`Generating translations for ${lang.name} (${lang.code})...`);
        const translations: any = {
            common: {},
            feelings: {}
        };

        // Translate common strings
        for (const [key, value] of Object.entries(sourceStrings.common)) {
            translations.common[key] = await translateText(value as string, lang.code);
        }

        // Translate feelings
        for (const [key, value] of Object.entries(sourceStrings.feelings)) {
            translations.feelings[key] = {
                label: await translateText(value.label, lang.code),
                affirmations: await Promise.all(value.affirmations.map(a => translateText(a, lang.code)))
            };
        }

        const filePath = path.join(process.cwd(), 'src', 'i18n', 'locales', `${lang.code}.json`);
        fs.writeFileSync(filePath, JSON.stringify(translations, null, 2));
        console.log(`Saved ${lang.code}.json`);
    }
}

generate().catch(console.error);
