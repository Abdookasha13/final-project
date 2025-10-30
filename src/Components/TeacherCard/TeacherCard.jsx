import './TeacherCard.css';


const TeacherCard = ({ title , imgSrc }) => {
    
    return (
        <>
            <div className="col-xl-3 col-lg-4 col-md-6 mb-30">
                <div className="it-team-3-item text-center">
                    <div className="it-team-3-thumb fix">
                        <img
                            src={imgSrc || "https://ordainit.com/html/educate/assets/img/team/team-3-1.jpg"}
                            alt="Young female teacher with long brown hair wearing a tan coat and gray turtleneck, looking directly at the camera with a calm, attentive expression; studio style neutral brown background; no visible text"
                        />
                    </div>
                    <div className="it-team-3-content">
                        <div className="it-team-3-social-box p-relative">
                            <button >
                                <i class="fa-solid fa-share-nodes fa-lg"></i>



                            </button>
                            <div className="it-team-3-social-wrap">
                                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                                <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                                <a href="#"><i className="fa-brands fa-pinterest-p"></i></a>
                                <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                            </div>
                        </div>
                        <div className="it-team-3-author-box">
                            <h4 className="it-team-3-title"><a href="">
                            {title || "Nathan Allen"}
                                </a></h4>
                            <span>Teacher</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeacherCard