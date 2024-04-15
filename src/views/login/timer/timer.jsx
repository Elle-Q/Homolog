import React, {useEffect, useState} from 'react';
import {Modal} from "../../../components/modal/modal";
import Quiz from "../../../json/quiz.json"
import ColorButton from "../../../components/button/color-button";

function Timer(props) {
    const {handleClickSend, check} = props
    const [timer, setTimer] = useState(60);
    const [start, setStart] = useState(null);
    const [varified, setVarified] = useState(false)
    const [showVarified, setShowVarified] = useState(false)
    const [quiz, setQuiz] = useState(null)

    useEffect(() => {
        const randomNum = Math.floor(Math.random() * Quiz.length)
        setQuiz(Quiz[randomNum])
    }, []);

    useEffect(() => {
        if (!start) return;
        if (timer < 1) {
            setTimer(0);
            setStart(false);
        }
        let timeout = setTimeout(() => {
            setTimer(timer - 1)
        }, 1000);
        return () => clearTimeout(timeout);
    }, [timer, start])

    const SendMSCode = () => {
        if (!check()) return;
        if (!varified) {
            setShowVarified(true);
            return
        }
        if (start) return
        setStart(true)
        setTimer(60)
        handleClickSend()
    }

    const handleVarify = (option) => {
        setVarified(option === quiz.answer)
        setShowVarified(option !== quiz.answer)
        setStart(option == quiz.answer)

        if (option !== quiz.answer) {
            const randomNum = Math.floor(Math.random() * Quiz.length)
            setQuiz(Quiz[randomNum])
        }
    }

    return (
        <React.Fragment>
            <button className="login__btn--varify"
                    onClick={SendMSCode}>
                发送验证码 {start && timer}
            </button>

            <Modal
                maxWidth="md"
                open={showVarified}
                handleClose={() => setShowVarified(!showVarified)}
                actions={false}>
                <h1 className="login__quiz-h1">{quiz && quiz.quiz}</h1>
                <div className="login__quiz-option">
                    {
                        quiz && quiz.options.map((option, index) => (
                            <ColorButton key={index} color="#e82986"
                                         handleClick={() => handleVarify(option)}>
                                {option}
                            </ColorButton>
                        ))
                    }
                </div>
            </Modal>
        </React.Fragment>
    );
}

export default Timer;