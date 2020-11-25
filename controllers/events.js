// {
//     ok:true,
//     msg:'get events'
// }

const getEvents = (req, res) => {
	res.json({
		ok: true,
		msg: 'get events',
	});
};
const createEvent = (req, res) => {
	res.json({
		ok: true,
		msg: 'create event',
	});
};
const updateEvent = (req, res) => {
	res.json({
		ok: true,
		msg: 'update event',
	});
};
const deleteEvent = (req, res) => {
	res.json({
		ok: true,
		msg: 'delete events',
	});
};

module.exports = {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent,
};
