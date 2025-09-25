// backend/utils/dailyCron.js
import cron from 'node-cron';
import Question from '../models/Question.js';

const setDailyQuestions = async () => {
  try {
    // 1. Unset all current daily questions
    await Question.updateMany({}, { $set: { dailyQuestion: false } });

    // 2. Select one random question for each difficulty
    const basicQ = await Question.aggregate([
      { $match: { difficulty: 'Basic', isInterviewQuestion: false } },
      { $sample: { size: 1 } },
    ]);
    const easyQ = await Question.aggregate([
      { $match: { difficulty: 'Easy', isInterviewQuestion: false } },
      { $sample: { size: 1 } },
    ]);
    const mediumQ = await Question.aggregate([
      { $match: { difficulty: 'Medium', isInterviewQuestion: false } },
      { $sample: { size: 1 } },
    ]);

    // 3. Update the selected questions to be the daily ones
    const dailyQuestions = [];
    if (basicQ.length > 0) dailyQuestions.push(basicQ[0]._id);
    if (easyQ.length > 0) dailyQuestions.push(easyQ[0]._id);
    if (mediumQ.length > 0) dailyQuestions.push(mediumQ[0]._id);

    await Question.updateMany(
      { _id: { $in: dailyQuestions } },
      { $set: { dailyQuestion: true } }
    );
    console.log('Daily questions have been updated! ✨');
  } catch (error) {
    console.error(`Error in cron job: ${error.message}`);
  }
};

// Schedule the cron job to run daily at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running daily question cron job...');
  setDailyQuestions();
});

export default setDailyQuestions;