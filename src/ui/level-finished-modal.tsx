import { Modal } from "../modal";

type Props = {
    nextLevelFn: () => void,
    keepPlayingFn: () => void
}

export const LevelFinishedModal = ({nextLevelFn, keepPlayingFn}: Props) => {
    return (
        <Modal>
            <h1>Level Finished!</h1>
            <button onClick={nextLevelFn}>Next Level</button>
            <button onClick={keepPlayingFn}>Keep Playing</button>
        </Modal>
    );
}