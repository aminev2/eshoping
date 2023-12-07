// controllers/visitController.js
import Visit from "../models/visitModel.js";

const getVisits = async (req, res) => {
  try {
    const visitData = await Visit.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(visitData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export {
  getVisits
};