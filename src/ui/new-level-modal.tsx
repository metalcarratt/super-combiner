import { GoalType } from "../types";
import { Modal } from "./modal";

type Props = {
    goal: GoalType
}

export const NewLevelModal = ({goal}: Props) => {
    return (
        <Modal>
            <p>Goal: Get {goal.score} score</p>
            <button>Start</button>
        </Modal>
    );
}