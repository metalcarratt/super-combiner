import { Modal } from "./modal";
import { GoalType } from "./types";

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