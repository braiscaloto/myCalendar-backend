'use strict';

const Event = require('../models/Event-model');

const getEvents = async (req, res) => {
	const events = await Event.find().populate('user', 'name');

	res.json({
		ok: true,
		events,
	});
};
const createEvent = async (req, res) => {
	const event = new Event(req.body);

	try {
		event.user = req.uid;
		const eventSaved = await event.save();

		res.json({
			ok: true,
			event: eventSaved,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Contact with the administrator',
		});
	}
};
const updateEvent = async (req, res) => {
	const eventId = req.params.id;
	const uid = req.uid;

	try {
		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({
				ok: false,
				msg: 'Event not exists',
			});
		}
		if (event.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'Not admin privilages',
			});
		}
		const newEvent = {
			...req.body,
			user: uid,
		};

		const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

		res.json({
			ok: true,
			event: updatedEvent,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Contact with admin',
		});
	}
};
const deleteEvent = async (req, res) => {
	const eventId = req.params.id;
	const uid = req.uid;

	try {
		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({
				ok: false,
				msg: 'Event not exists',
			});
		}
		if (event.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'Not admin privilages',
			});
		}

		await Event.findByIdAndRemove(event);

		res.json({
			ok: true,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Contact with admin',
		});
	}
};

module.exports = {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent,
};
