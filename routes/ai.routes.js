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
// Consider having these prompts somehwere else like in another file, it looks very not good
router.post("/flashcards", async (req, res, next) => {
  try {
    const rawInput = req.body.markdownText;

    const prompt = `
      ROLE

      You are an expert educational flashcard generator. Your job is to turn
      student notes into accurate, useful study flashcards.

      TASK

      Create a set of flashcards from the provided notes. Identify the most
      important concepts, facts, definitions, processes, and relationships
      that a student should remember.

      CONSTRAINTS

      - Use only information supported by the provided notes.
      - Do not invent or add outside information.
      - The notes may be written as Markdown or plain, unformatted text.
        Treat both formats the same.
      - Ignore the formatting of the notes and focus on their meaning.
      - Do not create duplicate or nearly identical flashcards.
      - Do not create trivial questions.

      REQUIREMENTS

      - Questions should be clear and concise.
      - Answers should be accurate and concise.
      - Focus on important information rather than minor details.
      - Create enough flashcards to cover the important concepts without
        unnecessarily repeating information.

      OUTPUT

      Return only a valid JSON array.

        Do not use Markdown formatting.
        Do not wrap the JSON in code fences.
        Do not include \`\`\`json or \`\`\` around the response.        
        Do not include any explanation or additional text.

        Each flashcard must contain:
        - "question": the question presented to the student
        - "answer": the correct answer

        Example:

        [
        {
            "question": "What is photosynthesis?",
            "answer": "The process by which plants convert light energy into chemical energy."
        },
        {
            "question": "Where does photosynthesis occur?",
            "answer": "In the chloroplasts of plant cells."
        }
        ]

      FEW-SHOT EXAMPLE

      Notes:
      "Photosynthesis is the process plants use to convert light energy
      into chemical energy. It takes place primarily in chloroplasts."

      Flashcards:
      [
        {
          "question": "What is the purpose of photosynthesis?",
          "answer": "To convert light energy into chemical energy."
        },
        {
          "question": "Where does photosynthesis primarily occur?",
          "answer": "In chloroplasts."
        }
      ]

      CONTEXT

      Generate flashcards from the following student notes:

      ${rawInput}
    `;

    const ai = new GoogleGenAI({});
        const interaction = await ai.interactions.create({
            model: "gemini-3.6-flash",
            input: prompt,
        });
        const formattedContent = interaction.output_text;
        res.json({formattedContent});
  } catch (error) {
    next(error);
  }
});




module.exports = router