const { createSchedule, getScheduleById, getAllSchedules } = require('../models/schedule');

const getSchedules = async (req, res) => {
  try {
    const schedules = await getAllSchedules();
    res.send(schedules);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch schedules' });
  }
};

const getSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await getScheduleById(id);
    if (!schedule) {
      return res.status(404).send({ error: 'Schedule not found' });
    }
    res.send(schedule);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch schedule' });
  }
};

const createNewSchedule = async (req, res) => {
  try {
    const scheduleData = req.body;
    const scheduleId = await createSchedule(scheduleData);
    res.status(201).send({ scheduleId });
  } catch (error) {
    res.status(500).send({ error: 'Failed to create schedule' });
  }
};

module.exports = { getSchedules, getSchedule, createNewSchedule };
