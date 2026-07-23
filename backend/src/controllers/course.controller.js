import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
    try {
        const { title, description, price, thumbnail } = req.validated.body;

        const course = await Course.create({
            title,
            description,
            price,
            thumbnail,
            createdBy: req.user.id,
        });

        return res.status(201).json({
            message: "Course created successfully",
            course,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        return res.status(200).json({ courses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json({ course });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.validated.body,
            { new: true, runValidators: true }
        );

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({
            message: "Course updated successfully",
            course,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};