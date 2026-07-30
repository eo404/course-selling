import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

export const enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.validated.params;
        const userId = req.user.id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const enrollment = await Enrollment.create({
            user: userId,
            course: courseId,
        });

        return res.status(201).json({
            message: "Enrolled successfully",
            enrollment,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "You are already enrolled in this course" });
        }
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getMyEnrollments = async (req, res) => {
    try {
        const userId = req.user.id;

        const enrollments = await Enrollment.find({ user: userId }).populate("course");

        return res.status(200).json({ enrollments });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const checkEnrollment = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        const enrollment = await Enrollment.findOne({ user: userId, course: courseId });

        return res.status(200).json({ enrolled: !!enrollment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};