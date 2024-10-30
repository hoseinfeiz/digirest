const { postSurveys, getSurveys } = require('../services/SurveyService')

exports.post = async (req, res, next) => {
  const surveyID = await postSurveys(req, next)
  if (surveyID) {
    res.status(200).json({ message: 'معیار امتیازدهی با موفقیت ایجاد گردید' })
  }
}

exports.get = async (req, res, next) => {
  const surveys = await getSurveys(req, next)
  if (surveys) {
    res.status(200).json(surveys)
  }
}
