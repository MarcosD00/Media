import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import { Link } from "react-router-dom";
import "./userDemoStyle.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const DemoUser = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { closeModal } = useModal();
  const onClick = () => {
    dispatch(sessionActions.login("demo@aa.io", "password"))
    history.push('/')
    setTimeout(
      closeModal, 200
    )
  };

  return <p onClick={onClick} className="demo-user">Demo User</p>;
};

export default DemoUser;