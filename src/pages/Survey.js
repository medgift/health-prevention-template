import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Survey() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="container_quiz">
          <h2 className="survey_title">[Survey name]</h2>
          <div className="container_left">
            <h3 className="question">Question side</h3>
            <h3 className="question">Question side</h3>
            <h3 className="question">Question side</h3>
            <h3 className="question">Question side</h3>
            <h3 className="question">Question side</h3>
            <h3 className="question">Question side</h3>
            <h3 className="question">Question side</h3>
            <h3 className="question">Question side</h3>
            <h3 className="question">Question side</h3>
            <h3 className="question">Avez-vous déjà fait un infarctus?</h3>
          </div>
          <div className="container_right">
            <input
              className="radio_btn"
              type="radio"
              value="Male"
              name="gender"
            />{" "}
            Male
            <input
              className="radio_btn"
              type="radio"
              value="Female"
              name="gender"
            />{" "}
            Female
            <br></br>
            <input
              className="nb_input"
              type="text"
              maxLength={3}
              // value={email}
              // onChange={handleEmailChange}
              required
            />
            <br></br>
            <input
              className="nb_input"
              type="text"
              maxLength={3}
              // value={email}
              // onChange={handleEmailChange}
              required
            />
            <br></br>
            <input
              className="nb_input"
              type="text"
              maxLength={3}
              // value={email}
              // onChange={handleEmailChange}
              required
            />
            <br></br>
            <input
              className="radio_btn"
              type="radio"
              value="Male"
              name="gender"
            />{" "}
            Yes
            <input
              className="radio_btn"
              type="radio"
              value="Female"
              name="gender"
            />{" "}
            No
            <br></br>
            <input
              className="radio_btn"
              type="radio"
              value="Male"
              name="gender"
            />{" "}
            Yes
            <input
              className="radio_btn"
              type="radio"
              value="Female"
              name="gender"
            />{" "}
            No
            <br></br>
            <input
              className="radio_btn"
              type="radio"
              value="Male"
              name="gender"
            />{" "}
            Yes
            <input
              className="radio_btn"
              type="radio"
              value="Female"
              name="gender"
            />{" "}
            No
            <br></br>
            <input
              className="radio_btn"
              type="radio"
              value="Male"
              name="gender"
            />{" "}
            Yes
            <input
              className="radio_btn"
              type="radio"
              value="Female"
              name="gender"
            />{" "}
            No
            <br></br>
            <input
              className="radio_btn"
              type="radio"
              value="Male"
              name="gender"
            />{" "}
            Yes
            <input
              className="radio_btn"
              type="radio"
              value="Female"
              name="gender"
            />{" "}
            No
            <br></br>
            <Link>
              <button className="next_btn"></button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Survey;
