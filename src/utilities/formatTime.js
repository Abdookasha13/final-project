const formatTime = (lessons) => {
  
  if (!lessons || lessons.length === 0) {
    return "0";
  }

  const totalMinutes = lessons.reduce((sum, lesson) => {
    const duration = lesson.duration || 0;
    return sum + duration;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return`${minutes} `;
  }

  if (minutes === 0) {
    return `${hours}`;
  }

  return `${hours}h ${minutes}`;
};

export default formatTime;
