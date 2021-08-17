const Advertiesment = require('../model/Advertiestment.modal')
const responseHelper = require('../helpers/response')

exports.createAdvertiesment = async (req, res, next) => {
  try {
    const advertiesment = await new Advertiesment(req.body).save()
    responseHelper.success(res, 'Advertiesment created SuccessFully', 200)
  } catch (e) {
    next(e)
  }
}
