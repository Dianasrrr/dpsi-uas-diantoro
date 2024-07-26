const db = require('../utils/firestore');

const createSchedule = async (scheduleData) => {
  const scheduleRef = db.collection('schedules').doc();
  await scheduleRef.set(scheduleData);
  return scheduleRef.id;
};

const getScheduleById = async (id) => {
  const scheduleRef = db.collection('schedules').doc(id);
  const doc = await scheduleRef.get();
  if (!doc.exists) {
    return null;
  }
  return { id: doc.id, ...doc.data() };
};

const getAllSchedules = async () => {
  const schedules = [];
  const snapshot = await db.collection('schedules').get();
  snapshot.forEach(doc => {
    schedules.push({ id: doc.id, ...doc.data() });
  });
  return schedules;
};

module.exports = { createSchedule, getScheduleById, getAllSchedules };
