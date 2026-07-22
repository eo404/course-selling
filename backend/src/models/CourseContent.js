import mongoose from "mongoose";

const courseContentSchema = new mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
            required: true,
        },
        order: {
            type: Number,
            default: 0, // lets you control lesson sequence
        },
    },
    { timestamps: true }
);

const CourseContent = mongoose.model("CourseContent", courseContentSchema);
export default CourseContent;