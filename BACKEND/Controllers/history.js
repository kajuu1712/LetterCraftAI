import Letter from "../Models/letter.js";

// ================= GET ALL LETTERS =================
export const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    // find all letters of this user, newest first
    const letters = await Letter.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Letters fetched successfully",
      output: letters
    });

  } catch (err) {
    res.status(500).json({
      message: "Error fetching history",
      error: err.message
    });
  }
};


// ================= DELETE LETTER =================
export const deleteLetter = async (req, res) => {
  try {
    const userId = req.user.id;
    const letterId = req.params.id;

    // find and delete only if it belongs to this user
    const deletedLetter = await Letter.findOneAndDelete({
      _id: letterId,
      user: userId
    });

    if (!deletedLetter) {
      return res.status(404).json({
        message: "Letter not found or unauthorized"
      });
    }

    res.status(200).json({
      message: "Letter deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: "Error deleting letter",
      error: err.message
    });
  }
};