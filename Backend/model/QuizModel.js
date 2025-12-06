import mongooese from "mongoose";

const QuestionSchema = new mongooese.Schema({
    id: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ['MCQ', 'TrueFalse', 'Text']
    },
    question: { type: String, required: true },
    options: { 
        type: [String],
        default: undefined,
        validate:{ 
            validator: function(value) {
            return this.type === 'MCQ' || (Array.isArray(value) && value.length >= 2);
            }, 
            message: 'Options are required for MCQ type questions and should have at least two options.'
        },
        required: true 
    },
    correctAnswer: { type: String, required: true }
    
});


const QuizSchema = new mongooese.Schema({
    title: {
        type: String,
        required: [true, 'Quiz title is required'],
        trim: true,
        minlength: [5, 'Quiz title must be at least 5 characters long'],
        maxlength: [100, 'Quiz title must be at most 100 characters long']
    },
    questions: { 
        type: [QuestionSchema], 
        required: true,
        validate: {
        validator: function (value) {
            return Array.isArray(value) && value.length > 0;
        }
        , message: 'A quiz must have at least one question.'
    }
    },
    createdBy: { type: String, default: 'Admin' },   
    isActive: { type: Boolean, default: true },
    totalAttempts: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
}, { timestamps: true  }
);

export default mongooese.model('Quiz', QuizSchema)