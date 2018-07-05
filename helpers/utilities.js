class Utilities{
    constructor() {}

		/**
		 * Return a response to the client
		 * @param {Object} data.
		 * @param {Object} res.
		 */
		sendResponse(data, res) {
			res.status(200).json({
				'status': data.status, 
				'message': data.message,
				'token': data.token,
				'error': data.err
			});
		}

		/**
		 * Return a response to the client
		 * @param {Object} data.
		 * @param {Object} res.
		 */
    apiSendData(data, res) {
			res.status(200).json({
				'status': data.status, 
				'message': data.message,
				'data': data.body,
				'error': data.error,
			});
		}
}

module.exports = new Utilities();