const formatTime = (lessons) => {
  if (!lessons || lessons.length === 0) {
    return "0m";
  }

  const totalMinutes = lessons.reduce((sum, lesson) => {
    const duration = lesson.duration || 0;
    return sum + duration;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
};

export default formatTime;
