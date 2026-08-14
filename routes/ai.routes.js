const { GoogleGenAI } = require("@google/genai");
const Groq =  require('groq-sdk');
const multer = require('multer')
const express = require('express')
const router = express.Router()
const upload = multer({
  storage: multer.memoryStorage(),
});

router.post('/format', async (req, res, next) => {
    try {
        // extract the string you will be sending the AI to parse 
        const rawInput = req.body.markdownText
        // https://codesignal.com/learn/courses/understanding-llms-and-basic-prompting-techniques-1/lessons/effective-prompt-engineering-with-the-markdown-prompts-framework
        const prompt = `__ASK__
                        Clean up and convert the provided unstructured note text into clean, well-organized Markdown.

                        __CONTEXT__
                        --- RAW NOTE START ---
                        ${rawInput}
                        --- RAW NOTE END ---

                        __CONSTRAINTS__
                        * Fix spelling, grammar, and typos without altering the original meaning.
                        * Add appropriate Markdown headers (##, ###), bullet lists, and bold text for key terms.
                        * Do NOT add intro phrases (e.g., do NOT write "Here is your formatted note:").
                        * Do NOT wrap the output in an outer \`\`\`markdown code block fence.
                        * Output ONLY the raw formatted Markdown.

                        __EXAMPLE__
                        Input:
                        "meeting notes 08/12 discuss backend schema update database migration failing need to fix by friday contact alex"

                        Output:
                        ## Meeting Notes (08/12)

                        ### Action Items
                        * **Database Migration:** Fix schema update failure by Friday.
                        * **Point of Contact:** Reach out to Alex.`;
        
        const ai = new GoogleGenAI({});
        const interaction = await ai.interactions.create({
            model: "gemini-3.6-flash",
            input: prompt,
        });
        const formattedContent = interaction.output_text;
        res.json({formattedContent});
    } catch (error) {
        next(error)
    }
})

router.post('/transcribe', upload.single('audio'), async (req, res) => {
  // req.file.buffer contains your audio blob data
  // Pass buffer/stream to your chosen SDK (OpenAI, AssemblyAI, Deepgram)
    const groq = new Groq();
    const audioFile = new File(
        [req.file.buffer],
        req.file.originalname,
        { type: req.file.mimetype }
    );
    
    const transcription = await groq.audio.transcriptions.create({
        file: audioFile,
        model: "whisper-large-v3-turbo",
        temperature: 0,
        response_format: "verbose_json",
    });
    res.json(transcription.text);
})




module.exports = router