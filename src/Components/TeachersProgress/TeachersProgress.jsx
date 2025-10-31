import "./TeachersProgress.css";

function TeachersProgress() {
  return (
    <div className="container1">
      <div className="skill-box">
        <span className="title">Lectures</span>
        <div className="skill-bar">
          <span className="skill-per Lectures">
            <span className="tooltip">90%</span>
          </span>
        </div>
      </div>

      <div className="skill-box">
        <span className="title">My Skill</span>
        <div className="skill-bar">
          <span className="skill-per scss">
            <span className="tooltip">82%</span>
          </span>
        </div>
      </div>

      <div className="skill-box">
        <span className="title">Consulting</span>
        <div className="skill-bar">
          <span className="skill-per Consulting">
            <span className="tooltip">65%</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default TeachersProgress;
