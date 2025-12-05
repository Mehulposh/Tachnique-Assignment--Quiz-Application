import mongoose from "mongoose";

const AttemptSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    quizTitle: { type: String, required: true },
    userName: { type: String, default: 'Guest' },
    answers: {
        type: Map,
        of: String,
        required: true
    },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    percentage: { type: Number, required: true },
    timeTaken: { type: Number, default: 0 } // in seconds
}, { timestamps: true  }
)

export default mongoose.model('Attempt', AttemptSchema);